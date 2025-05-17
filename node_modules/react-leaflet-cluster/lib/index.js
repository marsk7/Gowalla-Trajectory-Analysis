"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@react-leaflet/core");
var leaflet_1 = __importDefault(require("leaflet"));
require("leaflet.markercluster");
require("./assets/MarkerCluster.css");
require("./assets/MarkerCluster.Default.css");
delete leaflet_1.default.Icon.Default.prototype._getIconUrl;
leaflet_1.default.Icon.Default.mergeOptions({
    iconRetinaUrl: require('./assets/marker-icon-2x.png').default,
    iconUrl: require('./assets/marker-icon.png').default,
    shadowUrl: require('./assets/marker-shadow.png').default,
});
function getPropsAndEvents(props) {
    var clusterProps = {};
    var clusterEvents = {};
    var children = props.children, rest = __rest(props
    // Splitting props and events to different objects
    , ["children"]);
    // Splitting props and events to different objects
    Object.entries(rest).forEach(function (_a) {
        var _b, _c;
        var propName = _a[0], prop = _a[1];
        if (propName.startsWith('on')) {
            clusterEvents = __assign(__assign({}, clusterEvents), (_b = {}, _b[propName] = prop, _b));
        }
        else {
            clusterProps = __assign(__assign({}, clusterProps), (_c = {}, _c[propName] = prop, _c));
        }
    });
    return { clusterProps: clusterProps, clusterEvents: clusterEvents };
}
function createMarkerClusterGroup(props, context) {
    var _a = getPropsAndEvents(props), clusterProps = _a.clusterProps, clusterEvents = _a.clusterEvents;
    var markerClusterGroup = new leaflet_1.default.MarkerClusterGroup(clusterProps);
    Object.entries(clusterEvents).forEach(function (_a) {
        var eventAsProp = _a[0], callback = _a[1];
        var clusterEvent = "cluster".concat(eventAsProp.substring(2).toLowerCase());
        markerClusterGroup.on(clusterEvent, callback);
    });
    return (0, core_1.createElementObject)(markerClusterGroup, (0, core_1.extendContext)(context, { layerContainer: markerClusterGroup }));
}
var updateMarkerCluster = function (instance, props, prevProps) {
    //TODO when prop change update instance
    //   if (props. !== prevProps.center || props.size !== prevProps.size) {
    //   instance.setBounds(getBounds(props))
    // }
};
var MarkerClusterGroup = (0, core_1.createPathComponent)(createMarkerClusterGroup, updateMarkerCluster);
exports.default = MarkerClusterGroup;
