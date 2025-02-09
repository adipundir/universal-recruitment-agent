"use server";
import { InterviewInvitationEmail } from "@/components/InterviewScheduledEmail";
import { RejectionEmail } from "@/components/ScreeningRejectionEmail";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";
import transformObject from "./TransformRecord";
import updateSVRecord from "./UpdateSVRecord";
import GetRecordByID from "./GetSingleRecord";
import {getFormattedDate} from "./GetFormattedDate"
import {createInterviewURL} from "./CreateInterviewURL"

export default async function resumeScreeningAgent(resume: string, jobID: any) {
  const resend = new Resend(process.env.SCREENING_AGENT_RESEND_API_KEY);

  const job = (await GetRecordByID(jobID))[0];

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log("resume", resume);
  console.log("job", job);

  const prompt = `
    Given the following job description and candidate resume, conduct a detailed evaluation to determine if the candidate is a suitable fit for an interview. The decision must be strictly 'Yes' or 'No' based on alignment with key job requirements, including educational background, relevant experience, technical skills, and notable achievements.

    Provide only the response in the following format:
    Yes/No#Candidate Name#Candidate Email#Resume Score#Reason for Decision

    Ensure the reason clearly justifies why the candidate is or isn't selected for an interview. Do not include explanations or additional details beyond the required response format.
    
    Job description : ${JSON.stringify(job)}

    Candidate's Resume : ${JSON.stringify(resume)}
    `;

  const response = await model.generateContent(prompt);
  const textResponse = response.response.text();
  const finalResponse = textResponse.split("#");
  console.log(finalResponse);

  const name = finalResponse[1].trim();
  const email = finalResponse[2].trim();
  const resumeScore = finalResponse[3].trim();
  const DecisionReason = finalResponse[4].trim();

  // return if candidate has already applied

  const hasAlreadyApplied =
    job.candidates?.some(
      (candidate: any) => candidate.candidateEmail === email
    ) || false;
  if (hasAlreadyApplied) return "You have already applied for this opening.";

  // Interview Not Scheduled

  if (!finalResponse[0].includes("No")) {
    console.log("sorry");
    console.log(name);
    console.log(email);
    console.log(job.companyName);
    console.log('job fetched', job)
    
    job.candidates.push({
      candidateEmail: email,
      candidateResume: resume,
      interviewScheduled: "No",
      resumeScore: resumeScore,
      interviewScores: {
        knowledge: "",
        truthfulness: "",
        communication: "",
        confidence: "",
        problemSolving: "",
        jobFit: "",
        adaptability: "",
        culturalFit: "",
      },
      overallScore: "",
      feedback: DecisionReason,
      interviewDate: "",
      verdict: "Screened Out Rejection",
    });
    const transformedRecord = transformObject(job);
    updateSVRecord(transformedRecord, job._id);

    console.log("Updated record", job);
    console.log("transformed Record", transformedRecord);

    // send rejection email

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
      return "Thanks for applying. Check email for updates"
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  } else {

    // Interview Scheduled

    console.log("congrats");
    console.log(name);
    console.log(email);
    console.log(job.companyName);
    console.log("job fetched", job);

    job.candidates.push({
      candidateEmail: email,
      candidateResume: resume,
      interviewScheduled: "Yes",
      resumeScore: resumeScore,
      interviewScores: {
        knowledge: "",
        truthfulness: "",
        communication: "",
        confidence: "",
        problemSolving: "",
        jobFit: "",
        adaptability: "",
        culturalFit: "",
      },
      overallScore: "",
      feedback: DecisionReason,
      interviewDate: getFormattedDate(),
      verdict: "Interview Scheduled",
    });

    const transformedRecord = transformObject(job);
    updateSVRecord(transformedRecord, job._id);

    console.log("Updated record", job);
    console.log("transformed Record", transformedRecord);

    //Send Interview Scheduled Email
    
    try {
      const emailHtml = await InterviewInvitationEmail({
        firstName: name,
        companyName: job.companyName,
        interviewLink: createInterviewURL(jobID, email),
      });

      const { data, error } = await resend.emails.send({
        from: "Universal Recruiter <onboarding@resend.dev>",
        to: [email],
        subject: `Congratulations! You're Invited to an Interview at ${job.companyName}`,
        react: emailHtml,
      });

      console.log("data", data);
      if (error) console.log("error", error);
      return "Thanks for applying. Check email for updates";
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
}
