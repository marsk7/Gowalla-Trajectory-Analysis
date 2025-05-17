import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const fetchCheckinsInArea = async (start, end, minLon, minLat, maxLon, maxLat) =>
  await axios.get(`${BASE_URL}/api/checkins-in-area`, {
    params: {
      start_date: start,
      end_date: end,
      min_lon: minLon,
      min_lat: minLat,
      max_lon: maxLon,
      max_lat: maxLat,
    },
  });

export const fetchNearestLocation = async (lat, lon, limit) =>
  await axios.get(`${BASE_URL}/api/nearest-location`, {
    params: { lat: lat, lon: lon, limit: limit },
  });

export const fetchTrajectory = async (user_id, date) =>
  await axios.get(`${BASE_URL}/api/trajectory`, {
    params: { user_id: user_id, date: date },
  });

export const fetchCountry = async (country) =>
  await axios.get(`${BASE_URL}/api/checkins-country`, {
    params: { country: country }
  });

export const fetchFriendTrajectory = async (user_id, date) =>
  await axios.get(`${BASE_URL}/api/friend-trajectory`, {
    params: { user_id: user_id, date: date }
  });

// export const fetchUserid = async (prefix) =>
//   await axios.get(`${BASE_URL}/api/search-user-ids`, {
//     params: { prefix: prefix }
//   });