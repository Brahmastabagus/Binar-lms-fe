import { useEffect, useState } from 'react'
import { Badge, Button, Form, ListGroup, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getTodo, todoSelector } from '../stores/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "universal-cookie";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import ModalView from '../components/ModalView';
import List from '../components/List';
import { handleCloseView, handleShowView } from '../utils/views';
import { handleCheck } from '../utils/handleCheck';
import { handleShowAdd } from '../utils/add';
import ModalAdd from '../components/ModalAdd';
import { handleShowUpdate } from '../utils/update';
import ModalUpdate from '../components/ModalUpdate';
import { handleShowDelete } from '../utils/delete';
import ModalDelete from '../components/ModalDelete';

const Todolist = () => {
  const [datas, setDatas] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [selectData, setSelectData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.todoSlice)
  const todo = useSelector(todoSelector.selectAll)
  const cookies = new Cookies()
  let token = cookies.get("token")
  const decode = jwtDecode(token)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch])

  useEffect(() => {
    setDatas(Object.values(todo))
  }, [todo])

  const [priority, setPriority] = useState("all");
  const [filterPriority, setFilterPriority] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const [showUpdate, setShowUpdate] = useState(false);

  const [showView, setShowView] = useState(false);

  const navigate = useNavigate()
  const handleLogout = () => {
    cookies.remove("token", {
      path: "/",
      // expires: new Date(new Date().getTime() + 200 * 1000)
    });
    toast.danger("You have successfully logged out", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/")
    }, 2000);
    // window.location.replace('/')
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
      handleCheck: () => handleCheck(data, dispatch),
      handleShowView: () => data?.completed ? false : handleShowView(data, setShowView, setSelectData),
      handleShowUpdate: (e) => {
        e.stopPropagation()
        data?.completed ? false : handleShowUpdate(data, setShowUpdate, setSelectData)
      },
      handleShowDelete: (e) => {
        e.stopPropagation()
        handleShowDelete(data?.id, setShowDelete, setIdDelete)
      }
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center vw-100 pt-3">
      <ToastContainer />
      <div className="w-100 d-flex flex-column gap-1">
        <h1 className="text-center">{decode.name}{"'"}s ToDo List</h1>
        <div className="d-flex justify-content-end">
          <Button style={{ width: "fit-content" }} className="mb-2" variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="d-flex justify-content-between gap-2">
          <Button style={{ width: "fit-content" }} className="mb-2" variant="primary" onClick={() => handleShowAdd(setShowAdd)}>
            Create Todo
          </Button>
          <Form.Select style={{ width: "fit-content", height: "40px" }} aria-label="Choose priority" onChange={(e) => setPriority(e.target.value)}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Form.Select>
        </div>

        <ModalAdd
          show={showAdd}
          setFormValue={setFormValue}
          formValue={formValue}
          loading={loading}
          setLoading={setLoading}
          setShowAdd={setShowAdd}
          decode={decode}
          dispatch={dispatch}
        />

        <ModalUpdate
          show={showUpdate}
          selectData={selectData}
          setFormValue={setFormValue}
          formValue={formValue}
          loading={loading}
          setLoading={setLoading}
          setShowUpdate={setShowUpdate}
          dispatch={dispatch}
        />

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

        <ModalDelete
          show={showDelete}
          idDelete={idDelete}
          loading={loading}
          setLoading={setLoading}
          setShowDelete={setShowDelete}
          dispatch={dispatch}
        />

        <ModalView
          show={showView}
          onHide={() => handleCloseView(setShowView)}
          views={selectData}
        />
      </div>
    </div>
  )
}

export default Todolist