import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

const Login = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 4) {
      setValue(inputValue);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex vw-100 vh-100">
      <Card className="w-50">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Enter Number</Form.Label>
              <Form.Control type="text" value={value} onChange={handleInputChange} placeholder="Enter number" />
              <Form.Text className="text-muted">
                Enter 4 numbers.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login