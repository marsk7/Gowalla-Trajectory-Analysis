import React from "react";

export default function ButtonPanel({ onArea, onNearest, onTrajectory, onCountry, onFriendMatch }) {
    return (
        <div style={{ marginBottom: "10px" }}>
            <button onClick={onArea}>Area Search</button>
            <button onClick={onNearest}>Nearby Search</button>
            <button onClick={onTrajectory}>User Trajectory</button>
            <button onClick={onCountry}>Country Check-ins</button>
            <button onClick={onFriendMatch}>Friend Trajectory</button>
        </div>
  );
}
