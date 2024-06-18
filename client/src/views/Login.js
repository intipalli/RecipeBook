import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="mb-4 text-center">Log In</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
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
                Log in
              </Button>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
