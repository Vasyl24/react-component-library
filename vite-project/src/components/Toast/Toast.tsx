import React, { useEffect, useRef, useState } from 'react';

export type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
};

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose, closable = false }) => {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  const rafRef = useRef<number | null>(null);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ANIM_MS = 300;

  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => setMounted(true));

    autoCloseTimerRef.current = setTimeout(() => {
      setClosing(true);

      finishCloseTimerRef.current = setTimeout(() => {
        onClose?.();
      }, ANIM_MS);
    }, duration);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      if (finishCloseTimerRef.current) clearTimeout(finishCloseTimerRef.current);
    };
  }, [duration, onClose]);

  function handleManualClose() {
    if (closing) return;

    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setClosing(true);

    finishCloseTimerRef.current = setTimeout(() => {
      onClose?.();
    }, ANIM_MS);
  }

  const bgColor = type === 'success' ? '#2e7d32' : type === 'error' ? '#c62828' : type === 'warning' ? '#ff8f00' : '#1565c0';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        maxWidth: 360,
        padding: '12px 14px',
        borderRadius: 8,
        background: bgColor,
        color: 'white',
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,

        opacity: closing ? 0 : mounted ? 1 : 0,
        transform: closing ? 'translateX(40px)' : mounted ? 'translateX(0)' : 'translateX(40px)',
        transition: `opacity ${ANIM_MS}ms ease, transform ${ANIM_MS}ms ease`,
        zIndex: 9999,
      }}
    >
      <div style={{ flex: 1, fontSize: 14, lineHeight: 1.25 }}>{message}</div>

      {closable && (
        <button
          onClick={handleManualClose}
          aria-label="Close toast"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: 16,
            padding: 6,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
