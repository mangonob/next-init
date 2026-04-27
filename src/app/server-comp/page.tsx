export default async function ServerComp() {
  const data = await fetchData()

  return <span>Current Time: {data.time}</span>
}

async function fetchData(): Promise<{ time: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ time: new Date().toISOString() })
    }, 300)
  })
}
