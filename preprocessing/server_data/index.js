const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('../data_dashboard.db');

app.use(cors());
app.use(express.json());

// Exemple de route pour obtenir des données
app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM climate_gender_data', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Démarrer le serveur
app.listen(5000, () => {
    console.log('Serveur en cours d\'exécution sur le port 5000');
});
