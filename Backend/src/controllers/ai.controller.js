const aiService = require('../services/ai.services');

exports.getReview = async (req, res) => {
    try {
        // const code = req.body.code;
        const code = req.body.prompt;
        const result = await aiService.generateContent(code);
        res.json({ review: result }); // wrap in object
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating AI response');
    }
};
