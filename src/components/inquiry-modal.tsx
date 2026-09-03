"use client";

import { useState } from "react";
import { X, MessageCircle, Calendar, Users, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  tripType?: string;
  tripTitle?: string;
  tripId?: string;
  summary?: string;
}

export function InquiryModal({ open, onClose, tripType, tripTitle, tripId, summary }: InquiryModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    whatsapp: "",
    date: "",
    adults: 1,
    kids: 0,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tripType,
          tripId,
          tripTitle,
          notes: summary ? (form.notes ? `${summary}\n\n${form.notes}` : summary) : form.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to submit");
        return;
      }

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
      onClose();
      setForm({ fullName: "", whatsapp: "", date: "", adults: 1, kids: 0, notes: "" });
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-h-[92vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-neutral-900 sm:max-w-lg sm:rounded-2xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white/90 px-5 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 sm:px-6">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white sm:text-lg">Plan Your Trip</h2>
                {tripTitle && (
                  <p className="mt-0.5 text-xs text-teal-600 dark:text-teal-400 font-medium sm:text-sm">{tripTitle}</p>
                )}
                {tripType && !tripTitle && (
                  <p className="mt-0.5 text-xs text-teal-600 dark:text-teal-400 font-medium sm:text-sm">{tripType.replace(/_/g, " ")}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="inline-flex size-10 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-4 sm:px-6">
              {summary && (
                <div className="mb-4 rounded-lg bg-teal-50 px-3 py-2.5 text-xs text-teal-700 dark:bg-teal-950/30 dark:text-teal-300 sm:text-sm">
                  {summary}
                </div>
              )}
              <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                Fill in the details and we&apos;ll connect via WhatsApp instantly.
              </p>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name *</label>
                  <input type="text" required value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Your full name" className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Number *
                  </label>
                  <input type="tel" required value={form.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} placeholder="+20 1XX XXX XXXX" className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    <Calendar className="h-3.5 w-3.5" /> Preferred Date *
                  </label>
                  <input type="date" required value={form.date} onChange={(e) => updateField("date", e.target.value)} className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <Users className="h-3.5 w-3.5" /> Adults
                    </label>
                    <input type="number" min={1} max={50} value={form.adults} onChange={(e) => updateField("adults", parseInt(e.target.value) || 1)} className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
                  </div>
                  <div>
                    <label className="mb-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">Kids</label>
                    <input type="number" min={0} max={50} value={form.kids} onChange={(e) => updateField("kids", parseInt(e.target.value) || 0)} className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Special Requests</label>
                  <textarea rows={2} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Any preferences or requests..." className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all hover:from-green-600 hover:to-green-700 disabled:opacity-50 min-h-[48px]"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
