import { Dialog } from '@headlessui/react'
import { HorizontalLine } from './HorizontalLine'

export const Modal = ({children, name, modal, toggle }) => {
    return (
        <Dialog open={modal} onClose={() => {toggle()}}>
            <div className="fixed inset-0 bg-[#00000099]" aria-hidden="true">
                <div className="z-10 fixed inset-0 flex items-center p-4  justify-center">
                    <Dialog.Panel className="bg-black border border-lightgreen p-10 rounded-md space-y-5 min-w-[300px] max-h-[80vh]">
                        <div className='flex items-center justify-between'>
                            <div className='font-black'>
                                {name}
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 hover:bg-hlgreen rounded-md hover:cursor-pointer" onClick={() => {toggle()}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <HorizontalLine/>
                        {children}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}