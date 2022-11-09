import type { NextPage } from 'next'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js' // `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const Home: NextPage = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  return (
    <div>
      <Document file="./sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default Home
