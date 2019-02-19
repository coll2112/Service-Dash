UPDATE application
set status = $2
WHERE app_id = $1
RETURNING *