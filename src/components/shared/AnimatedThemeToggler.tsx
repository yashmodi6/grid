"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  menuAlign?: "start" | "end" | "center";
}

export const AnimatedThemeToggler = ({
  menuAlign = "start",
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();

  /**
   * Prevent hydration issues:
   * Using RAF avoids synchronous setState warnings from eslint.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /**
   * Apply animated view-transition theme change
   */
  const applyTheme = useCallback(
    async (next: "light" | "dark" | "system") => {
      if (!buttonRef.current) return;

      await document.startViewTransition(() => {
        flushSync(() => setTheme(next));
      }).ready;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const maxRadius = Math.hypot(
        Math.max(rect.left, window.innerWidth - rect.left),
        Math.max(rect.top, window.innerHeight - rect.top)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    },
    [duration, setTheme]
  );

  /**
   * Safe icon (only after mount to avoid SSR mismatch)
   */
  const Icon = mounted
    ? theme === "light"
      ? Sun
      : theme === "dark"
      ? Moon
      : Laptop
    : Laptop;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          ref={buttonRef}
          className={cn(
            "flex items-center justify-center rounded-md p-2",
            "border border-border/60 bg-background/40 backdrop-blur-md",
            "hover:bg-accent hover:text-accent-foreground transition-colors duration-150",
            "active:scale-[0.96]",
            className
          )}
          {...props}
        >
          <Icon className="h-4 w-4 transition-all duration-300" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={menuAlign}
        className="w-40 rounded-lg border border-border/40 bg-popover shadow-xl"
      >
        <DropdownMenuLabel className="text-muted-foreground">
          Theme
        </DropdownMenuLabel>

        <DropdownMenuItem onClick={() => applyTheme("light")}>
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};