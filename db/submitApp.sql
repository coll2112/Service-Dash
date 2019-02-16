INSERT INTO application (user_id, comment, status)
VALUES ($1, $2, $3)
RETURNING *;