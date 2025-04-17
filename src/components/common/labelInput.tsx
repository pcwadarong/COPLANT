export function LabeledInput({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  aria,
}: {
  id: string;
  label: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  aria?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <label htmlFor={id} className="w-32 font-medium">
        {label}
        {required && <span className="text-[#ff0000] ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={aria || label}
        className="flex-1 border rounded p-2 border-gray-400"
      />
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
}: {
  id: string;
  label: string;
  value: string | undefined;
  placeholder?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  aria?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-2">
      <label htmlFor={id} className="w-32 font-medium">
        {label}
        {required && <span className="text-[#ff0000] ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        aria-label={aria || label}
        className="flex-1 border rounded p-2 border-gray-400"
      />
    </div>
  );
}
