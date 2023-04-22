import { Button } from "./Button"
import { Modal } from "./Modal"

export const InfoModal = ({toggle, modal}) => {

  return (
    <Modal name={"Info"} modal={modal} toggle={toggle}>
        <div className="text-slate-400">
            Welcome to Proximity!<br/><br/>We are a small team of 2 currently working hard on making it more stable and reliable for all our users. As a result, you may encounter some glitches or issues while using the software. We kindly ask for your patience during this process.<br/><br/>In the meantime, we would greatly appreciate any feedback you may have about your experience with Proximity. Your input will help us identify areas where we can improve and make the software better for everyone.<br/><br/>Thank you for your understanding and support as we continue to develop and refine Proximity.
        </div>
    </Modal>
  )
}