import { PropsWithChildren } from 'react'

export default function PostLayout({ children }: PropsWithChildren) {
  console.info('Rerendering PostLayout')

  return (
    <div>
      <header>
        <h1>Nav header</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}
