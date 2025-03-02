import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import BarChart from "./graph"



export default function GraphDialog() {
    return (
        <div >
            <Dialog>
            <DialogTrigger><BarChart /></DialogTrigger>
                <div > 
                    <DialogContent style={{width:"100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div>

                            <DialogHeader>
                            <DialogTitle>Most Words Found</DialogTitle>
                            <DialogDescription>
                                <BarChart />
                            </DialogDescription>
                            </DialogHeader>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    )
}
  
