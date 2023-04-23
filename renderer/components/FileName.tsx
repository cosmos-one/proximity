export const FileName = ({text}) => {
    return(
        <>
            {text.replace(/\.[^.]*$/, "")} {text.includes(".pcol") ? <span className="border-lightgreen border rounded-md px-1">collection</span> : text.includes(".pas") ? <span className="border-lightgreen border rounded-md px-1">asset</span> : null}
        </>
    )
}