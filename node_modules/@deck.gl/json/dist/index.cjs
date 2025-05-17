"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  JSONConfiguration: () => JSONConfiguration,
  JSONConverter: () => JSONConverter,
  Transport: () => Transport,
  _convertFunctions: () => convertFunctions,
  _parseExpressionString: () => parseExpressionString,
  _shallowEqualObjects: () => shallowEqualObjects
});
module.exports = __toCommonJS(dist_exports);

// dist/utils/assert.js
function assert(condition, message = "") {
  if (!condition) {
    throw new Error(`JSON conversion error ${message}`);
  }
}

// dist/utils/get.js
function get(container, compositeKey) {
  const keyList = getKeys(compositeKey);
  let value = container;
  for (const key of keyList) {
    value = isObject(value) ? value[key] : void 0;
  }
  return value;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
var keyMap = {};
function getKeys(compositeKey) {
  if (typeof compositeKey === "string") {
    let keyList = keyMap[compositeKey];
    if (!keyList) {
      keyList = compositeKey.split(".");
      keyMap[compositeKey] = keyList;
    }
    return keyList;
  }
  return Array.isArray(compositeKey) ? compositeKey : [compositeKey];
}

// dist/utils/expression-eval.js
var import_jsep = __toESM(require("jsep"), 1);
var binops = {
  "||": (a, b) => {
    return a || b;
  },
  "&&": (a, b) => {
    return a && b;
  },
  "|": (a, b) => {
    return a | b;
  },
  "^": (a, b) => {
    return a ^ b;
  },
  "&": (a, b) => {
    return a & b;
  },
  "==": (a, b) => {
    return a == b;
  },
  "!=": (a, b) => {
    return a != b;
  },
  "===": (a, b) => {
    return a === b;
  },
  "!==": (a, b) => {
    return a !== b;
  },
  "<": (a, b) => {
    return a < b;
  },
  ">": (a, b) => {
    return a > b;
  },
  "<=": (a, b) => {
    return a <= b;
  },
  ">=": (a, b) => {
    return a >= b;
  },
  "<<": (a, b) => {
    return a << b;
  },
  ">>": (a, b) => {
    return a >> b;
  },
  ">>>": (a, b) => {
    return a >>> b;
  },
  "+": (a, b) => {
    return a + b;
  },
  "-": (a, b) => {
    return a - b;
  },
  "*": (a, b) => {
    return a * b;
  },
  "/": (a, b) => {
    return a / b;
  },
  "%": (a, b) => {
    return a % b;
  }
};
var unops = {
  "-": (a) => {
    return -a;
  },
  "+": (a) => {
    return +a;
  },
  "~": (a) => {
    return ~a;
  },
  "!": (a) => {
    return !a;
  }
};
function evaluateArray(list, context) {
  return list.map(function(v) {
    return evaluate(v, context);
  });
}
function evaluateMember(node, context) {
  const object = evaluate(node.object, context);
  let key;
  if (node.computed) {
    key = evaluate(node.property, context);
  } else {
    key = node.property.name;
  }
  if (/^__proto__|prototype|constructor$/.test(key)) {
    throw Error(`Access to member "${key}" disallowed.`);
  }
  return [object, object[key]];
}
function evaluate(_node, context) {
  const node = _node;
  switch (node.type) {
    case "ArrayExpression":
      return evaluateArray(node.elements, context);
    case "BinaryExpression":
      return binops[node.operator](evaluate(node.left, context), evaluate(node.right, context));
    case "CallExpression":
      let caller;
      let fn;
      let assign;
      if (node.callee.type === "MemberExpression") {
        assign = evaluateMember(node.callee, context);
        caller = assign[0];
        fn = assign[1];
      } else {
        fn = evaluate(node.callee, context);
      }
      if (typeof fn !== "function") {
        return void 0;
      }
      return fn.apply(caller, evaluateArray(node.arguments, context));
    case "ConditionalExpression":
      return evaluate(node.test, context) ? evaluate(node.consequent, context) : evaluate(node.alternate, context);
    case "Identifier":
      return context[node.name];
    case "Literal":
      return node.value;
    case "LogicalExpression":
      if (node.operator === "||") {
        return evaluate(node.left, context) || evaluate(node.right, context);
      } else if (node.operator === "&&") {
        return evaluate(node.left, context) && evaluate(node.right, context);
      }
      return binops[node.operator](evaluate(node.left, context), evaluate(node.right, context));
    case "MemberExpression":
      return evaluateMember(node, context)[1];
    case "ThisExpression":
      return context;
    case "UnaryExpression":
      return unops[node.operator](evaluate(node.argument, context));
    default:
      return void 0;
  }
}

// dist/helpers/parse-expression-string.js
var cachedExpressionMap = {
  "-": (object) => object
};
function parseExpressionString(propValue, configuration) {
  if (propValue in cachedExpressionMap) {
    return cachedExpressionMap[propValue];
  }
  let func;
  const ast = (0, import_jsep.default)(propValue);
  if (ast.type === "Identifier") {
    func = (row) => {
      return get(row, propValue);
    };
  } else {
    traverse(ast, (node) => {
      if (node.type === "CallExpression") {
        throw new Error("Function calls not allowed in JSON expressions");
      }
    });
    func = (row) => {
      return evaluate(ast, row);
    };
  }
  cachedExpressionMap[propValue] = func;
  return func;
}
function traverse(node, visitor) {
  if (Array.isArray(node)) {
    node.forEach((element) => traverse(element, visitor));
  } else if (node && typeof node === "object") {
    if (node.type) {
      visitor(node);
    }
    for (const key in node) {
      traverse(node[key], visitor);
    }
  }
}

// dist/syntactic-sugar.js
var FUNCTION_IDENTIFIER = "@@=";
var CONSTANT_IDENTIFIER = "@@#";
var TYPE_KEY = "@@type";
var FUNCTION_KEY = "@@function";

// dist/json-configuration.js
var isObject2 = (value) => value && typeof value === "object";
var JSONConfiguration = class {
  constructor(...configurations) {
    this.typeKey = TYPE_KEY;
    this.functionKey = FUNCTION_KEY;
    this.log = console;
    this.classes = {};
    this.reactComponents = {};
    this.enumerations = {};
    this.constants = {};
    this.functions = {};
    this.React = null;
    this.convertFunction = parseExpressionString;
    this.preProcessClassProps = (Class, props) => props;
    this.postProcessConvertedJson = (json) => json;
    for (const configuration of configurations) {
      this.merge(configuration);
    }
  }
  merge(configuration) {
    for (const key in configuration) {
      switch (key) {
        case "layers":
        case "views":
          Object.assign(this.classes, configuration[key]);
          break;
        default:
          if (key in this) {
            const value = configuration[key];
            this[key] = isObject2(this[key]) ? Object.assign(this[key], value) : value;
          }
      }
    }
  }
  validate(configuration) {
    assert(!this.typeKey || typeof this.typeKey === "string");
    assert(isObject2(this.classes));
    return true;
  }
};

// dist/helpers/convert-functions.js
function hasFunctionIdentifier(value) {
  return typeof value === "string" && value.startsWith(FUNCTION_IDENTIFIER);
}
function trimFunctionIdentifier(value) {
  return value.replace(FUNCTION_IDENTIFIER, "");
}
function convertFunctions(props, configuration) {
  const replacedProps = {};
  for (const propName in props) {
    let propValue = props[propName];
    const isFunction = hasFunctionIdentifier(propValue);
    if (isFunction) {
      propValue = trimFunctionIdentifier(propValue);
      propValue = parseExpressionString(propValue, configuration);
    }
    replacedProps[propName] = propValue;
  }
  return replacedProps;
}

// dist/helpers/instantiate-class.js
function instantiateClass(type, props, configuration) {
  const Class = configuration.classes[type];
  const Component = configuration.reactComponents[type];
  if (!Class && !Component) {
    const { log } = configuration;
    if (log) {
      const stringProps = JSON.stringify(props, null, 0).slice(0, 40);
      log.warn(`JSON converter: No registered class of type ${type}(${stringProps}...)  `);
    }
    return null;
  }
  if (Class) {
    return instantiateJavaScriptClass(Class, props, configuration);
  }
  return instantiateReactComponent(Component, props, configuration);
}
function instantiateJavaScriptClass(Class, props, configuration) {
  if (configuration.preProcessClassProps) {
    props = configuration.preProcessClassProps(Class, props, configuration);
  }
  props = convertFunctions(props, configuration);
  return new Class(props);
}
function instantiateReactComponent(Component, props, configuration) {
  const { React } = configuration;
  const { children = [] } = props;
  delete props.children;
  if (configuration.preProcessClassProps) {
    props = configuration.preProcessClassProps(Component, props, configuration);
  }
  props = convertFunctions(props, configuration);
  return React.createElement(Component, props, children);
}

// dist/helpers/execute-function.js
function executeFunction(targetFunction, props, configuration) {
  const matchedFunction = configuration.functions[targetFunction];
  if (!matchedFunction) {
    const { log } = configuration;
    if (log) {
      const stringProps = JSON.stringify(props, null, 0).slice(0, 40);
      log.warn(`JSON converter: No registered function ${targetFunction}(${stringProps}...)  `);
    }
    return null;
  }
  return matchedFunction(props);
}

// dist/helpers/parse-json.js
function parseJSON(json) {
  return typeof json === "string" ? JSON.parse(json) : json;
}

// dist/json-converter.js
var isObject3 = (value) => value && typeof value === "object";
var JSONConverter = class {
  constructor(props) {
    this.log = console;
    this.onJSONChange = () => {
    };
    this.json = null;
    this.convertedJson = null;
    this.setProps(props);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  finalize() {
  }
  setProps(props) {
    if ("configuration" in props) {
      this.configuration = props.configuration instanceof JSONConfiguration ? props.configuration : new JSONConfiguration(props.configuration);
    }
    if ("onJSONChange" in props) {
      this.onJSONChange = props.onJSONChange;
    }
  }
  mergeConfiguration(config) {
    this.configuration.merge(config);
  }
  convert(json) {
    if (!json || json === this.json) {
      return this.convertedJson;
    }
    this.json = json;
    const parsedJSON = parseJSON(json);
    let convertedJson = convertJSON(parsedJSON, this.configuration);
    convertedJson = this.configuration.postProcessConvertedJson(convertedJson);
    this.convertedJson = convertedJson;
    return convertedJson;
  }
  // DEPRECATED: Backwards compatibility
  convertJson(json) {
    return this.convert(json);
  }
};
function convertJSON(json, configuration) {
  configuration = new JSONConfiguration(configuration);
  return convertJSONRecursively(json, "", configuration);
}
function convertJSONRecursively(json, key, configuration) {
  if (Array.isArray(json)) {
    return json.map((element, i) => convertJSONRecursively(element, String(i), configuration));
  }
  if (isClassInstance(json, configuration)) {
    return convertClassInstance(json, configuration);
  }
  if (isObject3(json)) {
    if (FUNCTION_KEY in json) {
      return convertFunctionObject(json, configuration);
    }
    return convertPlainObject(json, configuration);
  }
  if (typeof json === "string") {
    return convertString(json, key, configuration);
  }
  return json;
}
function isClassInstance(json, configuration) {
  const { typeKey } = configuration;
  const isClass = isObject3(json) && Boolean(json[typeKey]);
  return isClass;
}
function convertClassInstance(json, configuration) {
  const { typeKey } = configuration;
  const type = json[typeKey];
  let props = { ...json };
  delete props[typeKey];
  props = convertPlainObject(props, configuration);
  return instantiateClass(type, props, configuration);
}
function convertFunctionObject(json, configuration) {
  const { functionKey } = configuration;
  const targetFunction = json[functionKey];
  let props = { ...json };
  delete props[functionKey];
  props = convertPlainObject(props, configuration);
  return executeFunction(targetFunction, props, configuration);
}
function convertPlainObject(json, configuration) {
  assert(isObject3(json));
  const result = {};
  for (const key in json) {
    const value = json[key];
    result[key] = convertJSONRecursively(value, key, configuration);
  }
  return result;
}
function convertString(string, key, configuration) {
  if (string.startsWith(FUNCTION_IDENTIFIER) && configuration.convertFunction) {
    string = string.replace(FUNCTION_IDENTIFIER, "");
    return configuration.convertFunction(string, configuration);
  }
  if (string.startsWith(CONSTANT_IDENTIFIER)) {
    string = string.replace(CONSTANT_IDENTIFIER, "");
    if (configuration.constants[string]) {
      return configuration.constants[string];
    }
    const [enumVarName, enumValName] = string.split(".");
    return configuration.enumerations[enumVarName][enumValName];
  }
  return string;
}

// dist/transports/transport.js
var state = {
  onInitialize: (_) => _,
  onFinalize: (_) => _,
  onMessage: (_) => _
};
var Transport = class {
  static setCallbacks({ onInitialize, onFinalize, onMessage }) {
    if (onInitialize) {
      state.onInitialize = onInitialize;
    }
    if (onFinalize) {
      state.onFinalize = onFinalize;
    }
    if (onMessage) {
      state.onMessage = onMessage;
    }
  }
  constructor(name = "Transport") {
    this._messageQueue = [];
    this.userData = {};
    this._destroyed = false;
    this.name = name;
  }
  /**
   * Return a root DOM element for this transport connection
   * @return {HTMLElement} default implementation returns document.body
   * Jupyter Notebook transports will return an element associated with the notebook cell
   */
  getRootDOMElement() {
    return typeof document !== "undefined" ? document.body : null;
  }
  /**
   * Back-channel messaging
   */
  sendJSONMessage() {
    console.error("Back-channel not implemented for this transport");
  }
  /**
   * Back-channel messaging
   */
  sendBinaryMessage() {
    console.error("Back-channel not implemented for this transport");
  }
  //
  // API for transports (not intended for apps)
  //
  _initialize(options = {}) {
    const message = { transport: this, ...options };
    state.onInitialize(message);
  }
  _finalize(options = {}) {
    const message = { transport: this, ...options };
    state.onFinalize(message);
    this._destroyed = true;
  }
  _messageReceived(message = {}) {
    message = { transport: this, ...message };
    console.debug("Delivering transport message", message);
    state.onMessage(message);
  }
  /*
    // This tries to handle the case that a transport connection initializes before the application
    // has set the callbacks.
    // Note: It is not clear that this can actually happen in the in initial Jupyter widget transport
    _flushQueuedConnections() {
      if (onInitialize) {
        state._initPromise.then(initArgs => {
          onInitialize(initArgs);
  
          if (state._onMessage) {
            // Send any queued messages
            let message;
            while ((message = this._messageQueue.pop())) {
              console.debug('Delivering queued transport message', message); // eslint-disable-line
              this._onMessage(message);
            }
          }
        });
      }
    }
    */
  static _stringifyJSONSafe(v) {
    const cache = /* @__PURE__ */ new Set();
    return JSON.stringify(v, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          try {
            return JSON.parse(JSON.stringify(value));
          } catch (err) {
            return void 0;
          }
        }
        cache.add(value);
      }
      return value;
    });
  }
};

// dist/utils/shallow-equal-objects.js
function shallowEqualObjects(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (const key in b) {
    if (!(key in a)) {
      return false;
    }
  }
  return true;
}
//# sourceMappingURL=index.cjs.map
