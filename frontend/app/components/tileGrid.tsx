export default function Grid({
    children
} : {
    children?: Array<React.ReactNode>;
}) {

    return (
        <div className="overflow-hidden">
            <div className="overflow-hidden max-w-[50rem] p-4 flex flex-row gap-1 border-solid border-2">{children}{children}</div>
        </div>
    )
    
}