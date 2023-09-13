const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
// require('dotenv').config();

const app = express();


app.use(cors());

app.use(express.json());

app.get('/',(req,res)=> {
    res.send('code converter ');
})

app.post('/convert', async (req, res) => {

    const {language, code} = req.body;
    // console.log(word);

    const prompt = `convert this ${code} into this ${language} language`;
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            max_tokens: 70,
            messages: [{ role: 'system', 
            content: 'You are a code converter.' }, { role: 'user', content: prompt }],
        },
        {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
        }
    );

    const convertedCode = response.data.choices[0].message.content;
    res.json({ convertedCode });
});

app.post('/debug', async (req, res) => {

    const { code} = req.body;
    // console.log(word);

    const prompt = `debug this ${code} `;
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            max_tokens: 70,
            messages: [{ role: 'system', 
            content: 'You are a code debugger.' }, { role: 'user', content: prompt }],
        },
        {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
        }
    );

    const output = response.data.choices[0].message.content;
    res.json({ output });
});
app.post('/quality', async (req, res) => {

    const { code} = req.body;
    // console.log(word);

    const prompt = `check quality of this ${code} and also give feedback with rating `;
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            max_tokens: 70,
            messages: [{ role: 'system', 
            content: 'You are a code quality checker and reviewer.' }, { role: 'user', content: prompt }],
        },
        {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
        }
    );

    const output = response.data.choices[0].message.content;
    res.json({ output });
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
