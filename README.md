# 🗺️ Gowalla Trajectory Analysis Web App

A full-stack geospatial web application for analyzing user mobility patterns based on the Gowalla check-in dataset. Built with React, Leaflet, FastAPI, and PostGIS, it supports time-space filtering, nearest location queries, trajectory comparison, and friend similarity analysis.

<img width="800" alt="UI" src="https://github.com/user-attachments/assets/7c0035ef-84cc-49c7-bd75-d58dfd79b207" />

---

## ✨ Features

- 📍 Time & location-based check-in search
- 📏 Nearest location search using spatial index
- 🧭 Individual user trajectory visualization
- 🤝 Friend trajectory similarity matching via Frechet distance
- 🔎 Auto-complete for user ID & valid check-in dates
- 🗺️ Interactive Leaflet map with real-time zoom to results

---

## 🛠️ Tech Stack

### Frontend
- React
- React-Leaflet
- Axios for API calls
- HTML5 datalist for input suggestions

### Backend
- FastAPI
- psycopg2

### Database
- PostgreSQL with PostGIS

## 📦 Package and Dependency

### 🔙 Backend (Python + PostgreSQL)

| Package         | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `psycopg2`      | PostgreSQL adapter for Python. Used to connect and execute queries on PostGIS. |
| `python-dotenv` | Loads environment variables from a `.env` file for secure configuration.     |
| `FastAPI`       | Modern, high-performance web framework for building APIs with automatic docs support. |

### 🌐 Frontend (React + JavaScript)

| Package          | Description                                                                  |
|------------------|------------------------------------------------------------------------------|
| `react`          | Core library for building the user interface.                                |
| `axios`          | Promise-based HTTP client for sending API requests from the frontend.         |
| `leaflet`        | JavaScript library for interactive map rendering.                            |
| `react-leaflet`  | React bindings for Leaflet to integrate maps into React components.          |

### 🗃️ Database & Geospatial Tools

| Package      | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `PostGIS`    | PostgreSQL extension for spatial and geographic objects and queries.        |
| `pgAdmin4`   | Web-based interface for managing PostgreSQL/PostGIS databases.              |

---

# 🚀 Installation Guide

## 1. Dataset

### 🧳 Gowalla Check-in Dataset
- Source: [https://www.kaggle.com/datasets/marquis03/gowalla](https://www.kaggle.com/datasets/marquis03/gowalla)
- Files:
  - `loc-gowalla_totalCheckins.txt` (Check-in info)
  - `loc-gowalla_edges.txt` (Friendship links)

### 🌍 Countries Boundary Dataset (Natural Earth)

- Source: [https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)
- File Used: `ne_110m_admin_0_countries.shp`
- Format: ESRI Shapefile (converted to PostGIS polygons)
- Purpose: Used to identify which country each check-in belongs to

**Download dataset to gowalla directory**

## 2. Database Setup
#### Install PostgreSQL and PostGIS

#### 🔸 Create database and enable PostGIS

```sql
CREATE DATABASE gowalla;
\c gowalla
CREATE EXTENSION postgis;
```

#### 🔸 Create checkins table and import cleaned dataset

```sql
-- user table
CREATE TABLE users (
  user_id BIGINT PRIMARY KEY
);

-- location table
CREATE TABLE locations (
  location_id BIGINT PRIMARY KEY,
  geom GEOMETRY(Point, 4326)
);

-- checkin table
CREATE TABLE checkins (
  checkin_id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(user_id),
  location_id BIGINT REFERENCES locations(location_id),
  checkin_time TIMESTAMP
);

-- friend table
CREATE TABLE friendships (
  user_id1 BIGINT,
  user_id2 BIGINT,
  PRIMARY KEY (user_id1, user_id2),
  CHECK (user_id1 < user_id2),
  FOREIGN KEY (user_id1) REFERENCES users(user_id),
  FOREIGN KEY (user_id2) REFERENCES users(user_id)
);
```

**Create temporary table**
```sql
CREATE TABLE tmp_checkins (
  user_id BIGINT,
  checkin_time TIMESTAMP,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  location_id BIGINT
);

COPY tmp_checkins(user_id, checkin_time, latitude, longitude, location_id)
FROM 'path_to/gowalla/Gowalla_cleanCheckins.csv'
DELIMITER ',' CSV HEADER;

CREATE TEMP TABLE tmp_edges (
  u1 BIGINT,
  u2 BIGINT
);

COPY tmp_edges (u1, u2)
FROM 'path_to/gowalla/Gowalla_edges.txt'
DELIMITER '          ';
```

**Insert data**
```sql
INSERT INTO users(user_id)
SELECT DISTINCT user_id FROM tmp_checkins
ON CONFLICT DO NOTHING;

INSERT INTO locations(location_id, geom)
SELECT DISTINCT location_id,
       ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
FROM tmp_checkins
ON CONFLICT DO NOTHING;

INSERT INTO checkins(user_id, location_id, checkin_time)
SELECT user_id, location_id, checkin_time FROM tmp_checkins;

INSERT INTO friendships(user_id1, user_id2)
SELECT DISTINCT 
  LEAST(e.u1, e.u2) AS user_id1,
  GREATEST(e.u1, e.u2) AS user_id2
FROM tmp_edges e
JOIN users u1 ON u1.user_id = LEAST(e.u1, e.u2)
JOIN users u2 ON u2.user_id = GREATEST(e.u1, e.u2)
WHERE e.u1 != e.u2
ON CONFLICT DO NOTHING;

DROP TABLE tmp_checkins;
DROP TABLE friendships;
```

####🔸 Import country boundaries (GeoJSON)
```shell
cd ne_110m_admin_0_countries
shp2pgsql -I -s 4326 ne_110m_admin_0_countries.shp countries | psql -U postgres -d gowalla
```

## 📁 Project Structure

```
gowalla/
├── api/
│ ├── main.py
│ ├── db.py
│ └── query/
│ └── search.py
├── client/
│ └── src/
│ ├── App.js
│ ├── MapComponent.js
│ ├── SearchPanel.js
│ └── api.js
├── ne_110m_admin_0_countries/
│ └── ne_110m_admin_0_countries.shp
├── Gowalla_cleanCheckins.csv
├── Gowalla_edges.txt
└── README.md
```

---

## 3. Backend Setup 
location: api/

```bash
cd api
python -m venv venv
source venv/bin/activate
cd ..
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

#### Configure Environment
Modify `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=postgres  # ur_db_user
DB_PASSWORD=postgres  # ur_db_password
DB_NAME=gowalla
DB_PORT=5432
```

## 4. Frontend Setup
location: client/

Open new terminal:
```bash
cd client
npm install
npm start
# Application will run on http://localhost:3000
```

## 💻 Usage

1. Open the application in your browser at `http://localhost:3000`
2. Select a query button
3. Enter the value or use default
4. Click "Search" to find reaults
5. View results on the interactive map

## 📖 Query implementation

### Area search
Finds a certain date range and a certain location range checkin points

#### SQL Query
```sql
SELECT c.user_id, c.location_id, c.checkin_time, l.geom
FROM checkins c
JOIN locations l ON c.location_id = l.location_id
WHERE c.checkin_time BETWEEN '2010-07-01' AND '2010-07-31'
  AND ST_Within(l.geom, ST_MakeEnvelope(-2.28, 53.36, -2.26, 53.37, 4326));
```

#### Parameters
- `start Date` (date): Search certain date range start date(from 2009-02 to 2010-10)
- `End Date` (date): Search certain date range End date(from 2009-02 to 2010-10)
- `Min Latitude`  (number): Search certain location range min latitude
- `Max Latitude`  (number): Search certain location range min latitude
- `Min Longitude`  (number): Search certain location range min latitude
- `Max Longitude`  (number): Search certain location range min latitude

#### Response Example
```json
[
    {
        "user_id": 4286,
        "location_id": 207763,
        "checkin_time": "2010-07-18T20:28:53",
        "geom": "{\"type\":\"Point\",\"coordinates\":[-2.279294369,53.367964063]}"
    },
]
```


### Nearby search
Finds a certain location k-nearest checkin points

#### SQL Query
```sql
SELECT l.location_id, l.geom, COUNT(*) AS checkin_count
FROM locations l
JOIN checkins c ON l.location_id = c.location_id
GROUP BY l.location_id, l.geom
ORDER BY l.geom <-> ST_SetSRID(ST_Point(-2.27, 53.36), 4326)
LIMIT 100;
```

#### Parameters
- `Latitude`  (number): Search center latitude
- `Longitude`  (number): Search center latitude
- `limit` (number): Maximum number of results

#### Response Example
```json
[
    {
        "location_id": 1603587,
        "latitude": 53.360492,
        "longitude": -2.269766867,
        "geom": "{\"type\":\"Point\",\"coordinates\":[-2.269766867,53.360492]}",
        "checkin_count": 13
    },
]
```


### User trajectory
Finds a user's check in trajectory on a date

#### SQL Query
```sql
SELECT c.user_id, c.checkin_time, l.geom
FROM checkins c
JOIN locations l ON c.location_id = l.location_id
WHERE c.user_id = 1201
  AND c.checkin_time::date = '2010-09-19'
ORDER BY c.checkin_time ASC;
```

#### Parameters
- `User ID`  (number): Search certain user (Once enter a number, dropdown will suggest relevant ids; if not, delete user id and input again)
- `Date`  (date): Search certain date (Once entered user id, date dropdown will suggest available date; if not, delete date and input again)

#### Response Example
```json
[
    {
        "user_id": 1201,
        "checkin_time": "2010-09-19T01:56:14",
        "geom": "{\"type\":\"Point\",\"coordinates\":[-75.170789,39.95104628]}"
    },
]
```


### Country check-ins
Finds a country's all check in points

#### SQL Query
```sql
SELECT c.user_id, c.location_id, c.checkin_time, ST_AsGeoJSON(l.geom)
FROM checkins c
JOIN locations l ON c.location_id = l.location_id
WHERE ST_Within(l.geom, (
	SELECT geom FROM countries WHERE LOWER(name) = LOWER('brazil') LIMIT 1
));
```

#### Parameters
- `Country`  (string): select country on the dropdown box and search certain country
  
#### Response Example
```json
[
    {
        "user_id": 12,
        "location_id": 589700,
        "checkin_time": "2010-05-06T00:25:58",
        "geom": "{\"type\":\"Point\",\"coordinates\":[-49.26710212,-25.43722915]}"
    },
]
```


### Friend trajectory
Finds a user's all friends' trajectory which most similar to user on certain date

#### SQL Query
```sql
WITH friends AS (
  SELECT user_id2 AS friend_id FROM friendships WHERE user_id1 = 1201
  UNION
  SELECT user_id1 AS friend_id FROM friendships WHERE user_id2 = 1201
),
target_traj AS (
  SELECT ST_MakeLine(l.geom ORDER BY c.checkin_time) AS geom
  FROM checkins c
  JOIN locations l ON c.location_id = l.location_id
  WHERE c.user_id = 1201
    AND c.checkin_time::date = '2010-09-19'
),
others AS (
  SELECT c.user_id, ST_MakeLine(l.geom ORDER BY c.checkin_time) AS geom
  FROM checkins c
  JOIN locations l ON c.location_id = l.location_id
  WHERE c.user_id IN (SELECT friend_id FROM friends)
    AND c.checkin_time::date = '2010-09-19'
  GROUP BY c.user_id
  HAVING COUNT(*) > 1
)
SELECT o.user_id, ST_AsGeoJSON(o.geom), ST_FrechetDistance(t.geom, o.geom) AS distance
FROM target_traj t, others o
ORDER BY distance
LIMIT 5;
```

#### Parameters
- `User ID`  (number): Search certain user (Once enter a number, dropdown will suggest relevant ids; if not, delete user id and input again)
- `Date`  (date): Search certain date (Once entered user id, date dropdown will suggest available date; if not, delete date and input again)
  
#### Response Example
```json
[
    {
        "user_id": 21176,
        "geom": "{\"type\":\"LineString\",\"coordinates\":[[-73.997838921,40.71369988],[-73.997686667,40.719024067]]}",
        "distance": 1.4134059219261357
    },
]
```


## 🔧 Development Notes

- PostgreSQL service must be running
- PostGIS extension must be enabled
- Frontend runs on port 3000
- Backend API runs on port 8000
- Ensure all environment variables are properly set


## ❗ Troubleshooting

- **Database Connection Issues**: Verify PostgreSQL service is running and credentials are correct
- **Map Not Loading**: Check if Leaflet CSS is properly imported
- **API Errors**: Ensure backend server is running


## 🙏 Acknowledgments

- Leaflet.js for the mapping library
- PostGIS for spatial queries
- Dataset from Kaggle
