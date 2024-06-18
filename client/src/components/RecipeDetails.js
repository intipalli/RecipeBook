import { useRecipesContext } from '../hooks/useRecipesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from 'react-bootstrap';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/recipes/${recipe._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'DELETE_RECIPE', payload: json });
      } else {
        // Handle error response
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  return (
    <div className="recipe-details p-4 mb-4 bg-white rounded">
      <h4 className="mb-3">{recipe.title}</h4>
      <p className="mb-3"><strong>Ingredients: </strong>{recipe.ingredients}</p>
      <div className="mb-3">
        <p className="mb-1"><strong>Steps: </strong></p>
        {recipe.steps.split('\n').map((step, index) => (
          <p key={index} className="mb-1">{step}</p>
        ))}
      </div>
      <p className="mb-3">{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      {user && (
        <Button variant="danger" onClick={handleClick}>
          Delete
        </Button>
      )}
    </div>
  );
};

export default RecipeDetails;
