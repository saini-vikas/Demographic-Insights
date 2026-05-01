import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
function SpinnerButton() {
    return (
        <div className="flex w-full h-full flex-col justify-center items-center gap-4">
            <Button variant="secondary" disabled size="lg">
                <Spinner data-icon="inline-start" className="size-8" />
                Processing
            </Button>
        </div>
    )
}


export default SpinnerButton
