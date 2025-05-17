import { GLTFScenegraph } from "../../api/gltf-scenegraph.js";
import { convertRawBufferToMetadataArray, getPrimitiveTextureData, primitivePropertyDataToAttributes, getArrayElementByteSize, getOffsetsForProperty, parseVariableLengthArrayNumeric, parseFixedLengthArrayNumeric, getPropertyDataString } from "../utils/3d-tiles-utils.js";
/** Extension name */
const EXT_FEATURE_METADATA_NAME = 'EXT_feature_metadata';
export const name = EXT_FEATURE_METADATA_NAME;
export async function decode(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    decodeExtFeatureMetadata(scenegraph, options);
}
/**
 * Decodes feature metadata from extension.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param options - GLTFLoader options.
 */
function decodeExtFeatureMetadata(scenegraph, options) {
    // Decoding metadata involves buffers processing.
    // So, if buffers have not been loaded, there is no reason to process metadata.
    if (!options.gltf?.loadBuffers) {
        return;
    }
    const extension = scenegraph.getExtension(EXT_FEATURE_METADATA_NAME);
    if (!extension) {
        return;
    }
    if (options.gltf?.loadImages) {
        decodePropertyTextures(scenegraph, extension);
    }
    decodePropertyTables(scenegraph, extension);
}
/**
 * Processes the data stored in the textures
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param extension - Top-level extension.
 */
function decodePropertyTextures(scenegraph, extension) {
    const schema = extension.schema;
    if (!schema) {
        return;
    }
    const schemaClasses = schema.classes;
    const { featureTextures } = extension;
    if (schemaClasses && featureTextures) {
        for (const schemaName in schemaClasses) {
            const schemaClass = schemaClasses[schemaName];
            const featureTexture = findFeatureTextureByClass(featureTextures, schemaName);
            if (featureTexture) {
                handleFeatureTextureProperties(scenegraph, featureTexture, schemaClass);
            }
        }
    }
}
/**
 * Processes the data stored in the property tables.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param extension - Top-level extension.
 */
function decodePropertyTables(scenegraph, extension) {
    const schema = extension.schema;
    if (!schema) {
        return;
    }
    const schemaClasses = schema.classes;
    const propertyTables = extension.featureTables;
    if (schemaClasses && propertyTables) {
        for (const schemaName in schemaClasses) {
            const propertyTable = findPropertyTableByClass(propertyTables, schemaName);
            if (propertyTable) {
                processPropertyTable(scenegraph, schema, propertyTable);
            }
        }
    }
}
/**
 * Finds the property table by class name.
 * @param propertyTables - propertyTable definition taken from the top-level extension.
 * @param schemaClassName - class name in the extension schema.
 */
function findPropertyTableByClass(propertyTables, schemaClassName) {
    for (const propertyTableName in propertyTables) {
        const propertyTable = propertyTables[propertyTableName];
        if (propertyTable.class === schemaClassName) {
            return propertyTable;
        }
    }
    return null;
}
function findFeatureTextureByClass(featureTextures, schemaClassName) {
    for (const featureTexturesName in featureTextures) {
        const featureTable = featureTextures[featureTexturesName];
        if (featureTable.class === schemaClassName) {
            return featureTable;
        }
    }
    return null;
}
/**
 * Navigates through all properies in the property table, gets properties data,
 * and put the data to `propertyTable.data` as an array.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param schema - schema object.
 * @param propertyTable - propertyTable definition taken from the top-level extension.
 */
function processPropertyTable(scenegraph, schema, propertyTable) {
    // Though 'class' is not required by spec, it doesn't make any scence when it's not provided.
    // So, bale out here.
    if (!propertyTable.class) {
        return;
    }
    const schemaClass = schema.classes?.[propertyTable.class];
    if (!schemaClass) {
        throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${propertyTable.class}`);
    }
    const numberOfElements = propertyTable.count; // `propertyTable.count` is a number of elements in each property array.
    for (const propertyName in schemaClass.properties) {
        const classProperty = schemaClass.properties[propertyName];
        const propertyTableProperty = propertyTable.properties?.[propertyName];
        if (propertyTableProperty) {
            // Getting all elements (`numberOfElements`) of the array in the `propertyTableProperty`
            const data = getPropertyDataFromBinarySource(scenegraph, schema, classProperty, numberOfElements, propertyTableProperty);
            propertyTableProperty.data = data;
        }
    }
}
/**
 * Navigates through all properies in feature texture and gets properties data.
 * Data will be stored in featureTexture.properties[propertyName].data.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param featureTexture
 * @param schemaClass
 */
function handleFeatureTextureProperties(scenegraph, featureTexture, schemaClass) {
    const attributeName = featureTexture.class;
    for (const propertyName in schemaClass.properties) {
        const featureTextureProperty = featureTexture?.properties?.[propertyName];
        if (featureTextureProperty) {
            const data = getPropertyDataFromTexture(scenegraph, featureTextureProperty, attributeName);
            featureTextureProperty.data = data;
        }
    }
}
/**
 * Decodes properties from binary sourse based on property type.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param schemaProperty
 * @param numberOfFeatures
 * @param featureTableProperty
 */
function getPropertyDataFromBinarySource(scenegraph, schema, classProperty, numberOfFeatures, featureTableProperty) {
    let data = [];
    const bufferView = featureTableProperty.bufferView;
    const dataArray = scenegraph.getTypedArrayForBufferView(bufferView);
    const arrayOffsets = getArrayOffsetsForProperty(scenegraph, classProperty, featureTableProperty, numberOfFeatures);
    const stringOffsets = getStringOffsetsForProperty(scenegraph, classProperty, featureTableProperty, numberOfFeatures);
    if (classProperty.type === 'STRING' || classProperty.componentType === 'STRING') {
        data = getPropertyDataString(numberOfFeatures, dataArray, arrayOffsets, stringOffsets);
    }
    else if (isNumericProperty(classProperty)) {
        data = getPropertyDataNumeric(classProperty, numberOfFeatures, dataArray, arrayOffsets);
    }
    return data;
}
/**
 * Parses propertyTable.property.arrayOffsets that are offsets of sub-arrays in a flatten array of values.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param classProperty - class property object.
 * @param propertyTableProperty - propertyTable's property metadata.
 * @param numberOfElements - The number of elements in each property array that propertyTableProperty contains. It's a number of rows in the table.
 * @returns Typed array with offset values.
 * @see https://github.com/CesiumGS/glTF/blob/2976f1183343a47a29e4059a70961371cd2fcee8/extensions/2.0/Vendor/EXT_structural_metadata/schema/propertyTable.property.schema.json#L21
 */
function getArrayOffsetsForProperty(scenegraph, classProperty, propertyTableProperty, numberOfElements) {
    /*
     If ARRAY is used, then componentType must also be specified.
     ARRAY is a fixed-length array when componentCount is defined, and variable-length otherwise.
  */
    if (classProperty.type === 'ARRAY' &&
        // `componentCount` is a number of fixed-length array elements.
        // If `componentCount` is NOT defined, it's a VARIABLE-length array
        typeof classProperty.componentCount === 'undefined' &&
        // `arrayOffsetBufferView` is an index of the buffer view containing offsets for variable-length arrays.
        typeof propertyTableProperty.arrayOffsetBufferView !== 'undefined') {
        // Data are in a VARIABLE-length array
        return getOffsetsForProperty(scenegraph, propertyTableProperty.arrayOffsetBufferView, propertyTableProperty.offsetType || 'UINT32', // offsetType is used both for stringOffsetBufferView and arrayOffsetBufferView
        numberOfElements);
    }
    return null;
}
/**
 * Parses featureTable.property.stringOffsetBufferView.
 * String offsets is an array of offsets of strings in the united array of characters.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param propertyTableProperty - propertyTable's property metadata.
 * @param numberOfElements - The number of elements in each property array that propertyTableProperty contains. It's a number of rows in the table.
 * @returns Typed array of offset values. The number of offsets in the array is equal to `numberOfElements` plus one.
 * @see https://github.com/CesiumGS/glTF/blob/c38f7f37e894004353c15cd0481bc5b7381ce841/extensions/2.0/Vendor/EXT_feature_metadata/schema/featureTable.property.schema.json#L50C10-L50C32
 */
function getStringOffsetsForProperty(scenegraph, classProperty, propertyTableProperty, numberOfElements) {
    if (typeof propertyTableProperty.stringOffsetBufferView !== 'undefined' // `stringOffsetBufferView` is an index of the buffer view containing offsets for strings.
    ) {
        // Data are in a FIXED-length array
        return getOffsetsForProperty(scenegraph, propertyTableProperty.stringOffsetBufferView, propertyTableProperty.offsetType || 'UINT32', // offsetType is used both for stringOffsetBufferView and arrayOffsetBufferView
        numberOfElements);
    }
    return null;
}
/**
 * Checks if the feature table property is of numeric type.
 * @param schemaPropertyType - feature table property
 * @returns true if property is numeric, else - false
 */
function isNumericProperty(schemaProperty) {
    const types = [
        'UINT8',
        'INT16',
        'UINT16',
        'INT32',
        'UINT32',
        'INT64',
        'UINT64',
        'FLOAT32',
        'FLOAT64'
    ];
    return (types.includes(schemaProperty.type) ||
        (typeof schemaProperty.componentType !== 'undefined' &&
            types.includes(schemaProperty.componentType)));
}
/**
 * Decodes properties of numeric types from binary sourse.
 * @param classProperty - class property object.
 * @param numberOfElements - The number of elements in each property array that propertyTableProperty contains. It's a number of rows in the table.
 * @param valuesDataBytes - Data taken from values property of the property table property.
 * @param arrayOffsets - Offsets for variable-length arrays. It's null for fixed-length arrays or scalar types.
 * @returns Property values in a typed array or in an array of typed arrays.
 */
function getPropertyDataNumeric(classProperty, numberOfElements, valuesDataBytes, arrayOffsets) {
    const isArray = classProperty.type === 'ARRAY';
    const arrayCount = classProperty.componentCount;
    /*
    We are getting Numeric data. So,
      the component type can be one of NumericComponentType,
      the attribute type should be 'SCALAR'
    */
    const attributeType = 'SCALAR';
    const componentType = classProperty.componentType || classProperty.type;
    const elementSize = getArrayElementByteSize(attributeType, componentType);
    const elementCount = valuesDataBytes.byteLength / elementSize;
    const valuesData = convertRawBufferToMetadataArray(valuesDataBytes, attributeType, componentType, elementCount);
    if (isArray) {
        if (arrayOffsets) {
            // VARIABLE-length array
            return parseVariableLengthArrayNumeric(valuesData, numberOfElements, arrayOffsets, valuesDataBytes.length, elementSize);
        }
        if (arrayCount) {
            // FIXED-length array
            return parseFixedLengthArrayNumeric(valuesData, numberOfElements, arrayCount);
        }
        return [];
    }
    return valuesData;
}
/**
 * Gets properties from texture associated with all mesh primitives.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param featureTextureProperty
 * @param attributeName
 * @returns Feature texture data
 */
function getPropertyDataFromTexture(scenegraph, featureTextureProperty, attributeName) {
    const json = scenegraph.gltf.json;
    if (!json.meshes) {
        return [];
    }
    const featureTextureTable = [];
    for (const mesh of json.meshes) {
        for (const primitive of mesh.primitives) {
            processPrimitiveTextures(scenegraph, attributeName, featureTextureProperty, featureTextureTable, primitive);
        }
    }
    return featureTextureTable;
}
/**
 * Processes data encoded in the texture associated with the primitive. This data will be accessible through the attributes.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param attributeName
 * @param featureTextureProperty
 * @param featureTextureTable
 * @param primitive
 */
function processPrimitiveTextures(scenegraph, attributeName, featureTextureProperty, featureTextureTable, primitive) {
    const textureInfoTopLevel = {
        channels: featureTextureProperty.channels,
        ...featureTextureProperty.texture
    };
    const propertyData = getPrimitiveTextureData(scenegraph, textureInfoTopLevel, primitive);
    if (!propertyData) {
        return;
    }
    primitivePropertyDataToAttributes(scenegraph, attributeName, propertyData, featureTextureTable, primitive);
}
