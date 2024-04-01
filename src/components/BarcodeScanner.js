import React, { useEffect, useRef } from 'react'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import PropTypes from 'prop-types'

const BarcodeScanner = ({
  onResult = () => {},
  onError = () => {}
}) => {
  const readerRef = useRef(null)
  const memoizedResultHandler = useRef(onResult)
  const memoizedErrorHandler = useRef(onError)

  // Function to determine the qrBox size
  const getQrBoxSize = () => {
    const width = window.innerWidth
    // Set the size of the qrBox based on the screen width
    if (width < 600) {
      return 180
    } else {
      return 250
    }
  }

  useEffect(() => {
    memoizedResultHandler.current = onResult
  }, [onResult])

  useEffect(() => {
    memoizedErrorHandler.current = onError
  }, [onError])

  useEffect(() => {
    if (!readerRef.current) return

    // Initialize the Scanner
    const html5QrcodeScanner = new Html5Qrcode(readerRef.current.id,
      {
        useBarCodeDetectorIfSupported: true,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODABAR,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODE_93,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.ITF,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION
        ]
      })
    const didStart = html5QrcodeScanner
      .start(
        { facingMode: 'environment' },
        { fps: 30, qrbox: getQrBoxSize() },
        (_, { result }) => {
          memoizedResultHandler.current(result)
        },
        (_, error) => {
          memoizedErrorHandler.current(error)
        }
      )

    return () => {
      // Cleanup the Scanner on unmount, have to wait with a Timeout here since
      // Html5Qrcode starts a video.play() but does not include it in the Promise chain of start()
      didStart.then(() => setTimeout(() => {
        if (html5QrcodeScanner.isScanning) {
          html5QrcodeScanner.stop()
        }
      }, 100))
    }
  }, [readerRef, memoizedResultHandler, memoizedErrorHandler])

  return (
    <div
      id="reader"
      ref={readerRef}
      style={{ maxWidth: '500px', margin: '0 auto' }}
    />
  )
}

export default BarcodeScanner

BarcodeScanner.propTypes = {
  onResult: PropTypes.func,
  onError: PropTypes.func
}
