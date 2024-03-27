import Image from "next/image";
import { Button } from "antd"
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="primary">Button</Button>
      </main>
    </Layout>

  );
}
