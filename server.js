// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple API for mood-based suggestions
app.get('/api/suggestions', (req, res) => {
  const mood = (req.query.mood || '').toLowerCase();
  let suggestions = [];

  if (/energi|active|motiv/i.test(mood)) {
    suggestions = [
      { title: 'Grilled Salmon Bowl', calories: 420 },
      { title: 'Quinoa Power Salad', calories: 360 },
      { title: 'Protein-Packed Smoothie', calories: 280 }
    ];
  } else if (/relax|calm|chill/i.test(mood)) {
    suggestions = [
      { title: 'Thai Green Curry', calories: 380 },
      { title: 'Creamy Avocado Toast', calories: 320 },
      { title: 'Warm Oatmeal Bowl', calories: 300 }
    ];
  } else if (/stress|tired|busy/i.test(mood)) {
    suggestions = [
      { title: 'Chicken Caesar Salad', calories: 350 },
      { title: 'Vegetable Stir Fry', calories: 280 },
      { title: 'Quick Beef Tacos', calories: 450 }
    ];
  } else {
    // default
    suggestions = [
      { title: 'Grilled Salmon', calories: 420 },
      { title: 'Margherita Pizza', calories: 520 },
      { title: 'BBQ Pulled Pork', calories: 480 }
    ];
  }

  res.json({ mood: mood || 'any', suggestions });
});

// All other routes -> index.html (single page)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
