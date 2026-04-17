"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
              PF
            </span>
            <span className="text-sm font-semibold tracking-wide">PageForge</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            <a href="#about" className="transition hover:text-zinc-900">About</a>
            <a href="#services" className="transition hover:text-zinc-900">Services</a>
            <a href="#contact" className="transition hover:text-zinc-900">Contact</a>
            <a href="#faq" className="transition hover:text-zinc-900">FAQs</a>
          </nav>
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Launch App
          </Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 sm:px-10 md:grid-cols-2">
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <motion.p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600" variants={fadeUp}>
            Modern Page Building
          </motion.p>
          <motion.h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl" variants={fadeUp}>
            Design polished web pages visually, then export production-ready layouts.
          </motion.h1>
          <motion.p className="max-w-xl text-base leading-7 text-zinc-600" variants={fadeUp}>
            PageForge helps teams build sections quickly with drag-and-drop controls, inline editing, and
            precise property controls. Prototype and ship faster with a tool built for clarity and speed.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Start Building
            </Link>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-sm"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          variants={fadeUp}
        >
          <div className="space-y-3">
            <p className="text-sm font-semibold text-zinc-900">Why teams choose PageForge</p>
            {[
              "Visual editing with precise alignment controls",
              "Live inline text and style adjustments",
              "JSON and JSX export for real project handoff",
              "Persistent local autosave for uninterrupted work",
            ].map((point) => (
              <motion.div
                key={point}
                className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35 }}
              >
                {point}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="about" className="border-y border-zinc-200 bg-zinc-50/70">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">About</h2>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
            PageForge is built for founders, designers, and developers who need a faster way to draft,
            review, and hand off page structures. It combines intuitive interactions with professional output,
            making it easy to move from idea to implementation.
          </p>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">Services</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Rapid Prototyping",
              text: "Build wireframes and production-style sections in minutes.",
            },
            {
              title: "Design Consistency",
              text: "Apply spacing, sizing, and typography controls with precision.",
            },
            {
              title: "Developer Handoff",
              text: "Export clean JSON and JSX layouts ready for integration.",
            },
          ].map((service, idx) => (
            <motion.article
              key={service.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <h3 className="text-lg font-semibold text-zinc-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{service.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="border-y border-zinc-200 bg-zinc-50/70">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">Contact</h2>
          <p className="mt-4 max-w-2xl text-zinc-600">
            Need a custom workflow, team onboarding, or an enterprise rollout? Reach out and we will help
            you tailor PageForge to your product and process.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:hello@pageforge.app"
              className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              hello@pageforge.app
            </a>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Try the Builder
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">FAQs</h2>
        <div className="mt-8 space-y-4">
          {[
            {
              q: "Is PageForge code-friendly?",
              a: "Yes. You can export layouts in JSX and continue development in your existing stack.",
            },
            {
              q: "Can I save my work?",
              a: "Yes. Layouts can be saved locally so progress is preserved across sessions.",
            },
            {
              q: "Who is this for?",
              a: "PageForge is ideal for startups, agencies, and product teams building fast UI iterations.",
            },
          ].map((item, idx) => (
            <motion.article
              key={item.q}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
            >
              <h3 className="text-base font-semibold text-zinc-900">{item.q}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.a}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} PageForge. All rights reserved.</p>
          <p>Single-page product experience for modern teams.</p>
        </div>
      </footer>
      </main>
  );
}
