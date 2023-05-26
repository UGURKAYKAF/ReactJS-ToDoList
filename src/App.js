import { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.length) {
      return;
    }
    const newItem = {
      text,
      id: Date.now(),
    };
    setItems(items.concat(newItem));
    setText("");
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleComplete = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">ToDo List</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Add Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
          <br />
          <ListGroup>
            {items.map((item) => (
              <ListGroup.Item
                key={item.id}
                variant={item.completed ? "success" : ""}
              >
                <div className="d-flex justify-content-between">
                  <div>{item.text}</div>
                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      X
                    </Button>{" "}
                    <Button
                      variant={item.completed ? "outline-danger" : "outline-success"}
                      size="sm"
                      onClick={() => handleComplete(item.id)}
                    >
                      {item.completed ? "Uncomplete" : "Complete"}
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
