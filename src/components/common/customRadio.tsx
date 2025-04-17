'use client';

import { clsx } from 'clsx';

interface CustomRadioProps {
  id: string;
  name: string;
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

const CustomRadio: React.FC<CustomRadioProps> = ({
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
        type="radio"
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
        className="flex items-center justify-center rounded-full"
        role="radio"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        tabIndex={0}
      >
        {checked && (
          <div
            style={{ backgroundColor: borderCheckedColor }}
            className="w-2 h-2 rounded-full"
          />
        )}
      </div>

      <span id={`${id}-label`} className={clsx(labelSize, 'font-medium')}>
        {label}
      </span>
    </label>
  );
};

export default CustomRadio;
