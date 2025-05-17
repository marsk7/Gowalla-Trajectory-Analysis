import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function SearchPanel({
  queryType,
  formState,
  setFormState,
  onSearch,
  onCancel,
}) {

  const [suggestions, setSuggestions] = useState([]);
  const [validDates, setValidDates] = useState([]);

  useEffect(() => {
      if (formState.userId && /^\d+$/.test(formState.userId)) {
        axios
          .get("http://localhost:8000/api/user-dates", { params: { user_id: formState.userId } })
          .then((res) => {
            console.log("Fetched valid dates:", res.data);
            setValidDates(res.data);
          })
          .catch(() => setValidDates([]));
      }
    }, [formState.userId]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormState({ ...formState, [field]: e.target.value });
    if (value.length >= 1) {
        axios
          .get('http://localhost:8000/api/search-user-ids', {
            params: { prefix: value }
          })
          .then((res) => setSuggestions(res.data))
          .catch(() => setSuggestions([]));
        } else {
        setSuggestions([]);
    }

  };





  const renderFields = () => {
    switch (queryType) {
      case "area":
        return (
          <>
            <LabelInput label="Start Date" value={formState.startDate} onChange={handleChange("startDate")} />
            <LabelInput label="End Date" value={formState.endDate} onChange={handleChange("endDate")} />
            <LabelInput label="Min Latitude" value={formState.minLat} onChange={handleChange("minLat")} />
            <LabelInput label="Max Latitude" value={formState.maxLat} onChange={handleChange("maxLat")} />
            <LabelInput label="Min Longitude" value={formState.minLon} onChange={handleChange("minLon")} />
            <LabelInput label="Max Longitude" value={formState.maxLon} onChange={handleChange("maxLon")} />
          </>
        );

      case "nearby":
        return (
          <>
            <LabelInput label="Latitude" value={formState.lat} onChange={handleChange("lat")} />
            <LabelInput label="Longitude" value={formState.lon} onChange={handleChange("lon")} />
            <LabelInput label="Limit" value={formState.limit} onChange={handleChange("limit")} />
          </>
        );

      case "trajectory":
        return (
          <>
            <LabelInput label="User ID" value={formState.userId} onChange={handleChange("userId")} suggestions={suggestions} datalistId="user-id-suggestions" />
            <LabelInput label="Date (YYYY-MM-DD)" value={formState.date} onChange={handleChange("date")} suggestions={validDates} datalistId="date-suggestions" />
          </>
        );

      case "country":
        const countryOptions = [
            "Afghanistan", "Albania", "Angola", "Antarctica", "Argentina", "Armenia", "Australia",
            "Austria", "Azerbaijan", "Bahamas", "Bangladesh", "Belarus", "Belgium", "Belize", "Bhutan",
            "Bolivia", "Bosnia and Herz.", "Brazil", "Brunei", "Bulgaria", "Cambodia", "Canada", "Chile",
            "China", "Colombia", "Congo", "Costa Rica", "Croatia", "Cyprus", "Czechia", "Dem. Rep. Congo",
            "Denmark", "Dominican Rep.", "Ecuador", "Egypt", "El Salvador", "Estonia", "eSwatini", "Ethiopia",
            "Fiji", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Guatemala",
            "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
            "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait",
            "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Libya", "Lithuania", "Luxembourg",
            "Madagascar", "Malawi", "Malaysia", "Mali", "Mexico", "Moldova", "Mongolia", "Montenegro",
            "Morocco", "Mozambique", "Myanmar", "N. Cyprus", "Namibia", "Nepal", "Netherlands", "New Zealand",
            "Nicaragua", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine",
            "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico",
            "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Slovakia", "Slovenia",
            "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
            "Taiwan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Uganda",
            "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay",
            "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia"
        ];
          return (
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>
                Country:
              </label>
              <select
                value={formState.country}
                onChange={handleChange("country")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5"
                }}
              >
                {countryOptions.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))}
              </select>
            </div>
          );

      case "friend-match":
        return (
          <>
            <LabelInput label="User ID" value={formState.userId} onChange={handleChange("userId")} suggestions={suggestions} datalistId="user-id-suggestions" />
            <LabelInput label="Date (YYYY-MM-DD)" value={formState.date} onChange={handleChange("date")} suggestions={validDates} datalistId="date-suggestions" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={panelStyle}>
    <div style={{
                backgroundColor: "#19adff",
                margin: "-26px -26px 21px -26px",
                padding: "20px",
                borderRadius: "20px 20px 0 0",
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(125, 204, 255, 100)"
            }}>
      <h3 style={{ margin: 0 }}>🧭 {queryType.toUpperCase()} Query</h3>
    </div>
      {renderFields()}
      <button style={buttonStyle} onClick={onSearch}>🔍 Search</button>
      <button style={cancelButtonStyle} onClick={onCancel}>❌ Cancel</button>
    </div>
  );
}


function LabelInput({ label, value, onChange, suggestions = [], datalistId }) {
  const showSuggestions = datalistId && suggestions.length > 0;

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        list={showSuggestions ? datalistId : undefined}
        style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            boxSizing: "border-box"
        }}
        onFocus={(e) => e.target.style.borderColor = "#FF6B6B"}
        onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
      />
        {showSuggestions && (
            <datalist id={datalistId}>
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
        )}
    </div>
  );
}

const panelStyle = {
    position: "absolute",
    left: "20px",
    top: "120px",
    zIndex: 1000,
    width: "320px",
    padding: "25px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    border: "1px solid rgba(255, 255, 255, 0.18)"
};

const buttonStyle = {
    padding: "10px",
    width: "100%",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
};

const cancelButtonStyle = {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
};

