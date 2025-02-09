import GetRecordByID from "./GetSingleRecord"
export default async function isInterviewScheduled(jobID, email) {
    const job = (await GetRecordByID(jobID))[0]
    console.log("the job",job)
    const interviewScheduled =
        job.candidates?.some(
            (candidate) => (candidate.candidateEmail === email && candidate.interviewScheduled == "Yes")
        ) || false;
    return interviewScheduled ? interviewScheduled : false
}
