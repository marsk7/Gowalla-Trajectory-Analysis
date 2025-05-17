declare const _default: {
    defaultUniforms: {
        useFloatColors: boolean;
        isActive: false;
        isAttribute: false;
        isHighlightActive: false;
        highlightedObjectColor: [0, 0, 0];
        highlightColor: import("@math.gl/types").NumberArray4;
    };
    inject: {
        'vs:DECKGL_FILTER_GL_POSITION': string;
        'vs:DECKGL_FILTER_COLOR': string;
        'fs:DECKGL_FILTER_COLOR': {
            order: number;
            injection: string;
        };
    };
    props: import("@luma.gl/shadertools").PickingProps;
    uniforms: import("@luma.gl/shadertools").PickingUniforms;
    name: "picking";
    uniformTypes: {
        readonly isActive: "f32";
        readonly isAttribute: "f32";
        readonly isHighlightActive: "f32";
        readonly useFloatColors: "f32";
        readonly highlightedObjectColor: "vec3<f32>";
        readonly highlightColor: "vec4<f32>";
    };
    vs: "uniform pickingUniforms {\n  float isActive;\n  float isAttribute;\n  float isHighlightActive;\n  float useFloatColors;\n  vec3 highlightedObjectColor;\n  vec4 highlightColor;\n} picking;\n\nout vec4 picking_vRGBcolor_Avalid;\n\n// Normalize unsigned byte color to 0-1 range\nvec3 picking_normalizeColor(vec3 color) {\n  return picking.useFloatColors > 0.5 ? color : color / 255.0;\n}\n\n// Normalize unsigned byte color to 0-1 range\nvec4 picking_normalizeColor(vec4 color) {\n  return picking.useFloatColors > 0.5 ? color : color / 255.0;\n}\n\nbool picking_isColorZero(vec3 color) {\n  return dot(color, vec3(1.0)) < 0.00001;\n}\n\nbool picking_isColorValid(vec3 color) {\n  return dot(color, vec3(1.0)) > 0.00001;\n}\n\n// Check if this vertex is highlighted \nbool isVertexHighlighted(vec3 vertexColor) {\n  vec3 highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);\n  return\n    bool(picking.isHighlightActive) && picking_isColorZero(abs(vertexColor - highlightedObjectColor));\n}\n\n// Set the current picking color\nvoid picking_setPickingColor(vec3 pickingColor) {\n  pickingColor = picking_normalizeColor(pickingColor);\n\n  if (bool(picking.isActive)) {\n    // Use alpha as the validity flag. If pickingColor is [0, 0, 0] fragment is non-pickable\n    picking_vRGBcolor_Avalid.a = float(picking_isColorValid(pickingColor));\n\n    if (!bool(picking.isAttribute)) {\n      // Stores the picking color so that the fragment shader can render it during picking\n      picking_vRGBcolor_Avalid.rgb = pickingColor;\n    }\n  } else {\n    // Do the comparison with selected item color in vertex shader as it should mean fewer compares\n    picking_vRGBcolor_Avalid.a = float(isVertexHighlighted(pickingColor));\n  }\n}\n\nvoid picking_setPickingAttribute(float value) {\n  if (bool(picking.isAttribute)) {\n    picking_vRGBcolor_Avalid.r = value;\n  }\n}\n\nvoid picking_setPickingAttribute(vec2 value) {\n  if (bool(picking.isAttribute)) {\n    picking_vRGBcolor_Avalid.rg = value;\n  }\n}\n\nvoid picking_setPickingAttribute(vec3 value) {\n  if (bool(picking.isAttribute)) {\n    picking_vRGBcolor_Avalid.rgb = value;\n  }\n}\n";
    fs: "uniform pickingUniforms {\n  float isActive;\n  float isAttribute;\n  float isHighlightActive;\n  float useFloatColors;\n  vec3 highlightedObjectColor;\n  vec4 highlightColor;\n} picking;\n\nin vec4 picking_vRGBcolor_Avalid;\n\n/*\n * Returns highlight color if this item is selected.\n */\nvec4 picking_filterHighlightColor(vec4 color) {\n  // If we are still picking, we don't highlight\n  if (picking.isActive > 0.5) {\n    return color;\n  }\n\n  bool selected = bool(picking_vRGBcolor_Avalid.a);\n\n  if (selected) {\n    // Blend in highlight color based on its alpha value\n    float highLightAlpha = picking.highlightColor.a;\n    float blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);\n    float highLightRatio = highLightAlpha / blendedAlpha;\n\n    vec3 blendedRGB = mix(color.rgb, picking.highlightColor.rgb, highLightRatio);\n    return vec4(blendedRGB, blendedAlpha);\n  } else {\n    return color;\n  }\n}\n\n/*\n * Returns picking color if picking enabled else unmodified argument.\n */\nvec4 picking_filterPickingColor(vec4 color) {\n  if (bool(picking.isActive)) {\n    if (picking_vRGBcolor_Avalid.a == 0.0) {\n      discard;\n    }\n    return picking_vRGBcolor_Avalid;\n  }\n  return color;\n}\n\n/*\n * Returns picking color if picking is enabled if not\n * highlight color if this item is selected, otherwise unmodified argument.\n */\nvec4 picking_filterColor(vec4 color) {\n  vec4 highlightColor = picking_filterHighlightColor(color);\n  return picking_filterPickingColor(highlightColor);\n}\n";
    getUniforms: (opts?: import("@luma.gl/shadertools").PickingProps, prevUniforms?: import("@luma.gl/shadertools").PickingUniforms) => import("@luma.gl/shadertools").PickingUniforms;
};
export default _default;
//# sourceMappingURL=picking.d.ts.map