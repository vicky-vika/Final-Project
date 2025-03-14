import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcrypt';

const WEATHERAPI_KEY = '5fe30ce010c44c82ab6175410251203';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.json());

const dbFinalProject = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123AbCd.',
  database: 'finalproject',
});

const dbTrainingCompany = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123AbCd.',
  database: 'training_company',
});

dbFinalProject.connect((err) => {
  if (err) {
    console.error('Error connecting to the finalproject database:', err.message);
  } else {
    console.log('Successfully connected to the finalproject database');
  }
});

dbTrainingCompany.connect((err) => {
  if (err) {
    console.error('Error connecting to the training_company database:', err.message);
  } else {
    console.log('Successfully connected to the training_company database');
  }
});

// Weather API routes
app.get('/weather/current', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${city}&aqi=no`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    res.status(500).json({ message: 'Error fetching current weather' });
  }
});

app.get('/weather/forecast', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${city}&days=3&aqi=no`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    res.status(500).json({ message: 'Error fetching weather forecast' });
  }
});

// Fetch all locations from the details table
app.get('/details', (req, res) => {
  dbFinalProject.query(
    'SELECT * FROM details ORDER BY visit_date_from DESC LIMIT 4',
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Error fetching locations' });
      }
      res.json(results);
    }
  );
});

// Fetch all students from the training_company database
app.get('/students', (req, res) => {
  dbTrainingCompany.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error fetching students' });
    }
    res.json(results);
  });
});

// Fetch a specific student by ID
app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  dbTrainingCompany.query(
    'SELECT * FROM students WHERE student_id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Error fetching student details' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(results[0]);
    }
  );
});

// Fetch a specific location by ID
app.get('/country/:id', (req, res) => {
  const { id } = req.params;
  dbFinalProject.query(
    `SELECT id, country, city, country_description, 
            img1, img2, img3, img4, img5, img6, 
            visit_date_from, visit_date_to 
     FROM details 
     WHERE id = ?`,
    [id],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Error fetching country details' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Country not found' });
      }
      res.json(results[0]);
    }
  );
});

// Fetch all images from the details table
app.get('/images', (req, res) => {
  dbFinalProject.query(
    'SELECT img1, img2, img3, img4, img5, img6 FROM details',
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Error fetching images' });
      }

      const images = results.flatMap(row => Object.values(row).filter(Boolean));
      res.json(images);
    }
  );
});

// Add a new location to the details table
app.post('/details', (req, res) => {
  const {
    country,
    city,
    visit_date_from,
    visit_date_to,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    country_description,
  } = req.body;

  const query = `
    INSERT INTO details (country, city, visit_date_from, visit_date_to, img1, img2, img3, img4, img5, img6, country_description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  dbFinalProject.query(
    query,
    [country, city, visit_date_from, visit_date_to, img1, img2, img3, img4, img5, img6, country_description],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Error adding location' });
      }
      res.status(201).json({ message: 'Location added successfully', id: results.insertId });
    }
  );
});

// Delete a location from the details table
app.delete('/details/:id', (req, res) => {
  const { id } = req.params;

  dbFinalProject.query('DELETE FROM details WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error deleting location' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  });
});

// Update a location in the details table
app.put('/details/:id', (req, res) => {
  const { id } = req.params;
  const {
    country,
    city,
    visit_date_from,
    visit_date_to,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    country_description,
  } = req.body;

  const query = `
    UPDATE details
    SET country = ?, city = ?, visit_date_from = ?, visit_date_to = ?, img1 = ?, img2 = ?, img3 = ?, img4 = ?, img5 = ?, img6 = ?, country_description = ?
    WHERE id = ?
  `;

  dbFinalProject.query(
    query,
    [country, city, visit_date_from, visit_date_to, img1, img2, img3, img4, img5, img6, country_description, id],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Error updating location' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.status(200).json({ message: 'Location updated successfully' });
    }
  );
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  console.log('Login attempt for email:', email); // Debugging

  const query = 'SELECT * FROM students WHERE email = ?';
  dbTrainingCompany.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Debugging
      return res.status(500).json({ message: 'Database error', details: err.message });
    }

    if (results.length === 0) {
      console.log('User not found for email:', email); // Debugging
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    console.log('User found:', user); // Debugging

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Invalid password for email:', email); // Debugging
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { password: _, ...userData } = user;
      res.status(200).json({ found: true, data: userData });
    } catch (error) {
      console.error('Password comparison error:', error); // Debugging
      res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  });
});

// Handle wrong routes
app.use((req, res) => {
  res.status(404).json({ message: 'Wrong route!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});