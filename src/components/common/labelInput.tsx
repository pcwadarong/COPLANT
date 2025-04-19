interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

interface LabeledTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

export function LabeledInput({
  id,
  label,
  error,
  required,
  disabled,
  ...props
}: LabeledInputProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-2">
      <label htmlFor={id} className="w-32 font-medium">
        {label}
        {required && <span className="text-[#ff0000] ml-1">*</span>}
      </label>

      <div className="flex-1">
        <input
          id={id}
          name={id}
          className={`w-full border rounded-lg p-2 text-sm ${
            error ? 'border-red-500' : 'border-stone-400'
          } ${disabled && 'bg-stone-100 cursor-not-allowed text-stone-500'}`}
          {...props}
        />
        {error && <span className="ml-4 text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}

export function LabeledTextarea({
  id,
  label,
  error,
  required,
  ...props
}: LabeledTextareaProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-2">
      <label htmlFor={id} className="w-32 font-medium">
        {label}
        {required && <span className="text-[#ff0000] ml-1">*</span>}
      </label>
      {error && <span className="ml-4 text-sm text-red-600">{error}</span>}
      <div className="flex-1">
        <textarea
          id={id}
          name={id}
          required={required}
          className={`w-full border rounded-lg p-2 text-sm ${
            error ? 'border-red-500' : 'border-stone-400'
          }`}
          {...props}
        />
      </div>
    </div>
  );
}
