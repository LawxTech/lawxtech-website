"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { slideInLeft } from "@/lib/animations";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
      >
        <CheckCircle className="w-16 h-16 text-teal mb-4" />
        <h3 className="text-2xl font-bold text-navy">Message Sent!</h3>
        <p className="mt-3 text-muted-brand max-w-sm">
          Thanks for reaching out. We&apos;ll get back to you at{" "}
          <span className="font-medium">lawxtechseries@gmail.com</span> within
          24–48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={slideInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="Ada"
            className="w-full px-4 py-3 rounded-xl border border-border-brand text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition placeholder-[#9ca3af]"
          />
          {errors.firstName && (
            <p className="mt-1.5 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Obi"
            className="w-full px-4 py-3 rounded-xl border border-border-brand text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition placeholder-[#9ca3af]"
          />
          {errors.lastName && (
            <p className="mt-1.5 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="ada.obi@example.com"
          className="w-full px-4 py-3 rounded-xl border border-border-brand text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition placeholder-[#9ca3af]"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          Phone Number
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+234 800 000 0000"
          className="w-full px-4 py-3 rounded-xl border border-border-brand text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition placeholder-[#9ca3af]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell us how we can help you..."
          className="w-full px-4 py-3 rounded-xl border border-border-brand text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition resize-none placeholder-[#9ca3af]"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </motion.form>
  );
}
