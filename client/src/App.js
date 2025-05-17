import './App.css';
import React, { useState } from "react";
import MapComponent from './MapComponent';
import ButtonPanel from "./ButtonPanel";
import SearchPanel from "./SearchPanel";
import {
    fetchCheckinsInArea,
    fetchNearestLocation,
    fetchTrajectory,
    fetchCountry,
    fetchFriendTrajectory,

} from "./api";


function App() {
  const [queryType, setQueryType] = useState(""); // Current query type
  const [formState, setFormState] = useState({
    userId: "1201",
    date: "2010-09-19",
    startDate: "2010-07-01",
    endDate: "2010-07-31",
    minLat: "53.36",
    maxLat: "53.37",
    minLon: "-2.28",
    maxLon: "-2.26",
    lat: "53.36",
    lon: "-2.27",
    limit: "5",
    country: "New Zealand",
  });

  const [checkins, setCheckins] = useState([]);
  const [trajectory, setTrajectory] = useState([]);
  const [friendTrajectory, setFriendTrajectory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleQueryWithPopup = (type) => {
    setQueryType(type);
    setTrajectory([]);
    setCheckins([]);
    setShowPopup(true);

  };

  const handleSubmit = async () => {
    let res;
    try {
      if (queryType === "area") {
          const {
            startDate, endDate, minLon, minLat, maxLon, maxLat
          } = formState;
          res = await fetchCheckinsInArea(startDate, endDate, minLon, minLat, maxLon, maxLat);
          setCheckins(res.data);
          setTrajectory([]);
      } else if (queryType === "nearby") {
          const { lat, lon, limit } = formState;
          res = await fetchNearestLocation(lat, lon, limit);
          setCheckins(res.data);
          setTrajectory([]);
      } else if (queryType === "trajectory") {
          const { userId, date } = formState;
          res = await fetchTrajectory(userId, date);
          setTrajectory(
              res.data.map((item) => {
                const [lon, lat] = JSON.parse(item.geom).coordinates;
                return [lat, lon];
              })
        );
        setCheckins([]);
      } else if (queryType === "country") {
          const { country } = formState;
          res = await fetchCountry(country);
          setCheckins(res.data);
          setTrajectory([]);
      } else if (queryType === "friend-match") {
          const { userId, date } = formState;
          res = await fetchFriendTrajectory(userId, date);

          setFriendTrajectory(res.data);
          setTrajectory([]);
          setCheckins([]);
      }
    } catch (err) {
        const status = err.response?.status;
        const detail = err.response?.data?.detail || "Search Failed";

        switch (status) {
        case 404:
          alert("❌ User ID not exist，please enter again!");
          break;
        case 400:
          alert("⚠️ Date not in valid range (2009-02 to 2010-10)");
          break;
        case 204:
          alert("⚠️ User did not have checkin record in this date!");
          break;
        default:
          alert(`Search Failed：${detail}`);
        }
        // alert("Search failed, please check value or backend service");
    }
    setShowPopup(false);
  };

  return (
    <div>
      <h1>Gowalla Search</h1>
      <ButtonPanel
        onArea={() => handleQueryWithPopup("area")}
        onNearest={() => handleQueryWithPopup("nearby")}
        onTrajectory={() => handleQueryWithPopup("trajectory")}
        onCountry={() => handleQueryWithPopup("country")}
        onFriendMatch={() => handleQueryWithPopup("friend-match")}
      />

      <MapComponent checkins={checkins} trajectory={trajectory} friendTrajectory={friendTrajectory} />


      {queryType && (
        <SearchPanel
          queryType={queryType}
          formState={formState}
          setFormState={setFormState}
          onSearch={handleSubmit}
          onCancel={() => setQueryType("")}
        />
      )}
    </div>
  );
}


export default App;
