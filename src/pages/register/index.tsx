import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const Register = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Revistas cadastradas
                </h3>
                <Button><Plus />Nova</Button>
            </div>
        </div>
    )
}

export default Register