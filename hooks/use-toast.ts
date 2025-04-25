"use client";

import { useCallback, useState } from "react";

export type ToastVariant = "default" | "destructive";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ variant, title, description, action }: { variant?: ToastVariant; title: string; description?: string; action?: React.ReactNode }) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, variant, title, description, action }]);
    // Optionally remove toast after some time
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return { toasts, toast };
}
