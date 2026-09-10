"use client";

import { Pencil } from "lucide-react";
import { useEditMode } from "./admin-edit-provider";

export function AdminControlBar() {
  const { isAdmin, editMode, toggleEditMode } = useEditMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[150] -translate-x-1/2 sm:bottom-8">
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-2.5 shadow-xl shadow-black/10 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900/90 dark:shadow-black/30">
        <div className="flex items-center gap-2">
          <Pencil className="size-4 text-teal-600 dark:text-teal-400" />
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Edit Mode
          </span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={editMode}
          onClick={toggleEditMode}
          className={`relative inline-flex size-7 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
            editMode
              ? "bg-teal-600 dark:bg-teal-500"
              : "bg-neutral-300 dark:bg-neutral-600"
          }`}
        >
          <span
            className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
              editMode ? "translate-x-3.5" : "translate-x-0.5"
            }`}
          />
        </button>

        {editMode && (
          <span className="hidden text-xs font-medium text-teal-600 dark:text-teal-400 sm:inline">
            Active
          </span>
        )}
      </div>
    </div>
  );
}
