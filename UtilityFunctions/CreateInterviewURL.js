export const createInterviewURL = (jobID, email) => {
    return `http://localhost/interview/${jobID}/${encodeURIComponent(email)}`;
};