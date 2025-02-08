"use server";
import { InterviewInvitationEmail } from "@/components/InterviewScheduledEmail";
import { RejectionEmail } from "@/components/ScreeningRejectionEmail";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

export default async function resumeScreeningAgent(resume: string, job: any) {
  const resend = new Resend(process.env.SCREENING_AGENT_RESEND_API_KEY);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log("resume", resume);
  console.log("job", job);
  // Define the prompt
  const prompt = `
    Given the following job description and candidate resume, conduct a detailed evaluation to determine if the candidate is a suitable fit for an interview. The decision must be strictly 'Yes' or 'No' based on alignment with key job requirements, including educational background, relevant experience, technical skills, and notable achievements. Provide only the response in the following format:
    Yes/No#Candidate Name#Candidate Email
    Do not include explanations or additional details.
    
    Job description : ${JSON.stringify(job)}

    Candidate's Resume : ${JSON.stringify(resume)}
    `;

  const response = await model.generateContent(prompt);
  const textResponse = response.response.text();
  const finalResponse = textResponse.split("#");
  console.log(finalResponse);

  if (!finalResponse[0].includes("No")) {
    console.log("sorry");
    const name = finalResponse[1].trim();
    const email = finalResponse[2].trim();
    console.log(name);
    console.log(email);
    try {
      const emailHtml = await RejectionEmail({
        firstName: name,
        companyName: job.companyName,
      });
      const { data, error } = await resend.emails.send({
        from: "Universal Recruiter <onboarding@resend.dev>",
        to: [email],
        subject: "Thank You for Applying – Update on Your Application",
        react: emailHtml,
      });
      console.log("data", data);
      if (error) console.log("error", error);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  } else {
    console.log("congrats");
    const name = finalResponse[1].trim();
    const email = finalResponse[2].trim();
    console.log(name);
    console.log(email);
    try {
      const emailHtml = await InterviewInvitationEmail({
        firstName: name,
        companyName: job.companyName,
        interviewLink: "",
      });

      const { data, error } = await resend.emails.send({
        from: "Universal Recruiter <onboarding@resend.dev>",
        to: [email],
        subject: `Congratulations! You’re Invited to an Interview at ${job.companyName}`,
        react: emailHtml,
      });
      console.log("data", data);
      if (error) console.log("error", error);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
}
