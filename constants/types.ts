export type JobOpening =  {
  OpeningId: string;
  recruiterId: string
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
  applicantAddresses: string[]
  description: string;
  requirements: string[];
  isAccepting: boolean;
}
