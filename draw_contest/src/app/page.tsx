import Canvas from '../../components/Canvas';

export default function Home() {
  return (
    <main className = "flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Draw Something!</h1>
        <Canvas />
      </div>
    </main>
  )
}

