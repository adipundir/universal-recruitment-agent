import GetRecordByID from "./GetSingleRecord";

export default async function getInterviewContext(jobID, email) {
    const job = (await GetRecordByID(jobID))[0];
    console.log("the job", job);
    console.log('Email', email)

    const candidateDetails = job.candidates?.find(
        //change this to 1st one 
        // (candidate) => candidate.candidateEmail === email && candidate.interviewScheduled === "Yes"
        (candidate) => candidate.candidateEmail == email
    );

    // Create a shallow copy of the job object and remove the candidates field
    const { candidates, hasPaid, companyLogo, isAccepting, ...jobWithoutCandidates } = job;

    return { jobWithoutCandidates, candidateDetails};
}
