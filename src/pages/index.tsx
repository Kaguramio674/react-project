import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Carousel, Card, Flex } from 'antd';
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const { Meta } = Card;

export default function Home() {
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
      <Carousel autoplay dotPosition="right" autoplaySpeed={6000}>
        <div onClick={() => router.push('/route1')}>
          <img src="mainpage/1.jpg" alt="1" style={contentStyle} />
        </div>
        <div onClick={() => router.push('/route2')}>
          <img src="2.jpg" alt="2" style={contentStyle} />
        </div>
        <div onClick={() => router.push('/route3')}>
          <img src="3.jpg" alt="3" style={contentStyle} />
        </div>
        <div onClick={() => router.push('/route4')}>
          <img src="4.jpg" alt="4" style={contentStyle} />
        </div>
      </Carousel>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginTop: '2rem' }}>recommend</h1>
  <Flex justify="space-evenly">
      <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" />
  </Card>
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" />
  </Card>
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" />
  </Card>
      </Flex>


    </main>
  );
}
