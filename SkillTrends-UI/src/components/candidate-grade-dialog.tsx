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
    const matchPercentage = 0.75; // Example value, you can adjust or pass this dynamically

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <CandidateGrade matchPercentage={matchPercentage} />
                </DialogTrigger>
                <div>
                    <DialogContent style={{ width: "100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div>
                            <DialogHeader>
                                <DialogTitle>Percentage Match</DialogTitle>
                                <DialogDescription>
                                    <CandidateGrade matchPercentage={matchPercentage} />
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}
