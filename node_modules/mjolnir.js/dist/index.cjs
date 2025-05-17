var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  EventManager: () => EventManager,
  InputDirection: () => InputDirection,
  InputEvent: () => InputEvent,
  Pan: () => PanRecognizer,
  Pinch: () => PinchRecognizer,
  Press: () => PressRecognizer,
  Recognizer: () => Recognizer,
  Rotate: () => RotateRecognizer,
  Swipe: () => SwipeRecognizer,
  Tap: () => TapRecognizer
});
module.exports = __toCommonJS(dist_exports);

// dist/hammerjs/input/input-consts.js
var COMPUTE_INTERVAL = 25;
var InputEvent;
(function(InputEvent2) {
  InputEvent2[InputEvent2["Start"] = 1] = "Start";
  InputEvent2[InputEvent2["Move"] = 2] = "Move";
  InputEvent2[InputEvent2["End"] = 4] = "End";
  InputEvent2[InputEvent2["Cancel"] = 8] = "Cancel";
})(InputEvent || (InputEvent = {}));
var InputDirection;
(function(InputDirection2) {
  InputDirection2[InputDirection2["None"] = 0] = "None";
  InputDirection2[InputDirection2["Left"] = 1] = "Left";
  InputDirection2[InputDirection2["Right"] = 2] = "Right";
  InputDirection2[InputDirection2["Up"] = 4] = "Up";
  InputDirection2[InputDirection2["Down"] = 8] = "Down";
  InputDirection2[InputDirection2["Horizontal"] = 3] = "Horizontal";
  InputDirection2[InputDirection2["Vertical"] = 12] = "Vertical";
  InputDirection2[InputDirection2["All"] = 15] = "All";
})(InputDirection || (InputDirection = {}));

// dist/hammerjs/recognizer/recognizer-state.js
var RecognizerState;
(function(RecognizerState2) {
  RecognizerState2[RecognizerState2["Possible"] = 1] = "Possible";
  RecognizerState2[RecognizerState2["Began"] = 2] = "Began";
  RecognizerState2[RecognizerState2["Changed"] = 4] = "Changed";
  RecognizerState2[RecognizerState2["Ended"] = 8] = "Ended";
  RecognizerState2[RecognizerState2["Recognized"] = 8] = "Recognized";
  RecognizerState2[RecognizerState2["Cancelled"] = 16] = "Cancelled";
  RecognizerState2[RecognizerState2["Failed"] = 32] = "Failed";
})(RecognizerState || (RecognizerState = {}));

// dist/hammerjs/touchaction/touchaction-Consts.js
var TOUCH_ACTION_COMPUTE = "compute";
var TOUCH_ACTION_AUTO = "auto";
var TOUCH_ACTION_MANIPULATION = "manipulation";
var TOUCH_ACTION_NONE = "none";
var TOUCH_ACTION_PAN_X = "pan-x";
var TOUCH_ACTION_PAN_Y = "pan-y";

// dist/hammerjs/touchaction/clean-touch-actions.js
function cleanTouchActions(actions) {
  if (actions.includes(TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }
  const hasPanX = actions.includes(TOUCH_ACTION_PAN_X);
  const hasPanY = actions.includes(TOUCH_ACTION_PAN_Y);
  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_NONE;
  }
  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  }
  if (actions.includes(TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }
  return TOUCH_ACTION_AUTO;
}

// dist/hammerjs/touchaction/touchaction.js
var TouchAction = class {
  constructor(manager, value) {
    this.actions = "";
    this.manager = manager;
    this.set(value);
  }
  /**
   * set the touchAction value on the element or enable the polyfill
   */
  set(value) {
    if (value === TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }
    if (this.manager.element) {
      this.manager.element.style.touchAction = value;
      this.actions = value;
    }
  }
  /**
   * just re-set the touchAction value
   */
  update() {
    this.set(this.manager.options.touchAction);
  }
  /**
   * compute the value for the touchAction property based on the recognizer's settings
   */
  compute() {
    let actions = [];
    for (const recognizer of this.manager.recognizers) {
      if (recognizer.options.enable) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    }
    return cleanTouchActions(actions.join(" "));
  }
};

// dist/hammerjs/utils/split-str.js
function splitStr(str) {
  return str.trim().split(/\s+/g);
}

// dist/hammerjs/utils/event-listeners.js
function addEventListeners(target, types, handler) {
  if (!target) {
    return;
  }
  for (const type of splitStr(types)) {
    target.addEventListener(type, handler, false);
  }
}
function removeEventListeners(target, types, handler) {
  if (!target) {
    return;
  }
  for (const type of splitStr(types)) {
    target.removeEventListener(type, handler, false);
  }
}

// dist/hammerjs/utils/get-window-for-element.js
function getWindowForElement(element) {
  const doc = element.ownerDocument || element;
  return doc.defaultView;
}

// dist/hammerjs/utils/has-parent.js
function hasParent(node, parent) {
  let ancestor = node;
  while (ancestor) {
    if (ancestor === parent) {
      return true;
    }
    ancestor = ancestor.parentNode;
  }
  return false;
}

// dist/hammerjs/input/get-center.js
function getCenter(pointers) {
  const pointersLength = pointers.length;
  if (pointersLength === 1) {
    return {
      x: Math.round(pointers[0].clientX),
      y: Math.round(pointers[0].clientY)
    };
  }
  let x = 0;
  let y = 0;
  let i = 0;
  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }
  return {
    x: Math.round(x / pointersLength),
    y: Math.round(y / pointersLength)
  };
}

// dist/hammerjs/input/simple-clone-input-data.js
function simpleCloneInputData(input) {
  const pointers = [];
  let i = 0;
  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: Math.round(input.pointers[i].clientX),
      clientY: Math.round(input.pointers[i].clientY)
    };
    i++;
  }
  return {
    timeStamp: Date.now(),
    pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}

// dist/hammerjs/input/get-distance.js
function getPointDistance(p1, p2) {
  const x = p2.x - p1.x;
  const y = p2.y - p1.y;
  return Math.sqrt(x * x + y * y);
}
function getEventDistance(p1, p2) {
  const x = p2.clientX - p1.clientX;
  const y = p2.clientY - p1.clientY;
  return Math.sqrt(x * x + y * y);
}

// dist/hammerjs/input/get-angle.js
function getPointAngle(p1, p2) {
  const x = p2.x - p1.x;
  const y = p2.y - p1.y;
  return Math.atan2(y, x) * 180 / Math.PI;
}
function getEventAngle(p1, p2) {
  const x = p2.clientX - p1.clientX;
  const y = p2.clientY - p1.clientY;
  return Math.atan2(y, x) * 180 / Math.PI;
}

// dist/hammerjs/input/get-direction.js
function getDirection(dx, dy) {
  if (dx === dy) {
    return InputDirection.None;
  }
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx < 0 ? InputDirection.Left : InputDirection.Right;
  }
  return dy < 0 ? InputDirection.Up : InputDirection.Down;
}

// dist/hammerjs/input/get-delta-xy.js
function computeDeltaXY(session, input) {
  const center = input.center;
  let offset = session.offsetDelta;
  let prevDelta = session.prevDelta;
  const prevInput = session.prevInput;
  if (input.eventType === InputEvent.Start || (prevInput == null ? void 0 : prevInput.eventType) === InputEvent.End) {
    prevDelta = session.prevDelta = {
      x: (prevInput == null ? void 0 : prevInput.deltaX) || 0,
      y: (prevInput == null ? void 0 : prevInput.deltaY) || 0
    };
    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }
  return {
    deltaX: prevDelta.x + (center.x - offset.x),
    deltaY: prevDelta.y + (center.y - offset.y)
  };
}

// dist/hammerjs/input/get-velocity.js
function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}

// dist/hammerjs/input/get-scale.js
function getScale(start, end) {
  return getEventDistance(end[0], end[1]) / getEventDistance(start[0], start[1]);
}

// dist/hammerjs/input/get-rotation.js
function getRotation(start, end) {
  return getEventAngle(end[1], end[0]) - getEventAngle(start[1], start[0]);
}

// dist/hammerjs/input/compute-interval-input-data.js
function computeIntervalInputData(session, input) {
  const last = session.lastInterval || input;
  const deltaTime = input.timeStamp - last.timeStamp;
  let velocity;
  let velocityX;
  let velocityY;
  let direction;
  if (input.eventType !== InputEvent.Cancel && (deltaTime > COMPUTE_INTERVAL || last.velocity === void 0)) {
    const deltaX = input.deltaX - last.deltaX;
    const deltaY = input.deltaY - last.deltaY;
    const v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = Math.abs(v.x) > Math.abs(v.y) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);
    session.lastInterval = input;
  } else {
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }
  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}

// dist/hammerjs/input/compute-input-data.js
function computeInputData(manager, input) {
  const { session } = manager;
  const { pointers } = input;
  const { length: pointersLength } = pointers;
  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  }
  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }
  const { firstInput, firstMultiple } = session;
  const offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  const center = input.center = getCenter(pointers);
  input.timeStamp = Date.now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getPointAngle(offsetCenter, center);
  input.distance = getPointDistance(offsetCenter, center);
  const { deltaX, deltaY } = computeDeltaXY(session, input);
  input.deltaX = deltaX;
  input.deltaY = deltaY;
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  const overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = Math.abs(overallVelocity.x) > Math.abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  let target = manager.element;
  if (hasParent(input.srcEvent.target, target)) {
    target = input.srcEvent.target;
  }
  input.target = target;
  computeIntervalInputData(session, input);
  return input;
}

// dist/hammerjs/input/input-handler.js
function inputHandler(manager, eventType, input) {
  const pointersLen = input.pointers.length;
  const changedPointersLen = input.changedPointers.length;
  const isFirst = eventType & InputEvent.Start && pointersLen - changedPointersLen === 0;
  const isFinal = eventType & (InputEvent.End | InputEvent.Cancel) && pointersLen - changedPointersLen === 0;
  input.isFirst = Boolean(isFirst);
  input.isFinal = Boolean(isFinal);
  if (isFirst) {
    manager.session = {};
  }
  input.eventType = eventType;
  const processedInput = computeInputData(manager, input);
  manager.emit("hammer.input", processedInput);
  manager.recognize(processedInput);
  manager.session.prevInput = processedInput;
}

// dist/hammerjs/input/input.js
var Input = class {
  constructor(manager) {
    this.evEl = "";
    this.evWin = "";
    this.evTarget = "";
    this.domHandler = (ev) => {
      if (this.manager.options.enable) {
        this.handler(ev);
      }
    };
    this.manager = manager;
    this.element = manager.element;
    this.target = manager.options.inputTarget || manager.element;
  }
  callback(eventType, input) {
    inputHandler(this.manager, eventType, input);
  }
  // eslint-disable @typescript-eslint/unbound-method
  /**
   * bind the events
   */
  init() {
    addEventListeners(this.element, this.evEl, this.domHandler);
    addEventListeners(this.target, this.evTarget, this.domHandler);
    addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  }
  /**
   * unbind the events
   */
  destroy() {
    removeEventListeners(this.element, this.evEl, this.domHandler);
    removeEventListeners(this.target, this.evTarget, this.domHandler);
    removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  }
};

// dist/hammerjs/inputs/pointerevent.js
var POINTER_INPUT_MAP = {
  pointerdown: InputEvent.Start,
  pointermove: InputEvent.Move,
  pointerup: InputEvent.End,
  pointercancel: InputEvent.Cancel,
  pointerout: InputEvent.Cancel
};
var POINTER_ELEMENT_EVENTS = "pointerdown";
var POINTER_WINDOW_EVENTS = "pointermove pointerup pointercancel";
var PointerEventInput = class extends Input {
  constructor(manager) {
    super(manager);
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;
    this.store = this.manager.session.pointerEvents = [];
    this.init();
  }
  /**
   * handle mouse events
   */
  handler(ev) {
    const { store } = this;
    let removePointer = false;
    const eventType = POINTER_INPUT_MAP[ev.type];
    const pointerType = ev.pointerType;
    const isTouch = pointerType === "touch";
    let storeIndex = store.findIndex((e) => e.pointerId === ev.pointerId);
    if (eventType & InputEvent.Start && (ev.buttons || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (InputEvent.End | InputEvent.Cancel)) {
      removePointer = true;
    }
    if (storeIndex < 0) {
      return;
    }
    store[storeIndex] = ev;
    this.callback(eventType, {
      pointers: store,
      changedPointers: [ev],
      eventType,
      pointerType,
      srcEvent: ev
    });
    if (removePointer) {
      store.splice(storeIndex, 1);
    }
  }
};

// dist/hammerjs/utils/prefixed.js
var VENDOR_PREFIXES = ["", "webkit", "Moz", "MS", "ms", "o"];
function prefixed(obj, property) {
  const camelProp = property[0].toUpperCase() + property.slice(1);
  for (const prefix of VENDOR_PREFIXES) {
    const prop = prefix ? prefix + camelProp : property;
    if (prop in obj) {
      return prop;
    }
  }
  return void 0;
}

// dist/hammerjs/manager.js
var STOP = 1;
var FORCED_STOP = 2;
var defaultOptions = {
  touchAction: "compute",
  enable: true,
  inputTarget: null,
  cssProps: {
    /**
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     */
    userSelect: "none",
    /**
     * (Webkit) Disable default dragging behavior
     */
    // @ts-ignore
    userDrag: "none",
    /**
     * (iOS only) Disables the default callout shown when you touch and hold a touch target.
     * When you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     */
    // @ts-ignore
    touchCallout: "none",
    /**
     * (iOS only) Sets the color of the highlight that appears over a link while it's being tapped.
     */
    // @ts-ignore
    tapHighlightColor: "rgba(0,0,0,0)"
  }
};
var Manager = class {
  constructor(element, options) {
    this.options = {
      ...defaultOptions,
      ...options,
      cssProps: { ...defaultOptions.cssProps, ...options.cssProps },
      inputTarget: options.inputTarget || element
    };
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = new PointerEventInput(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    this.toggleCssProps(true);
  }
  /**
   * set options
   */
  set(options) {
    Object.assign(this.options, options);
    if (options.touchAction) {
      this.touchAction.update();
    }
    if (options.inputTarget) {
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }
    return this;
  }
  /**
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   */
  stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  }
  /**
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   */
  recognize(inputData) {
    const { session } = this;
    if (session.stopped) {
      return;
    }
    if (this.session.prevented) {
      inputData.srcEvent.preventDefault();
    }
    let recognizer;
    const { recognizers } = this;
    let { curRecognizer } = session;
    if (!curRecognizer || curRecognizer && curRecognizer.state & RecognizerState.Recognized) {
      curRecognizer = session.curRecognizer = null;
    }
    let i = 0;
    while (i < recognizers.length) {
      recognizer = recognizers[i];
      if (session.stopped !== FORCED_STOP && // 1
      (!curRecognizer || recognizer === curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      }
      if (!curRecognizer && recognizer.state & (RecognizerState.Began | RecognizerState.Changed | RecognizerState.Ended)) {
        curRecognizer = session.curRecognizer = recognizer;
      }
      i++;
    }
  }
  /**
   * get a recognizer by its event name.
   */
  get(recognizerName) {
    const { recognizers } = this;
    for (let i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event === recognizerName) {
        return recognizers[i];
      }
    }
    return null;
  }
  /**
   * add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   */
  add(recognizer) {
    if (Array.isArray(recognizer)) {
      for (const item of recognizer) {
        this.add(item);
      }
      return this;
    }
    const existing = this.get(recognizer.options.event);
    if (existing) {
      this.remove(existing);
    }
    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  }
  /**
   * remove a recognizer by name or instance
   */
  remove(recognizerOrName) {
    if (Array.isArray(recognizerOrName)) {
      for (const item of recognizerOrName) {
        this.remove(item);
      }
      return this;
    }
    const recognizer = typeof recognizerOrName === "string" ? this.get(recognizerOrName) : recognizerOrName;
    if (recognizer) {
      const { recognizers } = this;
      const index = recognizers.indexOf(recognizer);
      if (index !== -1) {
        recognizers.splice(index, 1);
        this.touchAction.update();
      }
    }
    return this;
  }
  /**
   * bind event
   */
  on(events, handler) {
    if (!events || !handler) {
      return;
    }
    const { handlers } = this;
    for (const event of splitStr(events)) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    }
  }
  /**
   * unbind event, leave hander blank to remove all handlers
   */
  off(events, handler) {
    if (!events) {
      return;
    }
    const { handlers } = this;
    for (const event of splitStr(events)) {
      if (!handler) {
        delete handlers[event];
      } else if (handlers[event]) {
        handlers[event].splice(handlers[event].indexOf(handler), 1);
      }
    }
  }
  /**
   * emit event to the listeners
   */
  emit(event, data) {
    const handlers = this.handlers[event] && this.handlers[event].slice();
    if (!handlers || !handlers.length) {
      return;
    }
    const evt = data;
    evt.type = event;
    evt.preventDefault = function() {
      data.srcEvent.preventDefault();
    };
    let i = 0;
    while (i < handlers.length) {
      handlers[i](evt);
      i++;
    }
  }
  /**
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */
  destroy() {
    this.toggleCssProps(false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  }
  /**
   * add/remove the css properties as defined in manager.options.cssProps
   */
  toggleCssProps(add) {
    const { element } = this;
    if (!element) {
      return;
    }
    for (const [name, value] of Object.entries(this.options.cssProps)) {
      const prop = prefixed(element.style, name);
      if (add) {
        this.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = this.oldCssProps[prop] || "";
      }
    }
    if (!add) {
      this.oldCssProps = {};
    }
  }
};

// dist/hammerjs/utils/unique-id.js
var _uniqueId = 1;
function uniqueId() {
  return _uniqueId++;
}

// dist/hammerjs/recognizer/state-str.js
function stateStr(state) {
  if (state & RecognizerState.Cancelled) {
    return "cancel";
  } else if (state & RecognizerState.Ended) {
    return "end";
  } else if (state & RecognizerState.Changed) {
    return "move";
  } else if (state & RecognizerState.Began) {
    return "start";
  }
  return "";
}

// dist/hammerjs/recognizer/recognizer.js
var Recognizer = class {
  constructor(options) {
    this.options = options;
    this.id = uniqueId();
    this.state = RecognizerState.Possible;
    this.simultaneous = {};
    this.requireFail = [];
  }
  /**
   * set options
   */
  set(options) {
    Object.assign(this.options, options);
    this.manager.touchAction.update();
    return this;
  }
  /**
   * recognize simultaneous with an other recognizer.
   */
  recognizeWith(recognizerOrName) {
    if (Array.isArray(recognizerOrName)) {
      for (const item of recognizerOrName) {
        this.recognizeWith(item);
      }
      return this;
    }
    let otherRecognizer;
    if (typeof recognizerOrName === "string") {
      otherRecognizer = this.manager.get(recognizerOrName);
      if (!otherRecognizer) {
        throw new Error(`Cannot find recognizer ${recognizerOrName}`);
      }
    } else {
      otherRecognizer = recognizerOrName;
    }
    const { simultaneous } = this;
    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }
    return this;
  }
  /**
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   */
  dropRecognizeWith(recognizerOrName) {
    if (Array.isArray(recognizerOrName)) {
      for (const item of recognizerOrName) {
        this.dropRecognizeWith(item);
      }
      return this;
    }
    let otherRecognizer;
    if (typeof recognizerOrName === "string") {
      otherRecognizer = this.manager.get(recognizerOrName);
    } else {
      otherRecognizer = recognizerOrName;
    }
    if (otherRecognizer) {
      delete this.simultaneous[otherRecognizer.id];
    }
    return this;
  }
  /**
   * recognizer can only run when an other is failing
   */
  requireFailure(recognizerOrName) {
    if (Array.isArray(recognizerOrName)) {
      for (const item of recognizerOrName) {
        this.requireFailure(item);
      }
      return this;
    }
    let otherRecognizer;
    if (typeof recognizerOrName === "string") {
      otherRecognizer = this.manager.get(recognizerOrName);
      if (!otherRecognizer) {
        throw new Error(`Cannot find recognizer ${recognizerOrName}`);
      }
    } else {
      otherRecognizer = recognizerOrName;
    }
    const { requireFail } = this;
    if (requireFail.indexOf(otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }
    return this;
  }
  /**
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   */
  dropRequireFailure(recognizerOrName) {
    if (Array.isArray(recognizerOrName)) {
      for (const item of recognizerOrName) {
        this.dropRequireFailure(item);
      }
      return this;
    }
    let otherRecognizer;
    if (typeof recognizerOrName === "string") {
      otherRecognizer = this.manager.get(recognizerOrName);
    } else {
      otherRecognizer = recognizerOrName;
    }
    if (otherRecognizer) {
      const index = this.requireFail.indexOf(otherRecognizer);
      if (index > -1) {
        this.requireFail.splice(index, 1);
      }
    }
    return this;
  }
  /**
   * has require failures boolean
   */
  hasRequireFailures() {
    return Boolean(this.requireFail.find((recognier) => recognier.options.enable));
  }
  /**
   * if the recognizer can recognize simultaneous with an other recognizer
   */
  canRecognizeWith(otherRecognizer) {
    return Boolean(this.simultaneous[otherRecognizer.id]);
  }
  /**
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   */
  emit(input) {
    if (!input)
      return;
    const { state } = this;
    if (state < RecognizerState.Ended) {
      this.manager.emit(this.options.event + stateStr(state), input);
    }
    this.manager.emit(this.options.event, input);
    if (input.additionalEvent) {
      this.manager.emit(input.additionalEvent, input);
    }
    if (state >= RecognizerState.Ended) {
      this.manager.emit(this.options.event + stateStr(state), input);
    }
  }
  /**
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   */
  tryEmit(input) {
    if (this.canEmit()) {
      this.emit(input);
    } else {
      this.state = RecognizerState.Failed;
    }
  }
  /**
   * can we emit?
   */
  canEmit() {
    let i = 0;
    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (RecognizerState.Failed | RecognizerState.Possible))) {
        return false;
      }
      i++;
    }
    return true;
  }
  /**
   * update the recognizer
   */
  recognize(inputData) {
    const inputDataClone = { ...inputData };
    if (!this.options.enable) {
      this.reset();
      this.state = RecognizerState.Failed;
      return;
    }
    if (this.state & (RecognizerState.Recognized | RecognizerState.Cancelled | RecognizerState.Failed)) {
      this.state = RecognizerState.Possible;
    }
    this.state = this.process(inputDataClone);
    if (this.state & (RecognizerState.Began | RecognizerState.Changed | RecognizerState.Ended | RecognizerState.Cancelled)) {
      this.tryEmit(inputDataClone);
    }
  }
  /**
   * return the event names that are emitted by this recognizer
   */
  getEventNames() {
    return [this.options.event];
  }
  /**
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   */
  reset() {
  }
};

// dist/hammerjs/recognizers/attribute.js
var AttrRecognizer = class extends Recognizer {
  /**
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   */
  attrTest(input) {
    const optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  }
  /**
   * Process the input and return the state for the recognizer
   */
  process(input) {
    const { state } = this;
    const { eventType } = input;
    const isRecognized = state & (RecognizerState.Began | RecognizerState.Changed);
    const isValid = this.attrTest(input);
    if (isRecognized && (eventType & InputEvent.Cancel || !isValid)) {
      return state | RecognizerState.Cancelled;
    } else if (isRecognized || isValid) {
      if (eventType & InputEvent.End) {
        return state | RecognizerState.Ended;
      } else if (!(state & RecognizerState.Began)) {
        return RecognizerState.Began;
      }
      return state | RecognizerState.Changed;
    }
    return RecognizerState.Failed;
  }
};

// dist/hammerjs/recognizers/tap.js
var TapRecognizer = class extends Recognizer {
  constructor(options = {}) {
    super({
      enable: true,
      event: "tap",
      pointers: 1,
      taps: 1,
      interval: 300,
      time: 250,
      threshold: 9,
      posThreshold: 10,
      ...options
    });
    this.pTime = null;
    this.pCenter = null;
    this._timer = null;
    this._input = null;
    this.count = 0;
  }
  getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  }
  process(input) {
    const { options } = this;
    const validPointers = input.pointers.length === options.pointers;
    const validMovement = input.distance < options.threshold;
    const validTouchTime = input.deltaTime < options.time;
    this.reset();
    if (input.eventType & InputEvent.Start && this.count === 0) {
      return this.failTimeout();
    }
    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== InputEvent.End) {
        return this.failTimeout();
      }
      const validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      const validMultiTap = !this.pCenter || getPointDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;
      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }
      this._input = input;
      const tapCount = this.count % options.taps;
      if (tapCount === 0) {
        if (!this.hasRequireFailures()) {
          return RecognizerState.Recognized;
        }
        this._timer = setTimeout(() => {
          this.state = RecognizerState.Recognized;
          this.tryEmit(this._input);
        }, options.interval);
        return RecognizerState.Began;
      }
    }
    return RecognizerState.Failed;
  }
  failTimeout() {
    this._timer = setTimeout(() => {
      this.state = RecognizerState.Failed;
    }, this.options.interval);
    return RecognizerState.Failed;
  }
  reset() {
    clearTimeout(this._timer);
  }
  emit(input) {
    if (this.state === RecognizerState.Recognized) {
      input.tapCount = this.count;
      this.manager.emit(this.options.event, input);
    }
  }
};

// dist/hammerjs/recognizers/pan.js
var EVENT_NAMES = ["", "start", "move", "end", "cancel", "up", "down", "left", "right"];
var PanRecognizer = class extends AttrRecognizer {
  constructor(options = {}) {
    super({
      enable: true,
      pointers: 1,
      event: "pan",
      threshold: 10,
      direction: InputDirection.All,
      ...options
    });
    this.pX = null;
    this.pY = null;
  }
  getTouchAction() {
    const { options: { direction } } = this;
    const actions = [];
    if (direction & InputDirection.Horizontal) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }
    if (direction & InputDirection.Vertical) {
      actions.push(TOUCH_ACTION_PAN_X);
    }
    return actions;
  }
  getEventNames() {
    return EVENT_NAMES.map((suffix) => this.options.event + suffix);
  }
  directionTest(input) {
    const { options } = this;
    let hasMoved = true;
    let { distance } = input;
    let { direction } = input;
    const x = input.deltaX;
    const y = input.deltaY;
    if (!(direction & options.direction)) {
      if (options.direction & InputDirection.Horizontal) {
        direction = x === 0 ? InputDirection.None : x < 0 ? InputDirection.Left : InputDirection.Right;
        hasMoved = x !== this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? InputDirection.None : y < 0 ? InputDirection.Up : InputDirection.Down;
        hasMoved = y !== this.pY;
        distance = Math.abs(input.deltaY);
      }
    }
    input.direction = direction;
    return hasMoved && distance > options.threshold && Boolean(direction & options.direction);
  }
  attrTest(input) {
    return super.attrTest(input) && (Boolean(this.state & RecognizerState.Began) || !(this.state & RecognizerState.Began) && this.directionTest(input));
  }
  emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    const direction = InputDirection[input.direction].toLowerCase();
    if (direction) {
      input.additionalEvent = this.options.event + direction;
    }
    super.emit(input);
  }
};

// dist/hammerjs/recognizers/swipe.js
var EVENT_NAMES2 = ["", "up", "down", "left", "right"];
var SwipeRecognizer = class extends AttrRecognizer {
  constructor(options = {}) {
    super({
      enable: true,
      event: "swipe",
      threshold: 10,
      velocity: 0.3,
      direction: InputDirection.All,
      pointers: 1,
      ...options
    });
  }
  getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  }
  getEventNames() {
    return EVENT_NAMES2.map((suffix) => this.options.event + suffix);
  }
  attrTest(input) {
    const { direction } = this.options;
    let velocity = 0;
    if (direction & InputDirection.All) {
      velocity = input.overallVelocity;
    } else if (direction & InputDirection.Horizontal) {
      velocity = input.overallVelocityX;
    } else if (direction & InputDirection.Vertical) {
      velocity = input.overallVelocityY;
    }
    return super.attrTest(input) && Boolean(direction & input.offsetDirection) && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && Math.abs(velocity) > this.options.velocity && Boolean(input.eventType & InputEvent.End);
  }
  emit(input) {
    const direction = InputDirection[input.offsetDirection].toLowerCase();
    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }
    this.manager.emit(this.options.event, input);
  }
};

// dist/hammerjs/recognizers/pinch.js
var EVENT_NAMES3 = ["", "start", "move", "end", "cancel", "in", "out"];
var PinchRecognizer = class extends AttrRecognizer {
  constructor(options = {}) {
    super({
      enable: true,
      event: "pinch",
      threshold: 0,
      pointers: 2,
      ...options
    });
  }
  getTouchAction() {
    return [TOUCH_ACTION_NONE];
  }
  getEventNames() {
    return EVENT_NAMES3.map((suffix) => this.options.event + suffix);
  }
  attrTest(input) {
    return super.attrTest(input) && (Math.abs(input.scale - 1) > this.options.threshold || Boolean(this.state & RecognizerState.Began));
  }
  emit(input) {
    if (input.scale !== 1) {
      const inOut = input.scale < 1 ? "in" : "out";
      input.additionalEvent = this.options.event + inOut;
    }
    super.emit(input);
  }
};

// dist/hammerjs/recognizers/rotate.js
var EVENT_NAMES4 = ["", "start", "move", "end", "cancel"];
var RotateRecognizer = class extends AttrRecognizer {
  constructor(options = {}) {
    super({
      enable: true,
      event: "rotate",
      threshold: 0,
      pointers: 2,
      ...options
    });
  }
  getTouchAction() {
    return [TOUCH_ACTION_NONE];
  }
  getEventNames() {
    return EVENT_NAMES4.map((suffix) => this.options.event + suffix);
  }
  attrTest(input) {
    return super.attrTest(input) && (Math.abs(input.rotation) > this.options.threshold || Boolean(this.state & RecognizerState.Began));
  }
};

// dist/hammerjs/recognizers/press.js
var EVENT_NAMES5 = ["", "up"];
var PressRecognizer = class extends Recognizer {
  constructor(options = {}) {
    super({
      enable: true,
      event: "press",
      pointers: 1,
      time: 251,
      threshold: 9,
      ...options
    });
    this._timer = null;
    this._input = null;
  }
  getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  }
  getEventNames() {
    return EVENT_NAMES5.map((suffix) => this.options.event + suffix);
  }
  process(input) {
    const { options } = this;
    const validPointers = input.pointers.length === options.pointers;
    const validMovement = input.distance < options.threshold;
    const validTime = input.deltaTime > options.time;
    this._input = input;
    if (!validMovement || !validPointers || input.eventType & (InputEvent.End | InputEvent.Cancel) && !validTime) {
      this.reset();
    } else if (input.eventType & InputEvent.Start) {
      this.reset();
      this._timer = setTimeout(() => {
        this.state = RecognizerState.Recognized;
        this.tryEmit();
      }, options.time);
    } else if (input.eventType & InputEvent.End) {
      return RecognizerState.Recognized;
    }
    return RecognizerState.Failed;
  }
  reset() {
    clearTimeout(this._timer);
  }
  emit(input) {
    if (this.state !== RecognizerState.Recognized) {
      return;
    }
    if (input && input.eventType & InputEvent.End) {
      this.manager.emit(`${this.options.event}up`, input);
    } else {
      this._input.timeStamp = Date.now();
      this.manager.emit(this.options.event, this._input);
    }
  }
};

// dist/inputs/input.js
var Input2 = class {
  constructor(element, callback, options) {
    this.element = element;
    this.callback = callback;
    this.options = options;
  }
};

// dist/utils/globals.js
var userAgent = typeof navigator !== "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "";
var window_ = typeof window !== "undefined" ? window : global;

// dist/inputs/wheel-input.js
var firefox = userAgent.indexOf("firefox") !== -1;
var WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
var WHEEL_DELTA_PER_LINE = 40;
var SHIFT_MULTIPLIER = 0.25;
var WheelInput = class extends Input2 {
  constructor(element, callback, options) {
    super(element, callback, { enable: true, ...options });
    this.handleEvent = (event) => {
      if (!this.options.enable) {
        return;
      }
      let value = event.deltaY;
      if (globalThis.WheelEvent) {
        if (firefox && event.deltaMode === globalThis.WheelEvent.DOM_DELTA_PIXEL) {
          value /= globalThis.devicePixelRatio;
        }
        if (event.deltaMode === globalThis.WheelEvent.DOM_DELTA_LINE) {
          value *= WHEEL_DELTA_PER_LINE;
        }
      }
      if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
        value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
      }
      if (event.shiftKey && value) {
        value = value * SHIFT_MULTIPLIER;
      }
      this.callback({
        type: "wheel",
        center: {
          x: event.clientX,
          y: event.clientY
        },
        delta: -value,
        srcEvent: event,
        pointerType: "mouse",
        target: event.target
      });
    };
    element.addEventListener("wheel", this.handleEvent, { passive: false });
  }
  destroy() {
    this.element.removeEventListener("wheel", this.handleEvent);
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === "wheel") {
      this.options.enable = enabled;
    }
  }
};

// dist/inputs/move-input.js
var MOUSE_EVENTS = [
  "mousedown",
  "mousemove",
  "mouseup",
  "mouseover",
  "mouseout",
  "mouseleave"
];
var MoveInput = class extends Input2 {
  constructor(element, callback, options) {
    super(element, callback, { enable: true, ...options });
    this.handleEvent = (event) => {
      this.handleOverEvent(event);
      this.handleOutEvent(event);
      this.handleEnterEvent(event);
      this.handleLeaveEvent(event);
      this.handleMoveEvent(event);
    };
    this.pressed = false;
    const { enable } = this.options;
    this.enableMoveEvent = enable;
    this.enableLeaveEvent = enable;
    this.enableEnterEvent = enable;
    this.enableOutEvent = enable;
    this.enableOverEvent = enable;
    MOUSE_EVENTS.forEach((event) => element.addEventListener(event, this.handleEvent));
  }
  destroy() {
    MOUSE_EVENTS.forEach((event) => this.element.removeEventListener(event, this.handleEvent));
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    switch (eventType) {
      case "pointermove":
        this.enableMoveEvent = enabled;
        break;
      case "pointerover":
        this.enableOverEvent = enabled;
        break;
      case "pointerout":
        this.enableOutEvent = enabled;
        break;
      case "pointerenter":
        this.enableEnterEvent = enabled;
        break;
      case "pointerleave":
        this.enableLeaveEvent = enabled;
        break;
      default:
    }
  }
  handleOverEvent(event) {
    if (this.enableOverEvent && event.type === "mouseover") {
      this._emit("pointerover", event);
    }
  }
  handleOutEvent(event) {
    if (this.enableOutEvent && event.type === "mouseout") {
      this._emit("pointerout", event);
    }
  }
  handleEnterEvent(event) {
    if (this.enableEnterEvent && event.type === "mouseenter") {
      this._emit("pointerenter", event);
    }
  }
  handleLeaveEvent(event) {
    if (this.enableLeaveEvent && event.type === "mouseleave") {
      this._emit("pointerleave", event);
    }
  }
  handleMoveEvent(event) {
    if (this.enableMoveEvent) {
      switch (event.type) {
        case "mousedown":
          if (event.button >= 0) {
            this.pressed = true;
          }
          break;
        case "mousemove":
          if (event.buttons === 0) {
            this.pressed = false;
          }
          if (!this.pressed) {
            this._emit("pointermove", event);
          }
          break;
        case "mouseup":
          this.pressed = false;
          break;
        default:
      }
    }
  }
  _emit(type, event) {
    this.callback({
      type,
      center: {
        x: event.clientX,
        y: event.clientY
      },
      srcEvent: event,
      pointerType: "mouse",
      target: event.target
    });
  }
};

// dist/inputs/key-input.js
var KEY_EVENTS = ["keydown", "keyup"];
var KeyInput = class extends Input2 {
  constructor(element, callback, options) {
    super(element, callback, { enable: true, tabIndex: 0, ...options });
    this.handleEvent = (event) => {
      const targetElement = event.target || event.srcElement;
      if (targetElement.tagName === "INPUT" && targetElement.type === "text" || targetElement.tagName === "TEXTAREA") {
        return;
      }
      if (this.enableDownEvent && event.type === "keydown") {
        this.callback({
          type: "keydown",
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
      if (this.enableUpEvent && event.type === "keyup") {
        this.callback({
          type: "keyup",
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
    };
    this.enableDownEvent = this.options.enable;
    this.enableUpEvent = this.options.enable;
    element.tabIndex = this.options.tabIndex;
    element.style.outline = "none";
    KEY_EVENTS.forEach((event) => element.addEventListener(event, this.handleEvent));
  }
  destroy() {
    KEY_EVENTS.forEach((event) => this.element.removeEventListener(event, this.handleEvent));
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === "keydown") {
      this.enableDownEvent = enabled;
    }
    if (eventType === "keyup") {
      this.enableUpEvent = enabled;
    }
  }
};

// dist/inputs/contextmenu-input.js
var ContextmenuInput = class extends Input2 {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      if (!this.options.enable) {
        return;
      }
      this.callback({
        type: "contextmenu",
        center: {
          x: event.clientX,
          y: event.clientY
        },
        srcEvent: event,
        pointerType: "mouse",
        target: event.target
      });
    };
    element.addEventListener("contextmenu", this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener("contextmenu", this.handleEvent);
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === "contextmenu") {
      this.options.enable = enabled;
    }
  }
};

// dist/utils/event-utils.js
var DOWN_EVENT = 1;
var MOVE_EVENT = 2;
var UP_EVENT = 4;
var MOUSE_EVENTS2 = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
};
var MOUSE_EVENT_BUTTON_LEFT = 0;
var MOUSE_EVENT_BUTTON_MIDDLE = 1;
var MOUSE_EVENT_BUTTON_RIGHT = 2;
var MOUSE_EVENT_BUTTONS_LEFT_MASK = 1;
var MOUSE_EVENT_BUTTONS_RIGHT_MASK = 2;
var MOUSE_EVENT_BUTTONS_MIDDLE_MASK = 4;
function whichButtons(event) {
  const eventType = MOUSE_EVENTS2[event.srcEvent.type];
  if (!eventType) {
    return null;
  }
  const { buttons, button } = event.srcEvent;
  let leftButton = false;
  let middleButton = false;
  let rightButton = false;
  if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_LEFT_MASK);
    middleButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_MIDDLE_MASK);
    rightButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_RIGHT_MASK);
  } else {
    leftButton = button === MOUSE_EVENT_BUTTON_LEFT;
    middleButton = button === MOUSE_EVENT_BUTTON_MIDDLE;
    rightButton = button === MOUSE_EVENT_BUTTON_RIGHT;
  }
  return { leftButton, middleButton, rightButton };
}
function getOffsetPosition(event, rootElement) {
  const center = event.center;
  if (!center) {
    return null;
  }
  const rect = rootElement.getBoundingClientRect();
  const scaleX = rect.width / rootElement.offsetWidth || 1;
  const scaleY = rect.height / rootElement.offsetHeight || 1;
  const offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };
  return { center, offsetCenter };
}

// dist/utils/event-registrar.js
var DEFAULT_OPTIONS = {
  srcElement: "root",
  priority: 0
};
var EventRegistrar = class {
  constructor(eventManager, recognizerName) {
    this.handleEvent = (event) => {
      if (this.isEmpty()) {
        return;
      }
      const mjolnirEvent = this._normalizeEvent(event);
      let target = event.srcEvent.target;
      while (target && target !== mjolnirEvent.rootElement) {
        this._emit(mjolnirEvent, target);
        if (mjolnirEvent.handled) {
          return;
        }
        target = target.parentNode;
      }
      this._emit(mjolnirEvent, "root");
    };
    this.eventManager = eventManager;
    this.recognizerName = recognizerName;
    this.handlers = [];
    this.handlersByElement = /* @__PURE__ */ new Map();
    this._active = false;
  }
  // Returns true if there are no non-passive handlers
  isEmpty() {
    return !this._active;
  }
  add(type, handler, options, once = false, passive = false) {
    const { handlers, handlersByElement } = this;
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let entries = handlersByElement.get(opts.srcElement);
    if (!entries) {
      entries = [];
      handlersByElement.set(opts.srcElement, entries);
    }
    const entry = {
      type,
      handler,
      srcElement: opts.srcElement,
      priority: opts.priority
    };
    if (once) {
      entry.once = true;
    }
    if (passive) {
      entry.passive = true;
    }
    handlers.push(entry);
    this._active = this._active || !entry.passive;
    let insertPosition = entries.length - 1;
    while (insertPosition >= 0) {
      if (entries[insertPosition].priority >= entry.priority) {
        break;
      }
      insertPosition--;
    }
    entries.splice(insertPosition + 1, 0, entry);
  }
  remove(type, handler) {
    const { handlers, handlersByElement } = this;
    for (let i = handlers.length - 1; i >= 0; i--) {
      const entry = handlers[i];
      if (entry.type === type && entry.handler === handler) {
        handlers.splice(i, 1);
        const entries = handlersByElement.get(entry.srcElement);
        entries.splice(entries.indexOf(entry), 1);
        if (entries.length === 0) {
          handlersByElement.delete(entry.srcElement);
        }
      }
    }
    this._active = handlers.some((entry) => !entry.passive);
  }
  /**
   * Invoke handlers on a particular element
   */
  _emit(event, srcElement) {
    const entries = this.handlersByElement.get(srcElement);
    if (entries) {
      let immediatePropagationStopped = false;
      const stopPropagation = () => {
        event.handled = true;
      };
      const stopImmediatePropagation = () => {
        event.handled = true;
        immediatePropagationStopped = true;
      };
      const entriesToRemove = [];
      for (let i = 0; i < entries.length; i++) {
        const { type, handler, once } = entries[i];
        handler({
          ...event,
          type,
          stopPropagation,
          stopImmediatePropagation
        });
        if (once) {
          entriesToRemove.push(entries[i]);
        }
        if (immediatePropagationStopped) {
          break;
        }
      }
      for (let i = 0; i < entriesToRemove.length; i++) {
        const { type, handler } = entriesToRemove[i];
        this.remove(type, handler);
      }
    }
  }
  /**
   * Normalizes hammerjs and custom events to have predictable fields.
   */
  _normalizeEvent(event) {
    const rootElement = this.eventManager.getElement();
    return {
      ...event,
      ...whichButtons(event),
      ...getOffsetPosition(event, rootElement),
      preventDefault: () => {
        event.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: false,
      rootElement
    };
  }
};

// dist/event-manager.js
function normalizeRecognizer(item) {
  if ("recognizer" in item) {
    return item;
  }
  let recognizer;
  const itemArray = Array.isArray(item) ? [...item] : [item];
  if (typeof itemArray[0] === "function") {
    const RecognizerType = itemArray.shift();
    const options = itemArray.shift() || {};
    recognizer = new RecognizerType(options);
  } else {
    recognizer = itemArray.shift();
  }
  return {
    recognizer,
    recognizeWith: typeof itemArray[0] === "string" ? [itemArray[0]] : itemArray[0],
    requireFailure: typeof itemArray[1] === "string" ? [itemArray[1]] : itemArray[1]
  };
}
var EventManager = class {
  constructor(element = null, options = {}) {
    this._onBasicInput = (event) => {
      this.manager.emit(event.srcEvent.type, event);
    };
    this._onOtherEvent = (event) => {
      this.manager.emit(event.type, event);
    };
    this.options = {
      recognizers: [],
      events: {},
      touchAction: "compute",
      tabIndex: 0,
      cssProps: {},
      ...options
    };
    this.events = /* @__PURE__ */ new Map();
    this.element = element;
    if (!element)
      return;
    this.manager = new Manager(element, this.options);
    for (const item of this.options.recognizers) {
      const { recognizer, recognizeWith, requireFailure } = normalizeRecognizer(item);
      this.manager.add(recognizer);
      if (recognizeWith) {
        recognizer.recognizeWith(recognizeWith);
      }
      if (requireFailure) {
        recognizer.requireFailure(requireFailure);
      }
    }
    this.manager.on("hammer.input", this._onBasicInput);
    this.wheelInput = new WheelInput(element, this._onOtherEvent, {
      enable: false
    });
    this.moveInput = new MoveInput(element, this._onOtherEvent, {
      enable: false
    });
    this.keyInput = new KeyInput(element, this._onOtherEvent, {
      enable: false,
      tabIndex: options.tabIndex
    });
    this.contextmenuInput = new ContextmenuInput(element, this._onOtherEvent, {
      enable: false
    });
    this.on(this.options.events);
  }
  getElement() {
    return this.element;
  }
  // Tear down internal event management implementations.
  destroy() {
    if (!this.element)
      return;
    this.wheelInput.destroy();
    this.moveInput.destroy();
    this.keyInput.destroy();
    this.contextmenuInput.destroy();
    this.manager.destroy();
  }
  /** Register an event handler function to be called on `event` */
  on(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false);
  }
  once(event, handler, opts) {
    this._addEventHandler(event, handler, opts, true);
  }
  watch(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false, true);
  }
  off(event, handler) {
    this._removeEventHandler(event, handler);
  }
  /*
   * Enable/disable recognizer for the given event
   */
  _toggleRecognizer(name, enabled) {
    var _a, _b, _c, _d;
    const { manager } = this;
    if (!manager) {
      return;
    }
    const recognizer = manager.get(name);
    if (recognizer) {
      recognizer.set({ enable: enabled });
      manager.touchAction.update();
    }
    (_a = this.wheelInput) == null ? void 0 : _a.enableEventType(name, enabled);
    (_b = this.moveInput) == null ? void 0 : _b.enableEventType(name, enabled);
    (_c = this.keyInput) == null ? void 0 : _c.enableEventType(name, enabled);
    (_d = this.contextmenuInput) == null ? void 0 : _d.enableEventType(name, enabled);
  }
  /**
   * Process the event registration for a single event + handler.
   */
  _addEventHandler(event, handler, opts, once, passive) {
    if (typeof event !== "string") {
      opts = handler;
      for (const [eventName, eventHandler] of Object.entries(event)) {
        this._addEventHandler(eventName, eventHandler, opts, once, passive);
      }
      return;
    }
    const { manager, events } = this;
    if (!manager)
      return;
    let eventRegistrar = events.get(event);
    if (!eventRegistrar) {
      const recognizerName = this._getRecognizerName(event) || event;
      eventRegistrar = new EventRegistrar(this, recognizerName);
      events.set(event, eventRegistrar);
      if (manager) {
        manager.on(event, eventRegistrar.handleEvent);
      }
    }
    eventRegistrar.add(event, handler, opts, once, passive);
    if (!eventRegistrar.isEmpty()) {
      this._toggleRecognizer(eventRegistrar.recognizerName, true);
    }
  }
  /**
   * Process the event deregistration for a single event + handler.
   */
  _removeEventHandler(event, handler) {
    if (typeof event !== "string") {
      for (const [eventName, eventHandler] of Object.entries(event)) {
        this._removeEventHandler(eventName, eventHandler);
      }
      return;
    }
    const { events } = this;
    const eventRegistrar = events.get(event);
    if (!eventRegistrar) {
      return;
    }
    eventRegistrar.remove(event, handler);
    if (eventRegistrar.isEmpty()) {
      const { recognizerName } = eventRegistrar;
      let isRecognizerUsed = false;
      for (const eh of events.values()) {
        if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
          isRecognizerUsed = true;
          break;
        }
      }
      if (!isRecognizerUsed) {
        this._toggleRecognizer(recognizerName, false);
      }
    }
  }
  _getRecognizerName(event) {
    var _a;
    return (_a = this.manager.recognizers.find((recognizer) => {
      return recognizer.getEventNames().includes(event);
    })) == null ? void 0 : _a.options.event;
  }
};
//# sourceMappingURL=index.cjs.map
