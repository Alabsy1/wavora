"use client";

import { useState, type ReactNode } from "react";
import { Pencil } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { InlineEditModal, type EditField } from "./inline-edit-modal";

interface AdminEditOverlayProps {
  model: string;
  id: string;
  fields: EditField[];
  values: Record<string, unknown>;
  label?: string;
  children: ReactNode;
  onSaved?: () => void;
}

export function AdminEditOverlay({
  model,
  id,
  fields,
  values,
  label,
  children,
  onSaved,
}: AdminEditOverlayProps) {
  const { isAdmin, loading } = useAdminAuth();
  const [open, setOpen] = useState(false);

  if (loading || !isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="group/edit relative">
      {children}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="absolute -top-2 -right-2 z-30 flex size-8 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 opacity-0 group-hover/edit:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hover:bg-teal-600 hover:scale-110"
        aria-label={`Edit ${label ?? model}`}
      >
        <Pencil className="size-3.5" />
      </button>
      <InlineEditModal
        open={open}
        onClose={() => setOpen(false)}
        model={model}
        id={id}
        fields={fields}
        values={values}
        label={label}
        onSaved={onSaved}
      />
    </div>
  );
}
