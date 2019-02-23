DELETE FROM employee
WHERE employee_id = $1
RETURNING *