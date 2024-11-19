import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    // Initialize QuaggaJS
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment", // Use the back camera
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader"], // Barcode formats
        },
      },
      (err) => {
        if (err) {
          console.error("Failed to initialize QuaggaJS:", err);
          return;
        }
        Quagga.start();
      }
    );

    // Listen for barcode detection
    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
    });

    return () => {
      // Cleanup on component unmount
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div
    Style={{
      
        width: "100%",
        height: "100%",
        border: "2px solid #22c55e",
        borderRadius: "10px",
        overflow: "hidden",
        
    }}
    className="border-green-600 border-4 "
    ref={scannerRef}
    >
      <p className="text-center text-gray-600">Point your camera at a barcode</p>
    </div>

  );
};

export default BarcodeScanner