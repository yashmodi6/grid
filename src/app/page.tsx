"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { ArrowRight } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ThemeToggler";

export default function LandingPlaceholder() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4 overflow-hidden">
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay bg-[url('/grain.png')] bg-repeat" />

      {/* ======= TOP LEFT: THEME TOGGLER (enter first) ======= */}
      <motion.div
        initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute left-4 top-4 z-50">
 <AnimatedThemeToggler className="h-10 w-10 flex items-center justify-center rounded-lg bg-background/40 border border-border/40 backdrop-blur-md hover:bg-background/70 transition shadow-sm" />
      </motion.div>

      {/* ======= TOP RIGHT: DIALOG TRIGGER (enter first) ======= */}
      <motion.div
        initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="absolute right-4 top-4 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-xs md:text-sm px-3 py-1.5 rounded-xl bg-background/40 backdrop-blur-xl border border-border/50 shadow-md hover:bg-background/60 transition">
              why no landing? 😭
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-sm rounded-2xl backdrop-blur-xl bg-background/80 border border-border/50">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">The dramatic truth 😭🔥</DialogTitle>

              <DialogDescription asChild>
                <div className="pt-2 text-sm leading-6 opacity-90 space-y-4">
                  <div>Bro… I haven’t even built the product yet 😭</div>

                  <div>
                    Making some fancy ✨ scammy SaaS landing page ✨ with gradients, blobs,
                    testimonials from “CEOs”, and fake dashboards felt…
                    <span className="font-medium"> ILLEGAL 💀</span>
                  </div>

                  <div>
                    So instead of pretending Grid is a billion-dollar company with “10k happy users
                    😍”, I decided to be
                    <span className="font-medium"> honest & delulu-free 🤝</span>
                  </div>

                  <div>
                    Real landing page will come when Grid actually exists 🙏🔥 For now? vibes only.
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Background glows (same as before) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[650px] h-[650px] rounded-full bg-primary/30 blur-[150px]"
      />
      <motion.div
        initial={{ x: -20, y: -20, opacity: 0.1 }}
        animate={{ x: [-10, 10, -10], y: [0, 20, 0], opacity: 0.2 }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 h-48 w-48 rounded-full bg-primary/10 blur-[100px]"
      />
      <motion.div
        initial={{ x: 20, opacity: 0.1 }}
        animate={{ x: [10, -10, 10], opacity: 0.2 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-10 h-52 w-52 rounded-full bg-primary/10 blur-[100px]"
      />

      {/* ======= HERO TITLE (enter second) ======= */}
      <motion.h1
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-center text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
        Grid is coming soon.
      </motion.h1>

      {/* ======= HERO SUBTEXT (enter second) ======= */}
      <motion.p
        initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="relative z-10 mt-4 max-w-md text-center text-muted-foreground text-base md:text-lg">
        Where clarity meets productivity.
      </motion.p>

      {/* ======= CTA BUTTONS (enter last) ======= */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="relative z-10 mt-10 flex flex-col sm:flex-row gap-4">
        {/* PRIMARY */}
        <Button
          asChild
          className="
            group
            px-10 
            py-5 
            shadow-sm 
            bg-primary
            text-primary-foreground
            hover:bg-primary/90
            transition-colors
            flex items-center gap-2
          ">
          <Link href="/sign-up">
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>

        {/* SECONDARY */}
        <Button
          asChild
          variant="outline"
          className="
            group
            px-10 
            py-5 
            text-base 
            shadow-sm 
            bg-background/40
            border border-border/60
            backdrop-blur-md
            hover:bg-background/60
            transition-colors
            flex items-center gap-2
          ">
          <Link href="/log-in">
            Log In
            <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
