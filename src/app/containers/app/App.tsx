import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as libtiffjs from 'libtiffjs';
require('libtiffjs/libtiff-worker.js'); 
require('libtiffjs/tiff.raw.js');
require('libtiffjs/tiff.raw.wasm');
libtiffjs.initialize();

function xhrAsPromiseArrayBuffer(url: string) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.responseType = 'arraybuffer';
  return new Promise(function (resolve, reject) {
      xhr.onload = function (oEvent) {
          resolve(xhr.response);
      };
      xhr.onerror = function (oEvent) {
          reject(oEvent);
      };
      xhr.send();
  });
}


const App: React.FC = () => {
  const canvasRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    async function getTif() {
      const tifAsArraybuffer = await xhrAsPromiseArrayBuffer('assets/images/palette-1c-8b.tif');
      const tiffInstance = await libtiffjs.open(tifAsArraybuffer);
      const width = await tiffInstance.width();
      const height = await tiffInstance.height();
      const image = await tiffInstance.readRGBAImage();
      await tiffInstance.close();
      var canvas = canvasRef.current;
      var context = canvasRef.current.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      const imageData = context.createImageData(width, height);
      imageData.data.set(image);
      context.putImageData(imageData, 0, 0);
      setReady(true);
    }

    getTif();        
  }, []);
  return (
    <div>      
      {!ready && <div>Loading...</div>}
      <canvas ref={canvasRef}>
      </canvas>
    </div>
  );
};

export default App;
