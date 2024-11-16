import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRecipeById, engagement } from '@/api/recipe';
import { RecipeType } from '@/type';
import { Button, Card, Typography, Image } from 'antd';
import { useAuth } from '@/components/AuthContext';
import { StarOutlined, StarFilled, LikeOutlined, LikeFilled } from '@ant-design/icons';
const { Title, Text } = Typography;


interface Ingredient {
  name: string;
  amount: string;
}

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const { isLoggedIn, user, updateUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isStared, setIsStared] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !hasRedirected) {
      setHasRedirected(true);
      router.replace('/login');
    }
  }, [isLoggedIn, hasRedirected, router]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id && user) {
        const data = await getRecipeById(Number(id));
        setRecipe(data);

        setIsLiked(user.liked ? user.liked.split(',').includes(id as string) : false);
        setIsStared(user.stared ? user.stared.split(',').includes(id as string) : false);
      }
    };
    fetchRecipe();
  }, [id, user]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleLikeClick = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        await engagement(Number(id), 'remove', 'like', user.id);
        const updatedUser = {
          ...user,
          liked: user.liked ? user.liked.split(',').filter(recipeId => recipeId !== id).join(',') : '',
        };
        updateUser(updatedUser);
      } else {
        await engagement(Number(id), 'add', 'like', user.id);
        const updatedUser = {
          ...user,
          liked: user.liked ? `${user.liked},${id}` : id as string,
        };
        updateUser(updatedUser);
      }
      setIsLiked(!isLiked);
      setRecipe(prevRecipe => ({
        ...prevRecipe!,
        likeCount: isLiked ? prevRecipe!.likeCount - 1 : prevRecipe!.likeCount + 1,
      }));
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  }

  const handleStarClick = async () => {
    if (!user) return;

    try {
      if (isStared) {
        await engagement(Number(id), 'remove', 'star', user.id);
        const updatedUser = {
          ...user,
          stared: user.stared ? user.stared.split(',').filter(recipeId => recipeId !== id).join(',') : '',
        };
        updateUser(updatedUser);
      } else {
        await engagement(Number(id), 'add', 'star', user.id);
        const updatedUser = {
          ...user,
          stared: user.stared ? `${user.stared},${id}` : id as string,
        };
        updateUser(updatedUser);
      }
      setIsStared(!isStared);
      setRecipe(prevRecipe => ({
        ...prevRecipe!,
        starCount: isStared ? prevRecipe!.starCount - 1 : prevRecipe!.starCount + 1,
      }));
    } catch (error) {
      console.error('Error updating star status:', error);
    }
  }


  const handlestarclick = () => {

  }
  const { name, description, imageUrl, spirit, spiritAmount, juice, juiceAmount, basic, basicAmount,other,otherAmount, alcohol, likeCount, starCount, method } = recipe;

  const renderIngredientCategory = (title: string, ingredients: Ingredient[], color: string, addMl: boolean = true) => {
    if (!ingredients || ingredients.length === 0) return null;

    return (
      <div style={{ marginBottom: '10px', width: '100%', maxWidth: '300px' }}>
        {/* <Title level={5}>{title}</Title> */}
        <div style={{
          backgroundColor: color,
          padding: '10px',
          borderRadius: '5px'
        }}>
          {ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong style={{ textAlign: 'left' }}>{ingredient.name}</Text>
              <Text style={{ textAlign: 'right' }}>
              {ingredient.amount}{addMl ? 'ml' : ''}
            </Text>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const spiritIngredients = [{ name: spirit, amount: spiritAmount }];
  const juiceIngredients = juice ? juice.split(',').map((j, i) => ({ name: j, amount: juiceAmount.split(',')[i] })) : [];
  const basicIngredients = basic ? basic.split(',').map((b, i) => ({ name: b, amount: basicAmount.split(',')[i] })) : [];
  const otherIngredients = other ? other.split(',').map((o, i) => ({ name: o, amount: otherAmount.split(',')[i] })) : [];

  return (
    <Card style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column' }}>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column' }}>
        <Button
          icon={isLiked ? <LikeFilled style={{ color: 'red' }} /> : <LikeOutlined />}
          onClick={handleLikeClick}
          size="large"
        >
          {likeCount}
        </Button>
        <Button
          icon={isStared ? <StarFilled style={{ color: 'orange' }} /> : <StarOutlined />}
          onClick={handleStarClick}
          size="large"
        >
          {starCount}
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Image src={imageUrl} alt={name} width={300} />
      </div>
      <Title level={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name}</Title>
      <Title level={4}>Ingredients</Title>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
   
    {renderIngredientCategory('Spirit', spiritIngredients, '#ffcccb')}
    {renderIngredientCategory('Juice', juiceIngredients, '#fffacd')}
    {renderIngredientCategory('Basic', basicIngredients, '#d3d3d3')}
    {renderIngredientCategory('Other', otherIngredients, '#b4fff9',false)}
    <Text>Alcohol: {alcohol}</Text>
  </div>
      <Title level={4}>Method</Title>

      <div style={{ whiteSpace: 'pre-wrap' }}>{method}</div>
      <Title level={4}>Description</Title>
      <div style={{ whiteSpace: 'pre-wrap' }}>{description}</div>
    </Card>
  );
};

export default RecipeDetail;