import { useEffect, useState } from 'react'
import { Badge, Button, Form, ListGroup, Modal, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap'
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
// import PropTypes from 'prop-types';

const Todolist = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString("id-Id", options)
  }

  const [datas, setDatas] = useState([
    {
      title: "Go shopping for vegetables at the market.",
      desc: "Buy tomatoes, carrots, and spinach for dinner. Make sure to choose fresh produce from the local farmers market. Don't forget to pick up some herbs as well. Plan to prepare a nutritious meal for the family using the fresh ingredients.",
      date: new Date(),
      completed: true,
      priority: "high"
    },
    {
      title: "Vacation to the zoo.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolores vero distinctio, alias voluptatum quisquam aspernatur. Perspiciatis, maiores adipisci dicta quod eaque modi quisquam fugit sint id voluptatibus accusantium incidunt ex. Consectetur nobis omnis labore. Minus qui eaque ipsum harum totam doloribus, veritatis omnis impedit. Sit enim itaque nisi accusamus temporibus quae ratione repellendus maxime voluptatum a explicabo, quidem cumque repellat dolor recusandae id labore nobis ipsa autem vel at! Obcaecati nisi corporis eum officiis praesentium, modi, itaque nesciunt numquam illo fugit sapiente. Velit veniam magni ab labore facere culpa doloribus quos similique, quaerat quasi vitae ad nesciunt aperiam hic.",
      date: new Date(),
      completed: false,
      priority: "medium"
    },
    {
      title: "Do homework.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolores vero distinctio, alias voluptatum quisquam aspernatur. Perspiciatis, maiores adipisci dicta quod eaque modi quisquam fugit sint id voluptatibus accusantium incidunt ex. Consectetur nobis omnis labore. Minus qui eaque ipsum harum totam doloribus, veritatis omnis impedit. Sit enim itaque nisi accusamus temporibus quae ratione repellendus maxime voluptatum a explicabo, quidem cumque repellat dolor recusandae id labore nobis ipsa autem vel at! Obcaecati nisi corporis eum officiis praesentium, modi, itaque nesciunt numquam illo fugit sapiente. Velit veniam magni ab labore facere culpa doloribus quos similique, quaerat quasi vitae ad nesciunt aperiam hic.",
      date: new Date(),
      completed: false,
      priority: "low"
    },
    {
      title: "Read a book.",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolores vero distinctio, alias voluptatum quisquam aspernatur. Perspiciatis, maiores adipisci dicta quod eaque modi quisquam fugit sint id voluptatibus accusantium incidunt ex. Consectetur nobis omnis labore. Minus qui eaque ipsum harum totam doloribus, veritatis omnis impedit. Sit enim itaque nisi accusamus temporibus quae ratione repellendus maxime voluptatum a explicabo, quidem cumque repellat dolor recusandae id labore nobis ipsa autem vel at! Obcaecati nisi corporis eum officiis praesentium, modi, itaque nesciunt numquam illo fugit sapiente. Velit veniam magni ab labore facere culpa doloribus quos similique, quaerat quasi vitae ad nesciunt aperiam hic.",
      date: new Date(),
      completed: false,
      priority: "low"
    },
  ]);
  const [priority, setPriority] = useState("all");
  const [filterPriority, setFilterPriority] = useState([]);

  const handleCheck = async (data) => {
    setDatas((prevDatas) =>
      prevDatas.map((check) =>
        check === data ? { ...check, completed: !check.completed } : check
      )
    );
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

  // List.propTypes = {
  //   data: PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     desc: PropTypes.string.isRequired,
  //     date: PropTypes.instanceOf(Date).isRequired,
  //     completed: PropTypes.bool.isRequired,
  //     priority: PropTypes.string.isRequired
  //   }).isRequired,
  //   id: PropTypes.number.isRequired,
  //   handleCheck: PropTypes.func.isRequired,
  //   handleShowView: PropTypes.func.isRequired,
  //   handleShowUpdate: PropTypes.func.isRequired,
  //   handleShowDelete: PropTypes.func.isRequired
  // };

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
        handleShowDelete(index)
      }
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center vw-100 pt-3">
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

        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Create ToDo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Reading the book" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>To Do</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder='Reading the books mathematics...' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Select style={{ width: "fit-content", height: "40px" }} aria-label="Choose priority">
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Update ToDo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control value={dataupdate.title} type="text" placeholder="Mengerjakan tugas" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>To Do</Form.Label>
                <Form.Control value={dataupdate.desc} as="textarea" rows={3} placeholder='Mengerjakan tugas Matematika...' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Title</Form.Label>
                <Form.Control value={formatDate(dataupdate.date)} type="date" />
              </Form.Group>
              <Form.Select style={{ width: "fit-content", height: "40px" }} aria-label="Choose priority" value={dataupdate.priority}>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
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
            <Modal.Title>Create ToDo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure to delete this id {idDelete}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseDelete}>
              Save Changes
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