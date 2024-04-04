import Image from "next/image";
import { Inter } from "next/font/google";
import {Button} from 'antd';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex-col items-center justify-between p-24 ${inter.className}`}
    >
    <Button type="primary">Primary Button</Button>
    </main>
  );
}
