export const createInterviewURL = (jobID, email) => {
    return `http://universal-recruitment-agent.vercel.app/interview/${jobID}/${encodeURIComponent(email)}`;
};