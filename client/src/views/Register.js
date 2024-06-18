import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="mb-4 text-center">Register</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : 'Register'}
              </Button>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
