import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRecipeById } from '@/api/recipe';
import { RecipeType } from '@/type';
import { Button, Card, Typography, Image } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { StarOutlined, LikeOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const { isLoggedIn } = useAuth();
  const [testlikeCount, setTestlikeCount] = useState(0);
  const [teststarCount, setTeststarCount] = useState(0);


  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    const fetchRecipe = async () => {
      if (id) {
        const data = await getRecipeById(Number(id));
        setRecipe(data);
      }
    };
    fetchRecipe();
  }, [id, isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }


  const handlelikeclick = () => {
    setTestlikeCount(testlikeCount + 1);
  }

  const handlestarclick = () => {
    setTeststarCount(teststarCount + 1);
  }
  const { name, description, imageUrl, base, alcohol, likeCount, starCount } = recipe;

  return (
    <Card style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column' }}>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column' }}>
        <Button icon={<LikeOutlined />} onClick={handlelikeclick} size="large">
          {testlikeCount}
        </Button>
        <Button icon={<StarOutlined />} onClick={handlestarclick} style={{ marginTop: '16px' }} size="large">
          {teststarCount}
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Image src={'/recipes/base/vodka.jpg'} alt={name} width={'50%'} />
      </div>
      <Title level={1}style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{name}</Title>
      <Title level={4}>Ingredients</Title>
      <Text>{base}</Text>
      <Text>{alcohol}</Text>
      <Title level={4}>Method</Title>
      <Text>{description}</Text>
    </Card>
  );
};

export default RecipeDetail;