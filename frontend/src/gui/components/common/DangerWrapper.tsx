import { cn } from "@/lib/utils"

const DangerWrapper = ({children, className = ''}) => {
    return (
        <span className={cn(className, 'text-danger-red text-xs')}>
            {children}
        </span>
    );
}

export default DangerWrapper;
