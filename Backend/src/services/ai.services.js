const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function generateContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `
You are an expert AI code reviewer specializing in development best practices. 
Your job is to carefully review the provided code and respond in the following **structured format**:

---
## ❌ Problems Found:
- Clearly list each problem, starting with ❌.  
- Mention **where** it occurs (line number, function, variable, etc.).  
- Explain **why** it’s a problem (impact or potential bug).  

## 💡 Suggestions for Improvement:
- Give actionable suggestions for fixing the above problems.  
- Suggest **better coding practices** for maintainability.  

## ⚡ Optimized Code:
\`\`\`javascript
// Provide fully optimized, clean, and readable code here.
\`\`\`

## 📝 Additional Notes:
- Include tips, alternative approaches, or extra improvements the developer could consider.
---

**Rules for Output:**
- Always use Markdown formatting.
- Always include the above 4 sections.
- Keep explanations clear but detailed enough for a junior developer to understand.
      `
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error in generateContent:", error);
    throw error;
  }
}

module.exports = { generateContent };
