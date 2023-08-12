import { Badge, Modal } from "react-bootstrap"
import choosePriority from "../utils/choosePriority"
import formatDate from "../utils/formatDate"

const ModalView = ({ show, onHide, views }) => {
  return (
    <Modal show={show} onHide={onHide} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>View ToDo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-between w-100 pe-2">
          <h4>{views?.title}</h4>
          <Badge bg={choosePriority(views?.priority)}>{views?.priority?.toUpperCase()}</Badge>
        </div>
        <p className="lead">{views?.desc}</p>
        <h5 className="mt-2 text-secondary">{`${formatDate(views?.date)}`}</h5>
      </Modal.Body>
    </Modal>
  )
}

export default ModalView