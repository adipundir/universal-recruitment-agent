export type JobOpening = {
  _id: string;
  recruiterId: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  location: string;
  salary: string;
  postedDate: string;
  employmentType: string;
  description: string;
  requirements: string[];
  isAccepting: string;
  candidates: string | [];
};
