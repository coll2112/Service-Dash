DELETE FROM application
WHERE app_id = $1
RETURNING *