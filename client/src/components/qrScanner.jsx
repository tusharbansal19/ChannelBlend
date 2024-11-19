// src/components/QRCodeScanner.js
import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRCodeScanner = ({ onScanSuccess, onScanError }) => {
  const qrCodeRegionRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-code-full-region");
    html5QrCode
      .start(
        { facingMode: "environment" }, // Use the back camera
        {
          fps: 10, // frames per second
          qrbox: 250, // width of the scanning box
        },
        (decodedText) => {
          onScanSuccess(decodedText);
          html5QrCode.stop();
        },
        (errorMessage) => {
          if (onScanError) onScanError(errorMessage);
        }
      )
      .catch((err) => {
        console.error("Unable to start scanning", err);
      });

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch((err) => {
          console.error("Unable to stop scanning", err);
        });
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div>
      <div id="qr-code-full-region" ref={qrCodeRegionRef} className="w-full h-64"></div>
      <p className="text-gray-600 text-center mt-4">
        Point your camera at a QR code to scan
      </p>
    </div>
  );
};

export default QRCodeScanner;
