import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SkillGap from "./skill-gap"



export default function SkillGapDialog() {
    return (
        <div >
            <Dialog>
            <DialogTrigger><SkillGap /></DialogTrigger>
                <div > 
                    <DialogContent style={{width:"100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div>

                            <DialogHeader>
                            <DialogTitle>Most Words Found</DialogTitle>
                            <DialogDescription>
                                <SkillGap />
                            </DialogDescription>
                            </DialogHeader>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    )
}