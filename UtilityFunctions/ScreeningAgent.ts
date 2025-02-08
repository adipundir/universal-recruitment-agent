"use server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function resumeScreeningAgent(resume: string, job: any) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("resume", resume)
    console.log("job", job)
  // Define the prompt
  const prompt = `
      Given the following job description and candidate resume, Extensively examine and determine if the candidate is a suitable fit for an interview. The decision should be strictly 'Yes' or 'No' based on whether the candidate meets the key job requirements. Consider factors such as educational background, relevant experience, technical skills, and any related achievements. Do not provide explanations—only respond with 'Yes' or 'No' and Name of the candidate, their email and companyName all seperated by a # symbol.

      Job description : ${JSON.stringify(job)}

      Candidate's Resume : ${JSON.stringify(resume)}
    `;

  const response = await model.generateContent(prompt);
  const textResponse = response.response.text();
  const finalResponse = textResponse.split("#");
  console.log(finalResponse)

  if (finalResponse[0].includes("No")) {
    console.log("sorry");
    const name = finalResponse[1].trim()
    const  email = finalResponse[2].trim()
    const companyName = finalResponse[3].trim();
    console.log(name);
    console.log(email);
    console.log(companyName);
} else {
    console.log("congrats");
    const name = finalResponse[1].trim();
    const email = finalResponse[2].trim();
     const companyName = finalResponse[3].trim();
     console.log(name);
     console.log(email);
     console.log(companyName);
  }
}
