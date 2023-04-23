import { useEffect, useState } from "react";
import { Time } from "./Time";
import RingLoader from "react-spinners/RingLoader";
import { HorizontalLine } from "./HorizontalLine";


export const CollectionInformationPanel= ({active, collection}) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (!collection) {
            setLoading(true)
        }
        setLoading(false)

        setDescription(collection.body.description)
    }, [collection])
    
    return (
        <div className={`p-2 ${active ? "block" : "hidden"} space-y-2 overflow-y-auto customScroll`}>
            {
                loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <RingLoader color="#00ff00" size={40}/>
                    </div>
                )
                :
                (
                    <>
                        <div>
                            {description ? description : <span className="italic">No description provided</span>}
                        </div>
                        <HorizontalLine />
                    </>
                   
                )
            }
 
        </div>
    )
}