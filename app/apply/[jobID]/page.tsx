"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useParams } from "next/navigation";
import useJobOpeningsStore from "@/Zustand/JobOpeningsStore";
import { Button } from "@/components/ui/button";
import pdfToText from 'react-pdftotext'
import { toast } from "sonner";
import resumeScreeningAgent from "@/UtilityFunctions/ScreeningAgent";



export default function Apply() {
    const params = useParams()
    const jobOpenings = useJobOpeningsStore((state: any) => state.jobOpenings);
    const relevantOpening = jobOpenings.find((job: any) => job._id == params.jobID)

    const [resume, setResume] = useState<File>();
    const [pdfText, setPdfText] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileUpload = (file: File) => {
        setResume(file);
        console.log(file);
    };

    useEffect(() => {
        (async () => {
            if (resume) {
                const res = await pdfToText(resume);
                setPdfText(res);
            }
        })();
    }, [resume]);

    const handleSubmit = async () => {
        if (!resume) {
            alert("Please upload a resume first");
            return;
        }

        setIsSubmitting(true);
        try {
            resumeScreeningAgent(pdfText, relevantOpening)
        } catch (error) {
            console.error("Error processing resume:", error);
            toast.error("Error processing resume.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // if (relevantOpening == null)
    //     return 

    return (
        <div className="flex flex-col gap-4 pt-24">
            <div className="w-full max-w-4xl mx-auto min-h-80 border border-dashed bg-background border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
            </div>
            <div className="w-full flex items-center justify-center max-w-4xl mx-auto mt-4">
                <Button
                    onClick={handleSubmit}
                    disabled={!resume || isSubmitting}
                    className=" py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Processing..." : "Submit Resume for Screening"}
                </Button>
            </div>
        </div>
    );
}
