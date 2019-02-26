INSERT INTO job (app_id, employee_id)
VALUES ($1, $2)
RETURNING *