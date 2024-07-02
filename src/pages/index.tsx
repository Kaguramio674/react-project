import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Carousel, Card, Flex } from 'antd';
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const { Meta } = Card;

export default function Home() {

  const [randomId, setRandomId] = useState<null | number>(null);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * (62 - 45 + 1)) + 45;
    setRandomId(randomNumber);
  }, []);

  const contentStyle: React.CSSProperties = {
    height: '360px',
    color: '#fff',
    lineHeight: '360px',
    textAlign: 'center',
    background: '#364d79',
  };
  const router = useRouter();
  return (
    <main>
      <div style={{ width: '100%', height: '550px', position: 'relative' }}>
        <Carousel 
          autoplay 
          dotPosition="right" 
          autoplaySpeed={6000}
          style={{
            width: '100%',
            height: '100%',
            marginBottom: '2rem'
          }}
        >
          <div onClick={() => router.push('/recipe')}>
            <div style={{
              width: '100%',
              height: '500px',
              backgroundImage: 'url(https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/home/1719866680677-home0.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>
          <div onClick={() => router.push('/recipe')}>
            <div style={{
              width: '100%',
              height: '500px',
              backgroundImage: 'url(https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/home/1719866614485-home1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>
          <div onClick={() => router.push('/recipe')}>
            <div style={{
              width: '100%',
              height: '500px',
              backgroundImage: 'url(https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/home/1719866617391-home2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>
        </Carousel>
      </div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginTop: '2rem' }}>Recommend</h1>
      <Flex justify="space-evenly">
      <Link href="/recipe/49" passHref>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="Negroni" src="https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/recipe-img/1719859253770-Negroni.png" />}
        >
          <Meta title="Negroni" />
        </Card>
      </Link>
      
      <Link href="/recipe/45" passHref>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="Margarita" src="https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/recipe-img/1719855611007-margarita.jpeg" />}
        >
          <Meta title="Margarita" />
        </Card>
      </Link>
      
      <Link href={`/recipe/${randomId}`} passHref>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="Random Choice" src="https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/recipe-img/1718202377235-default.png" />}
        >
          <Meta title="Random Choice!" />
        </Card>
      </Link>
    </Flex>


    </main>
  );
}
