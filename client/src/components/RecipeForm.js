import { useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { Form, Button, Alert } from 'react-bootstrap';

const RecipeForm = () => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const recipe = { title, ingredients, steps };

    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setTitle('');
      setIngredients('');
      setSteps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_RECIPE', payload: json });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="create">
      <h3>Add a New Recipe</h3>

      <Form.Group className="mb-3">
        <Form.Label>Recipe Name:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes('title') ? 'is-invalid' : ''}
        />
        {emptyFields.includes('title') && <Form.Control.Feedback type="invalid">Recipe Name is required.</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ingredients:</Form.Label>
        <Form.Control
          as="textarea"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className={emptyFields.includes('ingredients') ? 'is-invalid' : ''}
        />
        {emptyFields.includes('ingredients') && <Form.Control.Feedback type="invalid">Ingredients are required.</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Steps:</Form.Label>
        <Form.Control
          as="textarea"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className={emptyFields.includes('steps') ? 'is-invalid' : ''}
        />
        {emptyFields.includes('steps') && <Form.Control.Feedback type="invalid">Steps are required.</Form.Control.Feedback>}
      </Form.Group>

      <Button type="submit" variant="primary">Add Recipe</Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
};

export default RecipeForm;
