INSERT INTO users (username, password, admin, email)
VALUES (${username}, ${password}, ${admin}, ${email})
RETURNING *