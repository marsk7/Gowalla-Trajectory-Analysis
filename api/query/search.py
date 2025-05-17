from ..db import get_db_connection
import datetime
from fastapi import HTTPException


min_date = datetime.date(2009, 2, 1)
max_date = datetime.date(2010, 10, 31)


def get_checkins_in_area(start_date, end_date, min_lon, min_lat, max_lon, max_lat):
    conn = get_db_connection()
    cur = conn.cursor()

    # date not valid exception
    if not min_date <= datetime.datetime.strptime(start_date, "%Y-%m-%d").date() <= max_date \
            or not min_date <= datetime.datetime.strptime(end_date, "%Y-%m-%d").date() <= max_date:
        raise HTTPException(status_code=400, detail="Date not in valid range (2009-02 to 2010-10)")

    query = """
        SELECT c.user_id, c.location_id, c.checkin_time, ST_AsGeoJSON(l.geom)
        FROM checkins c
        JOIN locations l ON c.location_id = l.location_id
        WHERE c.checkin_time BETWEEN %s AND %s
        AND ST_Within(l.geom, ST_MakeEnvelope(%s, %s, %s, %s, 4326));
    """
    cur.execute(query, (start_date, end_date, min_lon, min_lat, max_lon, max_lat))
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "user_id": r[0],
            "location_id": r[1],
            "checkin_time": r[2],
            "geom": r[3]
        } for r in rows
    ]


def get_nearest_locations(lat, lon, limit):
    conn = get_db_connection()
    cur = conn.cursor()
    query = """
        SELECT l.location_id, ST_Y(l.geom), ST_X(l.geom), ST_AsGeoJSON(l.geom) AS geom, COUNT(*) AS checkin_count
        FROM locations l
        JOIN checkins c ON l.location_id = c.location_id
        GROUP BY l.location_id, l.geom
        ORDER BY l.geom <-> ST_SetSRID(ST_Point(%s, %s), 4326)
        LIMIT %s;
    """
    cur.execute(query, (lon, lat, limit))
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "location_id": r[0],
            "latitude": r[1],
            "longitude": r[2],
            "geom": r[3],
            "checkin_count": r[4]
        } for r in rows
    ]


def get_user_trajectory(user_id, date):
    conn = get_db_connection()
    cur = conn.cursor()

    # user not exists exception
    cur.execute("SELECT 1 FROM users WHERE user_id = %s", (user_id,))
    if cur.fetchone() is None:
        raise HTTPException(status_code=404, detail="User ID not exist")

    # date not valid exception
    if not min_date <= datetime.datetime.strptime(date, "%Y-%m-%d").date() <= max_date:
        raise HTTPException(status_code=400, detail="Date not in valid range (2009-02 to 2010-10)")

    # invalid trajectory exception
    cur.execute("""
        SELECT COUNT(*) FROM checkins
        WHERE user_id = %s AND checkin_time::date = %s
    """, (user_id, date))
    if cur.fetchone()[0] < 2:
        raise HTTPException(status_code=204, detail="User trajectory inadequate in current date")


    query = """
        SELECT c.user_id, c.checkin_time, ST_AsGeoJSON(l.geom)
        FROM checkins c
        JOIN locations l ON c.location_id = l.location_id
        WHERE c.user_id = %s
          AND c.checkin_time::date = %s
        ORDER BY c.checkin_time ASC;
    """
    cur.execute(query, (user_id, date))
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "user_id": r[0],
            "checkin_time": r[1],
            "geom": r[2]
        } for r in rows
    ]


def get_checkins_country(country):
    conn = get_db_connection()
    cur = conn.cursor()
    query = """
        SELECT c.user_id, c.location_id, c.checkin_time, ST_AsGeoJSON(l.geom)
        FROM checkins c
        JOIN locations l ON c.location_id = l.location_id
        WHERE ST_Within(l.geom, (
            SELECT geom FROM countries WHERE LOWER(name) = LOWER(%s) LIMIT 1
        ));
    """
    cur.execute(query, (country,))
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "user_id": r[0],
            "location_id": r[1],
            "checkin_time": r[2],
            "geom": r[3]
        } for r in rows
    ]


def get_friend_trajectory(user_id, date):
    conn = get_db_connection()
    cur = conn.cursor()

    # user not exists exception
    cur.execute("SELECT 1 FROM users WHERE user_id = %s", (user_id,))
    if cur.fetchone() is None:
        raise HTTPException(status_code=404, detail="User ID not exist")

    # date not valid exception
    if not min_date <= datetime.datetime.strptime(date, "%Y-%m-%d").date() <= max_date:
        raise HTTPException(status_code=400, detail="Date not in valid range (2009-02 to 2010-10)")

    query = """
        WITH friends AS (
          SELECT user_id2 AS friend_id FROM friendships WHERE user_id1 = %s
          UNION
          SELECT user_id1 AS friend_id FROM friendships WHERE user_id2 = %s
        ),
        target_traj AS (
          SELECT ST_MakeLine(l.geom ORDER BY c.checkin_time) AS geom
          FROM checkins c
          JOIN locations l ON c.location_id = l.location_id
          WHERE c.user_id = %s
            AND c.checkin_time::date = %s
        ),
        others AS (
          SELECT c.user_id, ST_MakeLine(l.geom ORDER BY c.checkin_time) AS geom
          FROM checkins c
          JOIN locations l ON c.location_id = l.location_id
          WHERE c.user_id IN (SELECT friend_id FROM friends)
            AND c.checkin_time::date = %s
          GROUP BY c.user_id
          HAVING COUNT(*) > 1
        )
        SELECT o.user_id, ST_AsGeoJSON(o.geom), ST_FrechetDistance(t.geom, o.geom) AS distance
        FROM target_traj t, others o
        ORDER BY distance
        LIMIT 5;
    """
    cur.execute(query, (user_id, user_id, user_id, date, date))
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "user_id": r[0],
            "geom": r[1],
            "distance": r[2]
        } for r in rows
    ]


def get_user_ids(prefix: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT user_id FROM checkins
        WHERE CAST(user_id AS TEXT) LIKE %s
        GROUP BY user_id
        HAVING COUNT(*) >= 2
        ORDER BY user_id
        LIMIT 20
    """, (prefix + '%',))
    result = [row[0] for row in cur.fetchall()]
    conn.close()
    return result

def get_user_valid_dates(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT DISTINCT checkin_time::date
        FROM checkins
        WHERE user_id = %s
        ORDER BY checkin_time::date
    """, (user_id,))
    result = [row[0].isoformat() for row in cur.fetchall()]
    conn.close()
    return result

