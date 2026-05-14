const Button = ({
  title,
  type = "submit",
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  // BUTTON COLORS
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",

    danger: "bg-red-500 hover:bg-red-600 text-white",

    success: "bg-green-500 hover:bg-green-600 text-white",

    secondary: "bg-gray-300 hover:bg-gray-400 text-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        px-5
        py-2
        rounded-lg
        font-medium
        font-serif
        transition-all
        duration-200
        cursor-pointer

        ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}

        ${variants[variant]}

        ${className}
      `}
    >
      {loading ? "Loading..." : title}
    </button>
  );
};

export default Button;
