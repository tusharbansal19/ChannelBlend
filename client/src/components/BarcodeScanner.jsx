import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: { name: 'Live', type: 'LiveStream', target: document.querySelector('#scanner') },
        decoder: { readers: ['code_128_reader'] },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="scanner" style={{ width: '100%', height: '300px' }} />;
};

export default BarcodeScanner;
