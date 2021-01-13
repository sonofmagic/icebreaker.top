const zlib = require('zlib')
const express = require('express')
// https://fed.taobao.org/blog/taofed/do71ct/seller-bigpipe-coding
// https://github.com/expressjs/express/pull/1422/commits/56cedcc6e064456e68d68d31de2c57c68d516e6c
/**
 * Create a stream so the body is sent using gzip
 * and the page is rendered in the browser as it is received.
 * Using `(connect || express).compress()` will render the page
 * only when the entire page is loaded.
 */

function compressedStream(res) {
  // Would be nice of `connect.compress()` used this instead
  const stream = zlib.createGzip() // zlib.createDeflate()
  stream._flush = zlib.constants.Z_SYNC_FLUSH
  stream.pipe(res)
  return stream
}

/**
 * Message to send to the browser split into words.
 * Send each word in a random interval between 0-5 seconds.
 * Phrase will be displayed in order.
 */

const interval = 5

const message =
  "Oh, you think darkness is your ally. But you merely adopted the dark; I was born in it, moulded by it. I didn't see the light until I was already a man, by then it was nothing to me but BLINDING! The shadows betray you, because they belong to me!"

const app = express()

// Set response status and headers before writing
app.get('/', function headers(req, res, next) {
  res.set('Content-Type', 'text/html; charset=utf-8')
  res.set('Content-Encoding', 'gzip') // 'deflate'
  res.set('Transfer-Encoding', 'chunked')
  // res.set('Vary', 'Accept-Encoding');
  res.statusCode = 200
  next()
})

app.get('/', function bigPipe(req, res) {
  if (req.method === 'HEAD') {
    return res.end()
  }

  const stream = compressedStream(res)

  let head = '<!DOCTYPE html><html><head>'
  head += '<style>\n'
  head += 'body { display: table; }\n'
  head += 'div { display: table-row; }\n'
  head += 'span { display: table-cell; padding: 5px; }\n'
  head += '</style>'
  head += '</head>'
  head += '<body>'

  stream.write(head)

  const words = message.split(' ')
  let finishedWords = 0
  const startTime = Date.now()

  words.forEach(function (word, index) {
    // Placeholder ID
    const id = 'word-' + index

    // Placeholder
    stream.write('<div id="' + id + '"></div>')

    const wait = Math.random() * interval * 1000

    // "Asynchronous function call"
    setTimeout(function () {
      let innerHTML = '<span>' + word + '</span>'
      innerHTML +=
        '<span>' + (Date.now() - startTime) + ' millisecond delay</span>'

      // Client-side javascript function to insert the HTML into the placeholder.
      let flush = "<script>document.querySelector('#"
      flush += id
      flush += "').innerHTML = "
      flush += JSON.stringify(innerHTML)
      flush += ';</script>'

      stream.write(flush)

      finishedWords++

      // If we've sent all the words, finish the request.
      if (words.length === finishedWords) {
        stream.end('</body></html>')
      }
    }, wait)
  })
})

app.listen(3000)
console.log('BigPipe example listening on port 3000')