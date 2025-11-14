"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";
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
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Detect theme (including system)
  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;

    if (saved) {
      setTheme(saved);
      if (saved === "dark") document.documentElement.classList.add("dark");
      if (saved === "light") document.documentElement.classList.remove("dark");
      if (saved === "system")
        document.documentElement.classList.toggle(
          "dark",
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    }

    const updateSystem = () => {
      if (theme === "system") {
        document.documentElement.classList.toggle(
          "dark",
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateSystem);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateSystem);
  }, [theme]);

  const applyTheme = useCallback(
    async (next: "light" | "dark" | "system") => {
      if (!buttonRef.current) return;

      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
          localStorage.setItem("theme", next);

          if (next === "dark") {
            document.documentElement.classList.add("dark");
          } else if (next === "light") {
            document.documentElement.classList.remove("dark");
          } else {
            document.documentElement.classList.toggle(
              "dark",
              window.matchMedia("(prefers-color-scheme: dark)").matches
            );
          }
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
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
    [duration]
  );

  const Icon =
    theme === "dark"
      ? Sun
      : theme === "light"
      ? Moon
      : Laptop; // system

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          ref={buttonRef}
          className={cn(
            "p-2 rounded-md border border-border bg-background/40 backdrop-blur-md hover:bg-background/60 transition flex items-center justify-center",
            className
          )}
          {...props}
        >
          <Icon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => applyTheme("light")}>
          <Moon className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyTheme("dark")}>
          <Sun className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => applyTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};