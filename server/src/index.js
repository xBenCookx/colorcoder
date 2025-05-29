const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../../client')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Color matching endpoint
app.post('/api/match-color', (req, res) => {
  const { color } = req.body;
  // Add color matching logic here
  const complementaryColors = {
    maroon: '#FFFDD0', // cream
    lightblue: '#987A5C', // Khaki
    navy: '#d3a200', // Mustard
    darkgreen: '#000000', // black
    grey: '#EFA498', // Pastel Peach
    purple: '#FFFF00', // Yellow
    coral: '#00FFFF', // Cyan
    teal: '#FFA07A', // Light Salmon
    gold: '#000080', // Navy Blue
    silver: '#800080', // Purple
    olive: '#FF00FF', // Magenta
    salmon: '#00FF00', // Lime
    indigo: '#FFA500', // Orange
    lavender: '#008000', // Green
    '#98FF98': '#FF69B4', // Mint -> Hot Pink
    '#FFDAB9': '#4169E1', // Peach -> Royal Blue
    '#FF007F': '#32CD32', // Rose -> Lime Green
    '#708090': '#FFD700', // Slate -> Gold
    turquoise: '#FF4500', // Orange Red
    violet: '#00FF7F', // Spring Green
  };
  
  const complementaryColor = complementaryColors[color] || '#ffffff';
  res.json({ complementaryColor });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 