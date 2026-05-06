const express = require('express');
const cors = require('cors');
const path = require('path');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server jalan di port ${PORT}`);
});