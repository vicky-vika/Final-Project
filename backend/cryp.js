import bcrypt from 'bcrypt';

const password = 'pw3'; 
const saltRounds = 10; 

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Hashed passwod:', hash);
    
  }
});