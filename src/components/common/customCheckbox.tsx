'use client';

import { clsx } from 'clsx';

interface CustomCheckboxProps {
  id: string;
  name?: string;
  value?: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  width?: number;
  height?: number;
  borderColor?: string;
  borderCheckedColor?: string;
  borderWidth?: number;
  bgColor?: string;
  bgCheckedColor?: string;
  labelSize?: string;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  className = '',
  width = 20,
  height = 20,
  borderColor = 'gray',
  borderCheckedColor = 'black',
  borderWidth = 2,
  bgColor = 'transparent',
  bgCheckedColor = 'transparent',
  labelSize = 'text-sm',
  disabled = false,
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
        name={name}
        value={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
        aria-checked={checked}
        aria-disabled={disabled}
      />
      <div
        style={{
          borderColor: checked ? borderCheckedColor : borderColor,
          borderWidth,
          backgroundColor: checked ? bgCheckedColor : bgColor,
          width,
          height,
        }}
        className="flex items-center justify-center rounded-sm"
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
