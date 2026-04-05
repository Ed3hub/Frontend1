import { cn } from "@/lib/utils";

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("max-w-7xl mx-auto flex flex-col pt-28 space-y-10", className)}>
                {children}
        </div>
    )
}