const express = require('express');
const cors = require('cors');
const path = require('path');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/notes', notesRoutes);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server jalan di http://localhost:3000/notes');
});

app.get('/', (req, res) => {
    res.send('API Notes berjalan 🚀');
});
