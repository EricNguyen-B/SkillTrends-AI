require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
console.log(process.env.GEMINI_API_KEY);

app.post('/api/analyze-resume', async (req, res) => {
  const { extractedText } = req.body;

  if (!extractedText) {
    return res.status(400).json({ error: 'Missing extractedText in request body' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text:  "Please provide a data analysis and statistics based on the person's major, skill sets, any skill shortages they may have, in comparison to the job market." + extractedText } // Here you send the resume text or any other content to analyze
        ]
      }
    ]
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling generative language API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error analyzing resume content' });
  }
});

app.get('/api/analyze-job', async (req, res) => {
  const { jobType, location } = req.query;

  if (!jobType || !location) {
    return res.status(400).json({ error: 'Missing jobType or location query parameter.' });
  }

  const prompt = `Based on my earlier upload of my pdf resume, and my preferences to look for a ${jobType} role in the city ${location}, can you provide me a concise analysis if I meet possibly the role and statistics for that area with my skillset? Can you also address any experience gaps and skill shortages?`;

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error calling generative language API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error analyzing job criteria.' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Resume Analysis API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
