const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.generateReview = async (code) => {
  const prompt = `
You are a senior software engineer. Review the following code:
${code}

Provide:
- Bug report
- Vulnerabilities
- Improvements
- Time/space complexity
- Cleaner version of code
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
