"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/utils/cn";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  // ✅ Initialize theme from localStorage (no effect needed)
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;

    return saved ?? "system";
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  // ✅ Effect ONLY syncs external system (DOM + listeners)
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    const updateSystem = () => {
      if (theme === "system") {
        root.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    };

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", updateSystem);

    return () => mql.removeEventListener("change", updateSystem);
  }, [theme]);

  const applyTheme = useCallback(
    async (next: "light" | "dark" | "system") => {
      if (!buttonRef.current) return;

      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
          localStorage.setItem("theme", next);
        });
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
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
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

  const Icon = theme === "dark" ? Sun : theme === "light" ? Moon : Laptop;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          ref={buttonRef}
          className={cn(
            "border-border bg-background/40 hover:bg-background/60 flex items-center justify-center rounded-md border p-2 backdrop-blur-md transition",
            className
          )}
          {...props}>
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
