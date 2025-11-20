import Link from "next/link";
import { GridLogo } from "@/components/icons/GridLogo";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AnimatedThemeToggler } from "@/components/shared/theme/AnimatedThemeToggler";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
      {/* Top-left logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2 font-semibold">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
            <GridLogo className="size-5" />
          </div>
          <span className="text-xl">Grid</span>
        </Link>
      </div>

      {/* Form container — no card UI */}
      <div className="-mt-20 w-full max-w-sm">
        <LoginForm />
      </div>

      {/* FAB Theme Toggler */}
      <div className="fixed right-6 bottom-6">
        <AnimatedThemeToggler
          menuAlign="end"
          className="border-border/50 bg-background/80 flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition outline-none focus-visible:outline-none active:scale-95 dark:shadow-[0_4px_25px_rgba(255,255,255,0.18)]"
        />
      </div>
    </div>
  );
}
