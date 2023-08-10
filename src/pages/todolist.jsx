import { useEffect, useState } from 'react'
import { Badge, Button, Form, ListGroup, Modal, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap'
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodo, setCompletedTodo, setTodo, todoSelector } from '../stores/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "universal-cookie";
import jwtDecode from 'jwt-decode';
// import PropTypes from 'prop-types';

const Todolist = () => {
  const [datas, setDatas] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.todoSlice)
  const todo = useSelector(todoSelector.selectAll)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch])

  useEffect(() => {
    setDatas(Object.values(todo))
  }, [todo])

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString("id-Id", options)
  }

  const [priority, setPriority] = useState("all");
  const [filterPriority, setFilterPriority] = useState([]);

  const handleCheck = async ({ id, title, completed }) => {
    await dispatch(setCompletedTodo(id))
    dispatch(getTodo())

    if (completed == false) {
      toast.success(`${title} is completed`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.warning(`${title} is not completed`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }
  }

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (index) => {
    setShowDelete(true)
    setIdDelete(index)
    console.log(index);
  };

  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const [dataupdate, setDataUpdate] = useState({});
  const handleShowUpdate = (data) => {
    setShowUpdate(true)
    setDataUpdate({ ...data })
  };

  const [showView, setShowView] = useState(false);
  const [views, setViews] = useState({});

  const handleCloseView = () => setShowView(false);
  const handleShowView = (data) => {
    setShowView(true)
    setViews({ ...data })
  };

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)

    const cookies = new Cookies()
    let token = cookies.get("token")
    const id = jwtDecode(token).id

    const res = await dispatch(setTodo({ ...formValue, user_id: id }))

    try {
      if (res.payload.status == "success") {
        await toast.success(`${res.payload.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        dispatch(getTodo())

        setTimeout(() => {
          setLoading(false)
          setTimeout(() => {
            setFormValue({})
            setShowAdd(false)
          }, 1000);
        }, 2000);
      } else {
        await toast.error(`${res.payload.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })

        setTimeout(() => {
          setLoading(false)
          setFormValue({})
        }, 2000);
      }
    } catch (err) {
      await toast.error(`${err.status}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setLoading(false)
      setTimeout(() => {
        setFormValue({})
        setShowAdd(false)
      }, 1000);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await dispatch(deleteTodo(idDelete))

    try {
      if (res.payload.status == "success") {
        await toast.success(`${res.payload.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        dispatch(getTodo())

        setTimeout(() => {
          setLoading(false)
          setTimeout(() => {
            setShowDelete(false)
          }, 1000);
        }, 2000);
      } else {
        await toast.error(`${res.payload.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })

        setTimeout(() => {
          setLoading(false)
        }, 2000);
      }
    } catch (err) {
      await toast.error(`${err.status}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setLoading(false)
      setTimeout(() => {
        setShowDelete(false)
      }, 1000);
    }
  }

  const Tooltips = (props) => (
    <OverlayTrigger
      placement='top'
      overlay={(styles) => (
        <Tooltip id={props.id} {...styles}>
          {props.title}
        </Tooltip>
      )}
    >
      <div style={{ width: "20px", cursor: "pointer" }} className='d-flex justify-content-center'>
        {props.children}
      </div>
    </OverlayTrigger>
  );

  const choosePriority = (priority) => {
    switch (priority) {
      case "high":
        priority = "danger"
        break;

      case "medium":
        priority = "info"
        break;

      case "low":
        priority = "warning"
        break;

      default:
        priority = "light"
        break;
    }

    return priority
  }

  const List = ({ data, id, handleCheck, handleShowView, handleShowUpdate, handleShowDelete }) => {
    return (
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-center text-black"
        variant={choosePriority(data?.priority)}
        style={{ cursor: "pointer" }}
        action
        key={id}
        onClick={handleShowView}
      >
        <Form.Check
          type={'checkbox'}
          onChange={handleCheck}
          onClick={(e) => e.stopPropagation()}
          checked={data?.completed}
          id={`default-${'checkbox'}`}
        />
        <div className="ms-2 me-auto overflow-hidden">
          <div className={`fw-bold ${data?.completed ? "text-decoration-line-through" : ""}`}>{data?.title}</div>
          <p className={`d-inline-block text-truncate ${data?.completed ? "text-decoration-line-through" : ""} w-100 pe-4`}>{data?.desc}</p>
          <p className={`text-secondary ${data?.completed ? "text-decoration-line-through" : ""}`}>{`${formatDate(data?.date)}`}</p>
        </div>
        <div className="d-flex justify-content-center gap-1">
          <Tooltips title="Update">
            <BsPencilSquare onClick={handleShowUpdate} className="text-black" />
          </Tooltips>
          <Tooltips title="Delete">
            <BsFillTrashFill onClick={handleShowDelete} className="text-black" />
          </Tooltips>
        </div>
      </ListGroup.Item>
    )
  }

  useEffect(() => {
    const filteredPriority = () => {
      setFilterPriority(datas.filter(data => {
        return data.priority == priority
      }))
    }

    filteredPriority()
  }, [priority, datas])

  const attributes = (data, index) => {
    return {
      data: data,
      id: index,
      handleCheck: () => handleCheck(data),
      handleShowView: () => data?.completed ? false : handleShowView(data),
      handleShowUpdate: (e) => {
        e.stopPropagation()
        data?.completed ? false : handleShowUpdate(data)
      },
      handleShowDelete: (e) => {
        e.stopPropagation()
        handleShowDelete(data?.id)
      }
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center vw-100 pt-3">
      <ToastContainer />
      <div className="w-100 d-flex flex-column gap-1">
        <h1 className="text-center">My ToDo List</h1>
        <div className="d-flex justify-content-between gap-2">
          <Button style={{ width: "fit-content" }} className="mb-2" variant="primary" onClick={handleShowAdd}>
            Create Todo
          </Button>
          <Form.Select style={{ width: "fit-content", height: "40px" }} aria-label="Choose priority" onChange={(e) => setPriority(e.target.value)}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Form.Select>
        </div>

        <Modal
          show={showAdd}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
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
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button disabled={loading} variant="primary" onClick={handleAdd}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showUpdate}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Update ToDo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={dataupdate?.title}
                  type="text"
                  placeholder="Mengerjakan tugas" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Todo">
                <Form.Label>To Do</Form.Label>
                <Form.Control
                  value={dataupdate?.desc}
                  as="textarea"
                  rows={3}
                  placeholder='Mengerjakan tugas Matematika...' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Date">
                <Form.Label>Date</Form.Label>
                <Form.Control value={dataupdate?.date?.slice(0, 10)} type="date" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.Priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select style={{ width: "fit-content", height: "40px" }} aria-label="Choose priority" value={dataupdate?.priority}>
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <ListGroup as="ul">
          {
            status != "pending"
              ?
              priority == "all"
                ?
                datas.map((data, index) => {
                  return (
                    <List key={index} {...attributes(data, index)} />
                  )
                })
                :
                filterPriority.length != 0
                  ?
                  filterPriority.map((data, index) => {
                    return (
                      <List key={index} {...attributes(data, index)} />
                    )
                  })
                  :
                  (
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <h1>Data not found</h1>
                    </div>
                  )
              :
              (
                <Stack direction="horizontal" className="py-5 mx-auto" gap={2}>
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </Stack>
              )
          }
        </ListGroup>
        <Stack direction="horizontal" className="ms-auto mt-2" gap={2}>
          <p className="fw-bold">Priority: </p>
          <Badge bg="danger">High</Badge>
          <Badge bg="info">Medium</Badge>
          <Badge bg="warning" text="dark">Low</Badge>
        </Stack>

        <Modal show={showDelete} onHide={handleCloseDelete}>
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
            <Button variant="danger" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showView} onHide={handleCloseView} size='xl'>
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
      </div>
    </div>
  )
}

export default Todolist