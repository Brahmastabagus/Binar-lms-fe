import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLogin } from '../stores/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const Login = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 4) {
      setValue(inputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await dispatch(getLogin({ number: value }))

    try {
      if (res.payload.status == "success") {
        const cookies = new Cookies()
        const token = res.payload.data.token
        cookies.set("token", token, { path: "/" })
        await toast.success(`${res.payload.message}`, {
          position: "bottom-center",
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
          setTimeout(() => {
            navigate('/todo')
          }, 1000);
        }, 2000);
      } else {
        await toast.error(`${res.payload.message}`, {
          position: "bottom-center",
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
          setValue("")
        }, 2000);
      }
    } catch (err) {
      await toast.error(`${err.status}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex vw-100 vh-100">
      <ToastContainer />
      <Card style={{ width: "30%" }}>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Enter Number</Form.Label>
              <Form.Control type="text" value={value} onChange={handleInputChange} placeholder="Ex. 1234" />
              <Form.Text className="text-muted">
                Enter 4 numbers.
              </Form.Text>
            </Form.Group>
            <Button disabled={loading} variant="primary" type="submit" onClick={handleSubmit}>{loading ? "Loading..." : "Login"}</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login