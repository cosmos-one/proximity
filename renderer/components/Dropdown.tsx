import { useEffect, useState } from "react"

export const Dropdown = ({title, titleBold, children}) => {
    const [toggle, setToggle] = useState(false)
    const [bold, setBold] = useState(false)

    useEffect(() => {
        if (titleBold) {
            setBold(titleBold)
        }
    }, [])

    return (
        <>
            {
                toggle ?
                (
                    <div className="group flex justify-between hover:cursor-pointer py-1 hover:bg-hlgreen">
                        <div className='flex items-center space-x-2 w-auto' onClick={() => setToggle(!toggle)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <div className={`${bold ? "fonts-bold" : null} truncate"`}>
                                {title}
                            </div>
                        </div>
                    </div>
                )
                : 
                (
                    <>
                        <div className="group flex justify-between hover:cursor-pointer py-1 hover:bg-hlgreen">
                            <div className='flex items-center space-x-2 w-auto' onClick={() => setToggle(!toggle)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <div className={`${bold ? "font-bold" : null} truncate"`}>
                                    {title}
                                </div>
                            </div>
                        </div>
                        <div className="pl-4">
                            {children}
                        </div>
                    </>
                )
            }
        
        </>
    )
}