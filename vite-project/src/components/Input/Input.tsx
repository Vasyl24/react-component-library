import { useState } from 'react';
import styles from './Input.module.css';

export type InputType = 'text' | 'password' | 'number';

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  id?: string;
  name?: string;
};

export function Input({ value, onChange, type = 'text', placeholder, label, disabled = false, clearable = false, id, name }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  function handleClear() {
    onChange('');
  }

  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.inputRow}>
        <input
          id={id}
          name={name}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={effectiveType}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={label ?? placeholder ?? 'input'}
        />
        <div className={styles.controls}>
          {clearable && value.length > 0 && !disabled && (
            <button type="button" className={styles.iconButton} onClick={handleClear} aria-label="Clear input">
              ✕
            </button>
          )}

          {isPassword && (
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          )}
        </div>
      </div>
    </label>
  );
}
