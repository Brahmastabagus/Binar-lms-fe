import { Button, Form, Modal } from "react-bootstrap"
import { handleAdd, handleCloseAdd } from "../utils/add"

const ModalAdd = ({ show, setFormValue, formValue, loading, setLoading, setShowAdd, decode, dispatch }) => {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}>
      <Modal.Header>
        <Modal.Title>Create ToDo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Reading the book" onChange={(e) => setFormValue({ ...formValue, title: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Todo">
            <Form.Label>To Do</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder='Reading the books mathematics...' onChange={(e) => setFormValue({ ...formValue, desc: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" onChange={(e) => setFormValue({ ...formValue, date: new Date(e.target.value) })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Priority">
            <Form.Label>Priority</Form.Label>
            <Form.Select style={{ width: "fit-content", height: "40px" }} aria-label="Choose priority" onChange={(e) => setFormValue({ ...formValue, priority: e.target.value })}>
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseAdd(setShowAdd)}>
          Close
        </Button>
        <Button disabled={loading} variant="success" onClick={() => handleAdd(setShowAdd, setLoading, formValue, decode, dispatch)}>
          {loading ? "Loading..." : "Create Todo"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAdd