export { name as EXT_MESH_FEATURES } from "./lib/extensions/EXT_mesh_features.js";
export { name as EXT_STRUCTURAL_METADATA } from "./lib/extensions/EXT_structural_metadata.js";
export { name as EXT_FEATURE_METADATA } from "./lib/extensions/deprecated/EXT_feature_metadata.js";
// glTF loader/writer definition objects
export { GLTFLoader } from "./gltf-loader.js";
export { GLTFWriter } from "./gltf-writer.js";
// GLB Loader & Writer (for custom formats that want to leverage the GLB binary "envelope")
export { GLBLoader } from "./glb-loader.js";
export { GLBWriter } from "./glb-writer.js";
// glTF Data Access Helper Class
export { GLTFScenegraph } from "./lib/api/gltf-scenegraph.js";
export { postProcessGLTF } from "./lib/api/post-process-gltf.js";
export { getMemoryUsageGLTF as _getMemoryUsageGLTF } from "./lib/gltf-utils/gltf-utils.js";
export { createExtStructuralMetadata } from "./lib/extensions/EXT_structural_metadata.js";
export { createExtMeshFeatures } from "./lib/extensions/EXT_mesh_features.js";
