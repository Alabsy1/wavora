"use client";

import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

export interface EditField {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "image";
  placeholder?: string;
}

interface InlineEditModalProps {
  open: boolean;
  onClose: () => void;
  model: string;
  id: string;
  fields: EditField[];
  values: Record<string, unknown>;
  label?: string;
  onSaved?: () => void;
}

function parseFieldValue(value: unknown, type: EditField["type"]): string {
  if (value === null || value === undefined) return "";
  if (type === "number") return String(value);
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.join(", ");
      return value;
    } catch {
      return value;
    }
  }
  return String(value);
}

function serializeFieldValue(value: string, type: EditField["type"]): unknown {
  if (type === "number") {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
  if (type === "text" || type === "image") return value;
  if (type === "textarea") return value;
  return value;
}

export function InlineEditModal({
  open,
  onClose,
  model,
  id,
  fields,
  values,
  label,
  onSaved,
}: InlineEditModalProps) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      const initial: Record<string, string> = {};
      for (const f of fields) {
        initial[f.key] = parseFieldValue(values[f.key], f.type);
      }
      setForm(initial);
      setError("");
      setSuccess(false);
    }
  }, [open, fields, values]);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);

    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      payload[f.key] = serializeFieldValue(form[f.key], f.type);
    }

    try {
      const res = await fetch("/api/admin/inline-edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, id, data: payload }),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Failed to save");
        return;
      }

      setSuccess(true);
      router.refresh();
      onSaved?.();
      setTimeout(() => {
        onClose();
      }, 600);
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl dark:bg-neutral-900 sm:max-w-md sm:rounded-2xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white/90 px-5 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                  Quick Edit
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {label ?? model}
                </p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex size-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-4">
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                  Saved successfully
                </div>
              )}

              <div className="space-y-4">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={form[f.key] ?? ""}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                      />
                    ) : f.type === "number" ? (
                      <input
                        type="number"
                        value={form[f.key] ?? ""}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[f.key] ?? ""}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving || success}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 disabled:opacity-50 min-h-[48px]"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : success ? (
                  "Saved!"
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
