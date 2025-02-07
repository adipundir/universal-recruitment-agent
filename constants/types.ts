type JobListing = {
  id: string; // Unique identifier for the job
  title: string; // Job title (e.g., "Software Engineer")
  company: string; // Company name
  location: string; // Location (e.g., "Remote", "New York, USA")
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship"
    | "Freelance"; // Type of job
  description: string; // Full job description
  requirements: string[]; // List of job requirements (e.g., ["3+ years of experience", "React, TypeScript"])
  preferredSkills?: string[]; // Optional: Extra skills that are nice to have
  salaryRange?: { min: number; max: number; currency: string }; // Optional: Salary details
  experienceLevel: "Entry" | "Mid" | "Senior"; // Experience level required
  postedAt: string; // ISO date string of when the job was posted
  applicationDeadline?: string; // Optional: Deadline for applications
  recruiterId: string; // Reference to the recruiter who posted the job
};
