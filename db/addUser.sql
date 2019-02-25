INSERT INTO users (username, password, admin, email, firstname, lastname, address, city, state, zip)
VALUES (${username}, ${password}, ${admin}, ${email}, ${firstname}, ${lastname}, ${address}, ${city}, ${state}, ${zip})
RETURNING *