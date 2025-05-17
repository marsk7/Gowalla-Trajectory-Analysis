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

#include <stdlib.h>
#include <emscripten.h>
#include "lzo.h"

EMSCRIPTEN_KEEPALIVE
unsigned char * decompress(const void *inputBuffer, int inputBuffer_len, unsigned long outputBufferSize) {
  unsigned char *outputBuffer = malloc(outputBufferSize + AV_LZO_OUTPUT_PADDING);
  int remaining = outputBufferSize;
  int inputBufferSize = inputBuffer_len + AV_LZO_INPUT_PADDING;

  int ret = av_lzo1x_decode(outputBuffer, &remaining, inputBuffer, &inputBufferSize);

  if (ret != 0) {
    EM_ASM(
      throw new Error('Failed to decompress');
    );
  }

  return outputBuffer;
}
