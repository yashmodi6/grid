import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-6 px-6 py-12 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Welcome to <span className="text-primary">Grid</span>
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          Your personal productivity and learning workspace.
          The journey starts right here—today is a great day to build something meaningful.
        </p>

        <Button className="mt-4" size="lg">
          Let’s get started
        </Button>
      </div>
    </main>
  )
}