'use client';

import { clsx } from 'clsx';

interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  borderColor?: string;
  borderCheckedColor?: string;
  borderWidth?: number;
  bgColor?: string;
  bgCheckedColor?: string;
  labelSize?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  checked = false,
  onChange,
  className = '',
  borderColor = 'gray',
  borderCheckedColor = 'black',
  borderWidth = 2,
  bgColor = 'transparent',
  bgCheckedColor = 'transparent',
  labelSize = 'text-sm',
  disabled,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'flex items-center gap-2 cursor-pointer select-none',
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        aria-checked={checked}
        aria-disabled={disabled}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <div
        style={{
          borderColor: checked ? borderCheckedColor : borderColor,
          borderWidth,
          backgroundColor: checked ? bgCheckedColor : bgColor,
        }}
        className="flex items-center justify-center rounded-sm w-5 h-5"
        role="checkbox"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        tabIndex={0}
      >
        {checked && (
          <svg
            style={{ color: borderCheckedColor }}
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <span id={`${id}-label`} className={clsx(labelSize, 'font-medium')}>
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;
