export function LabeledInput({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  aria,
  error,
}: {
  id: string;
  label: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  aria?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-2">
      <label htmlFor={id} className="w-32 font-medium">
        {label}
        {required && <span className="text-[#ff0000] ml-1">*</span>}
      </label>
      {error && <span className="ml-4 text-sm text-red-600">{error}</span>}
      <div className="flex-1">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-label={aria || label}
          className={`w-full border rounded p-2 ${
            error ? 'border-red-500' : 'border-stone-400'
          }`}
        />
      </div>
    </div>
  );
}

export function LabeledTextarea({
  id,
  label,
  value,
  placeholder,
  onChange,
  required = false,
  aria,
  error,
}: {
  id: string;
  label: string;
  value: string | undefined;
  placeholder?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  aria?: string;
  error?: string;
}) {
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
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          aria-label={aria || label}
          className={`w-full border rounded p-2 ${
            error ? 'border-red-500' : 'border-stone-400'
          }`}
        />
      </div>
    </div>
  );
}
