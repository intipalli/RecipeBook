import { useEffect } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import RecipeDetails from '../components/RecipeDetails';
import RecipeForm from '../components/RecipeForm';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_RECIPES', payload: json });
        } else {
          console.error('Failed to fetch recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    if (user) {
      fetchRecipes();
    }
  }, [dispatch, user]);

  return (
    <div className="py-4">
      <Container>
        <Row>
          <Col md={8}>
            <div className="recipes-container" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: '15px', paddingLeft: '15px', marginRight: '-15px', marginLeft: '-15px' }}>
              {recipes &&
                recipes.map((recipe) => (
                  <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded">
              <RecipeForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
