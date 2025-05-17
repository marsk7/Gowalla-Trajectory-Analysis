/*
* == BSD2 LICENSE ==
* Copyright (c) 2021, Tidepool Project
*
* This program is free software; you can redistribute it and/or modify it under
* the terms of the associated License, which is identical to the BSD 2-Clause
* License as published by the Open Source Initiative at opensource.org.
*
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE. See the License for more details.
*
* You should have received a copy of the License along with this program; if
* not, you can obtain one from Tidepool Project at tidepool.org.
* == BSD2 LICENSE ==
*/

import createModule from './lzo-wasm.js';

const decompress = async (input, length) => {
  const Module = await createModule();

  const lzo_decompress = Module.cwrap('decompress', 'number', ['number', 'number']);

  const inputLength = input.length * input.BYTES_PER_ELEMENT;
  const inputPtr = Module._malloc(inputLength);
  Module.HEAPU8.set(input, inputPtr);

  const outputPtr = lzo_decompress(inputPtr, inputLength, length);

  const resultView = new Uint8Array(Module.HEAPU8.buffer, outputPtr, length);
  const output = new Uint8Array(resultView); // copy data
  Module._free(outputPtr);
  return output;
};



const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;

  const reader = new FileReader();
  reader.addEventListener('load', async (event) => {
    const data = new Uint8Array(event.target.result);
    console.log(data);
    const skip = 50;
    const ret = await decompress(data.slice(skip), data.length - skip);
    console.log(new TextDecoder().decode(ret));
  });
  reader.readAsArrayBuffer(fileList[0]);
});
