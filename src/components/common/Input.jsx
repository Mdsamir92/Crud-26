const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) => {
    
  return (
    <div className="flex flex-col gap-1">
      {/* LABEL */}
      <label className="font-medium text-gray-700">{label}</label>

      {/* INPUT */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          border
          rounded-lg
          px-4
          py-3
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:ring-2 focus:ring-blue-300"
          }

          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />

      {/* ERROR */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
