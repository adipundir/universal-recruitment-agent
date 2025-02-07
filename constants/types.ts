export type JobListing =  {
  id: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  location: string;
  salary: string;
  postedDate: string;
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship"
    | "Freelance"
    | "";
  applicantCount: number;
  description: string;
  requirements: string[];
  isAccepting: boolean;
}
