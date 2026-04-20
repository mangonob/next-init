import { redirect } from 'next/navigation'

export type RedirectProps = {
  target: string
  allow?: boolean
}

export default function Redirect({ target, allow = true }: RedirectProps) {
  if (allow && target) {
    redirect(target)
  }

  return <></>
}
