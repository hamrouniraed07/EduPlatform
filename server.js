require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

connectDB();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);


app.get('/', (req, res) => res.send('EduPlatform API is running'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
