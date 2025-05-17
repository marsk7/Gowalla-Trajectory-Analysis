// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { createLoaderWorker } from '@loaders.gl/loader-utils';
import { CompressedTextureLoader } from "../compressed-texture-loader.js";
// @ts-expect-error
createLoaderWorker(CompressedTextureLoader);
