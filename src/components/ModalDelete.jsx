import { Button, Modal } from "react-bootstrap"
import { handleCloseDelete, handleDelete } from "../utils/delete"

const ModalDelete = ({ show, idDelete, loading, setLoading, setShowDelete, dispatch }) => {
  return (
    <Modal show={show} onHide={() => handleCloseDelete(setShowDelete)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete ToDo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This action is irreversible. Are you sure you want to proceed and delete it?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          Cancel
        </Button>
        <Button disabled={loading} variant="danger" onClick={() => handleDelete(setLoading, dispatch, idDelete, setShowDelete)}>
          {loading ? "Loading..." : "Yes, Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDelete