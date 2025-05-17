from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from api.query.search import get_checkins_in_area, get_nearest_locations, get_user_trajectory, \
    get_checkins_country, get_friend_trajectory, get_user_ids, get_user_valid_dates

app = FastAPI()


# Add CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/checkins-in-area")
def checkins_in_area(start_date: str, end_date: str, min_lon: float, min_lat: float, max_lon: float, max_lat: float):
    return get_checkins_in_area(start_date, end_date, min_lon, min_lat, max_lon, max_lat)


@app.get("/api/nearest-location")
def nearest_checkins(lat: float, lon: float, limit: int = 10):
    return get_nearest_locations(lat, lon, limit)


@app.get("/api/trajectory")
def trajectory(user_id: int, date: str):
    return get_user_trajectory(user_id, date)


@app.get("/api/checkins-country")
def checkins_country(country: str):
    return get_checkins_country(country)


@app.get("/api/friend-trajectory")
def friend_trajectories(user_id: int, date: str):
    return get_friend_trajectory(user_id, date)


@app.get("/api/search-user-ids")
def search_user_ids(prefix: str):
    return get_user_ids(prefix)


@app.get("/api/user-dates")
def user_dates(user_id: int):
    return get_user_valid_dates(user_id)
