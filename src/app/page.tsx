"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";

// Buttons now visually wider using w-[14rem] and internal centering

export default function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center bg-background text-foreground transition-colors">
      <Navbar />

      {/* Decorative Borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-border" />
      <div className="absolute inset-y-0 right-0 h-full w-px bg-border" />
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-border" />

      {/* CONTENT */}
      <div className="px-4 py-10 md:py-20 ">
        <BackgroundRippleEffect />

        <h1 className="relative z-10 mx-auto max-w-3xl text-center text-2xl font-bold md:text-4xl lg:text-5xl text-foreground">
          {"Grid — Focus. Learn. Achieve.".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08, ease: "easeInOut" }}
              className="mr-2 inline-block">
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-base md:text-lg text-muted-foreground">
          Your student hub for notes, tasks and reminders.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Primary Button */}
          <Button
            asChild
            variant="default"
            className="w-[14rem] min-h-[52px] px-10 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-3 group leading-none
            transition-all duration-300 border border-primary shadow-sm hover:bg-primary/80">
            <Link href="/sign-up" className="flex items-center gap-3">
              Get Started
              <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-[4px]" />
            </Link>
          </Button>

          {/* Secondary Button */}
          <Button
            asChild
            variant="outline"
            className="w-[14rem] min-h-[52px] px-10 py-3 rounded-lg border border-foreground/20 text-foreground font-semibold flex items-center justify-center gap-3 group leading-none backdrop-blur-sm
            transition-all duration-300 hover:bg-foreground/10">
            <Link href="#explore" className="flex items-center gap-3">
              Explore
              <Sparkles className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-[4px]" />
            </Link>
          </Button>
        </motion.div>

        {/* PRODUCT MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="relative z-10 mt-20 rounded-3xl border border-border bg-card p-4 shadow-md transition-colors">
          <div className=" max-w-6xl w-full overflow-hidden rounded-xl border border-border">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Grid preview"
              className="aspect-[16/9] h-full w-full object-cover"
              width={1000}
              height={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { resolvedTheme } = useTheme();

  const src =
    resolvedTheme === "light"
      ? "/logo/logo-light.svg"
      : resolvedTheme === "dark"
      ? "/logo/logo-dark.svg"
      : "/logo/logo-dark.svg";

  return (
    <nav className="z-[99] flex w-full items-center justify-between border-t border-border px-4 py-4 bg-background/10 backdrop-blur-[10px] text-foreground transition-colors">
      <div className="flex items-center gap-3">
        <Image src={src} alt="Grid Logo" width={28} height={28} className="object-contain" />
        <h1 className="text-base font-bold md:text-xl">Grid</h1>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="#features" className="hover:text-muted-foreground transition">
          Features
        </Link>
        <Link href="#pricing" className="hover:text-muted-foreground transition">
          Pricing
        </Link>
        <Link href="#faqs" className="hover:text-muted-foreground transition">
          FAQs
        </Link>
      </div>

      <Button
        asChild
        className="min-h-[40px] px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/80">
        <Link href="/log-in">Login</Link>
      </Button>
    </nav>
  );
};
