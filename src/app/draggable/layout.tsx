import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AntdRegistry>{children}</AntdRegistry>
}
