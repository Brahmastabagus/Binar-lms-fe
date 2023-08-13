import { Button, Form, Modal } from "react-bootstrap"
import { handleCloseUpdate, handleUpdate } from "../utils/update"

const ModalUpdate = ({ show, selectData, setFormValue, formValue, loading, setLoading, setShowUpdate, dispatch }) => {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}>
      <Modal.Header>
        <Modal.Title>Update ToDo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              defaultValue={selectData?.title}
              type="text"
              placeholder="Go shopping for vegetables at the market."
              onChange={e => setFormValue({ ...formValue, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Todo">
            <Form.Label>To Do</Form.Label>
            <Form.Control
              defaultValue={selectData?.desc}
              as="textarea"
              rows={3}
              placeholder='Buy tomatoes, carrots, and spinach for dinner. Make sure to choose fresh...'
              onChange={e => setFormValue({ ...formValue, desc: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              defaultValue={selectData?.date?.slice(0, 10)}
              type="date"
              onChange={e => setFormValue({ ...formValue, date: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.Priority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              style={{ width: "fit-content", height: "40px" }}
              aria-label="Choose priority"
              defaultValue={selectData?.priority}
              onChange={e => setFormValue({ ...formValue, priority: e.target.value })}
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseUpdate(setShowUpdate)}>
          Cancel
        </Button>
        <Button disabled={loading} variant="info" onClick={() => handleUpdate(setLoading, dispatch, formValue, selectData, setShowUpdate)}>
          {loading ? "Loading..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalUpdate