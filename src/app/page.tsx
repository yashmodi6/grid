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
import { AnimatedThemeToggler } from "@/components/shared/theme/ThemeToggler";

export default function LandingPlaceholder() {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[url('/grain.png')] bg-repeat opacity-[0.12] mix-blend-overlay" />

      {/* ======= TOP LEFT: THEME TOGGLER (enter first) ======= */}
      <motion.div
        initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-4 left-4 z-50">
        <AnimatedThemeToggler className="bg-background/40 border-border/40 hover:bg-background/70 flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm backdrop-blur-md transition" />
      </motion.div>

      {/* ======= TOP RIGHT: DIALOG TRIGGER (enter first) ======= */}
      <motion.div
        initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="absolute top-4 right-4 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-background/40 border-border/50 hover:bg-background/60 rounded-xl border px-3 py-1.5 text-xs shadow-md backdrop-blur-xl transition md:text-sm">
              why no landing? 😭
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-background/80 border-border/50 max-w-sm rounded-2xl border backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">The dramatic truth 😭🔥</DialogTitle>

              <DialogDescription asChild>
                <div className="space-y-4 pt-2 text-sm leading-6 opacity-90">
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
        className="bg-primary/30 absolute h-[650px] w-[650px] rounded-full blur-[150px]"
      />
      <motion.div
        initial={{ x: -20, y: -20, opacity: 0.1 }}
        animate={{ x: [-10, 10, -10], y: [0, 20, 0], opacity: 0.2 }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="bg-primary/10 absolute top-32 left-10 h-48 w-48 rounded-full blur-[100px]"
      />
      <motion.div
        initial={{ x: 20, opacity: 0.1 }}
        animate={{ x: [10, -10, 10], opacity: 0.2 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="bg-primary/10 absolute right-10 bottom-32 h-52 w-52 rounded-full blur-[100px]"
      />

      {/* ======= HERO TITLE (enter second) ======= */}
      <motion.h1
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="from-foreground to-foreground/60 relative z-10 bg-gradient-to-br bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
        Grid is coming soon.
      </motion.h1>

      {/* ======= HERO SUBTEXT (enter second) ======= */}
      <motion.p
        initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-muted-foreground relative z-10 mt-4 max-w-md text-center text-base md:text-lg">
        Where clarity meets productivity.
      </motion.p>

      {/* ======= CTA BUTTONS (enter last) ======= */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row">
        {/* PRIMARY */}
        <Button
          asChild
          className="group bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 px-10 py-5 shadow-sm transition-colors">
          <Link href="/signup">
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>

        {/* SECONDARY */}
        <Button
          asChild
          variant="outline"
          className="group bg-background/40 border-border/60 hover:bg-background/60 flex items-center gap-2 border px-10 py-5 text-base shadow-sm backdrop-blur-md transition-colors">
          <Link href="/login">
            Log In
            <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
