import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import BarChart from "./graph"
import { useState } from "react";


export default function GraphDialog() {
    const [DialogTrig, setDialogTrig] = useState();
    return (
        <div >
            <Dialog>
            <DialogTrigger><BarChart /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    <div style={{width:"90%", height: "70%"}}>
                    <BarChart />
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        </div>
    )
}
  
