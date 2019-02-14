-- INSERT INTO users(firstname, lastname, address, city, state, zip)
-- VALUES ($2, $3, $4, $5, $6, $7)
-- WHERE id = $1
-- RETURNING *

UPDATE users
SET firstname=$2, lastname=$3, address=$4, city=$5, state=$6, zip=$7
WHERE id = $1
RETURNING *;