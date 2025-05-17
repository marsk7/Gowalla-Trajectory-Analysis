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
  getSunDirection: () => getSunDirection,
  getSunPosition: () => getSunPosition
});
module.exports = __toCommonJS(dist_exports);

// dist/suncalc.js
var DEGREES_TO_RADIANS = Math.PI / 180;
var DAY_IN_MS = 1e3 * 60 * 60 * 24;
var JD1970 = 2440588;
var JD2000 = 2451545;
var e = DEGREES_TO_RADIANS * 23.4397;
var M0 = 357.5291;
var M1 = 0.98560028;
var THETA0 = 280.147;
var THETA1 = 360.9856235;
function getSunPosition(timestamp, latitude, longitude) {
  const longitudeWestInRadians = DEGREES_TO_RADIANS * -longitude;
  const phi = DEGREES_TO_RADIANS * latitude;
  const d = toDays(timestamp);
  const c = getSunCoords(d);
  const H = getSiderealTime(d, longitudeWestInRadians) - c.rightAscension;
  return {
    azimuth: getAzimuth(H, phi, c.declination),
    altitude: getAltitude(H, phi, c.declination)
  };
}
function getSunDirection(timestamp, latitude, longitude) {
  const { azimuth, altitude } = getSunPosition(timestamp, latitude, longitude);
  return [
    Math.sin(azimuth) * Math.cos(altitude),
    Math.cos(azimuth) * Math.cos(altitude),
    -Math.sin(altitude)
  ];
}
function toJulianDay(timestamp) {
  const ts = typeof timestamp === "number" ? timestamp : timestamp.getTime();
  return ts / DAY_IN_MS - 0.5 + JD1970;
}
function toDays(timestamp) {
  return toJulianDay(timestamp) - JD2000;
}
function getRightAscension(eclipticLongitude, b) {
  const lambda = eclipticLongitude;
  return Math.atan2(Math.sin(lambda) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(lambda));
}
function getDeclination(eclipticLongitude, b) {
  const lambda = eclipticLongitude;
  return Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(lambda));
}
function getAzimuth(hourAngle, latitudeInRadians, declination) {
  const H = hourAngle;
  const phi = latitudeInRadians;
  const delta = declination;
  return Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(delta) * Math.cos(phi));
}
function getAltitude(hourAngle, latitudeInRadians, declination) {
  const H = hourAngle;
  const phi = latitudeInRadians;
  const delta = declination;
  return Math.asin(Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(H));
}
function getSiderealTime(dates, longitudeWestInRadians) {
  return DEGREES_TO_RADIANS * (THETA0 + THETA1 * dates) - longitudeWestInRadians;
}
function getSolarMeanAnomaly(days) {
  return DEGREES_TO_RADIANS * (M0 + M1 * days);
}
function getEclipticLongitude(meanAnomaly) {
  const M = meanAnomaly;
  const C = DEGREES_TO_RADIANS * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 3e-4 * Math.sin(3 * M));
  const P = DEGREES_TO_RADIANS * 102.9372;
  return M + C + P + Math.PI;
}
function getSunCoords(dates) {
  const M = getSolarMeanAnomaly(dates);
  const L = getEclipticLongitude(M);
  return {
    declination: getDeclination(L, 0),
    rightAscension: getRightAscension(L, 0)
  };
}
//# sourceMappingURL=index.cjs.map
