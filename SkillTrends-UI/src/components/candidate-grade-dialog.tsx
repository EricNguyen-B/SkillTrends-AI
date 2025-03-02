import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import CandidateGrade from "./candidate-grade"


export default function CandidateGradeDialog() {
    return (
        <div >
            <Dialog>
            <DialogTrigger><CandidateGrade /></DialogTrigger>
                <div > 
                    <DialogContent style={{ 
                            width: "90%", 
                            height: "50%", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center",
                            overflow: "hidden" // Add this to prevent cutoff
                            }}>
                        <div style={{ 
                            position: "relative",
                            width: "100%", 
                            height: "100%",
                            minWidth: 300, // Set minimum dimensions
                            minHeight: 300
                        }}>
                            <DialogHeader>
                            <DialogTitle>How Aligned Is this Candidate to the Job Description?</DialogTitle>
                            <div style={{
                                width: "100%",
                                height: "100%",
                                padding: "10px",
                                boxSizing: "border-box"
                                }}>

                                <DialogDescription>
                                    <div>
                                        <CandidateGrade />
                                    </div>
                                </DialogDescription>
                            </div>
                            </DialogHeader>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    )
}