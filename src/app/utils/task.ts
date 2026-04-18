export function schedulerTask(task: () => void): () => void {
  const timer = setTimeout(() => {
    task()
  }, 0)

  return () => clearTimeout(timer)
}
