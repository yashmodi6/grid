import Link from "next/link";
import {Button} from "@/shared/ui/button";

export default function LandingPage() {
  return (
    <div className="from-background via-background/40 to-background/10 flex min-h-svh flex-col items-center justify-center bg-gradient-to-b px-6 py-16">
      {/* Logo + Name */}
      <div className="mb-12 flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Grid</h1>
        <p className="text-muted-foreground max-w-sm text-center text-sm">
          A simple and structured way to plan chapters, set goals, track study sessions, and build
          smarter habits — all in one place.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild className="px-10 py-5 text-base">
          <Link href="/login">Login</Link>
        </Button>

        <Button asChild variant="outline" className="px-10 py-5 text-base">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
