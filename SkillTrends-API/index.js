require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const upload = multer({ storage: multer.memoryStorage() });

console.log("Gemini API Key:", process.env.GEMINI_API_KEY);

app.post('/api/analyze-resume', upload.single('file'), async (req, res) => {
  let extractedText = "";

  if (req.file) {
    try {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
      console.log("Extracted text from PDF (first 200 chars):", extractedText.slice(0, 200) + "...");
    } catch (err) {
      console.error("Error extracting PDF text:", err);
      return res.status(500).json({ error: "Error extracting PDF text" });
    }
  } 
  else if (req.body.extractedText) {
    extractedText = req.body.extractedText;
  } else {
    return res.status(400).json({ error: "Missing PDF file or extractedText in request" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { 
            text: "Please provide a data analysis and statistics based on the person's major, skill sets, and any skill shortages in comparison to the job market. " 
                  + extractedText 
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("Gemini API response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error calling generative language API:', 
      error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error analyzing resume content' });
  }
});

app.get('/api/analyze-job', async (req, res) => {
  const { jobType, location } = req.query;

  if (!jobType || !location) {
    return res.status(400).json({ error: 'Missing jobType or location query parameter.' });
  }

  const prompt = `Based on my earlier upload of my PDF resume, and my preferences to look for a ${jobType} role in ${location}, can you provide a concise analysis of my fit for this role including job market statistics, experience gaps, and any skill shortages?`;

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
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("Gemini API job analysis response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error calling generative language API:', 
      error.response ? error.response.data : error.message);
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
