const bcrypt = require('bcrypt');

const password = 'password';
const salt = '$2b$10$CMs.4slNcE5.P4I3zzWUQuGFYS.1c6XVEmFZTzQpQe67UI2kspIGO';

// Use the hashSync function to hash the password with the provided salt
try {
  const hashed = bcrypt.hashSync(password, salt);
  console.log(hashed);
} catch (err) {
  console.error(err);
}
