const Button = ({ label, onClick, type = "button", full = false }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition-all ${
          full ? "w-full" : ""
        }`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  