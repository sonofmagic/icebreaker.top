import JSZip from 'jszip'
import testJpg from '@/assets/img/mini/programer-card.jpg'
function getGradientColor(percent) {
  /**
   * @type {HTMLCanvasElement}
   */
  const canvas = new OffscreenCanvas()

  const ctx = canvas.getContext('2d')

  const image = new Image()
  image.src = testJpg
  image.onload = () => {
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    ctx.drawImage(image, 0, 0)
  }
}

self.onmessage = () => {
  self.postMessage()
}
