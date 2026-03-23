const express = require('express');
const router = express.Router();
const { Note } = require('../models');

// POST
router.post('/', async (req, res) => {
    const note = await Note.create(req.body);
    res.json(note);
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Note.destroy({
        where: { id: req.params.id }
    });
    res.json({ message: "Deleted" });
});

router.get('/', async (req, res) => {
    try {
        const data = await Note.findAll();
        res.json(data);
    } catch (err) {
        console.error(err); // 🔥 ini penting
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Note.update(
            {
                judul: req.body.judul,
                isi: req.body.isi
            },
            {
                where: { id: req.params.id }
            }
        );

        res.json({ message: "Updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;