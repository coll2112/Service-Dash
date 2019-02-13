INSERT INTO users(firstname, lastname, address, city, state, zip)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *