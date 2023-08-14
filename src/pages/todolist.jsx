import { useEffect, useState } from 'react'
import { Badge, Form, ListGroup, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Cookies from "universal-cookie";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import ModalView from '../components/ModalView';
import List from '../components/List';
import { handleCloseView } from '../utils/views';
import ModalAdd from '../components/ModalAdd';
import ModalUpdate from '../components/ModalUpdate';
import ModalDelete from '../components/ModalDelete';
import attributes from '../utils/attributes';
import Loading from '../components/Loading';
import { useTodo } from '../hooks/useTodo';
import Button from '../components/Button';

const Todolist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()
  let token = cookies.get("token")
  const decode = jwtDecode(token)

  const [status, todo] = useTodo(dispatch)
  const [datas, setDatas] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [selectData, setSelectData] = useState({});
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState("all");
  const [filterPriority, setFilterPriority] = useState([]);
  const [idDelete, setIdDelete] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);

  useEffect(() => {
    setDatas(Object.values(todo))
  }, [todo])

  useEffect(() => {
    const filteredPriority = () => {
      setFilterPriority(datas.filter(data => {
        return data.priority == priority
      }))
    }

    filteredPriority()
  }, [priority, datas])

  return (
    <div className="container d-flex flex-column align-items-center vw-100 pt-3">
      <ToastContainer />
      <div className="w-100 d-flex flex-column gap-1">
        <h1 className="text-center">{decode.name}{"'"}s ToDo List</h1>
        <div className="d-flex justify-content-end">
          <Button.Logout cookies={cookies} navigate={navigate}>Logout</Button.Logout>
        </div>
        <div className="d-flex justify-content-between gap-2">
          <Button.Create setShowAdd={setShowAdd}>Create Todo</Button.Create>
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
                    <List key={index} {...attributes(data, index, dispatch, setShowView, setSelectData, setShowUpdate, setShowDelete, setIdDelete)} />
                  )
                })
                :
                filterPriority.length != 0
                  ?
                  filterPriority.map((data, index) => {
                    return (
                      <List key={index} {...attributes(data, index, dispatch, setShowView, setSelectData, setShowUpdate, setShowDelete, setIdDelete)} />
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
                <Loading />
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