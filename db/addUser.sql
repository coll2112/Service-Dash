INSERT INTO users (username, password, admin)
VALUES (${username}, ${password}, ${admin})
RETURNING *