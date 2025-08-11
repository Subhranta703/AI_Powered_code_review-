const aiService = require('../services/ai.services');

exports.getResponse = async (req, res) => {
    try {
        const prompt = req.query.prompt;
        const result = await aiService.generateContent(prompt);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating AI response');
    }
};
