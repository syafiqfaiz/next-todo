const Button = ({label, color, type, customClass, disabled, loading, onClick}) => {
  let colorClass;
  switch(color) {
    case 'green':
      colorClass = "hover:text-white text-green-500 border-green-500 hover:bg-green-500"
      break;
    case 'red':
      colorClass = "hover:text-white text-red-500 border-red-500 hover:bg-red-500 "
      break;
    case 'teal':
      colorClass = "hover:text-white text-teal-500 border-teal-500 hover:bg-teal-500 "
      break;
    default:
      colorClass = "hover:text-white text-gray-500 border-grsy-500 hover:bg-gray-500"
  }
  return (
    <button
      className={`flex-no-shrink p-2 border-2 rounded ${colorClass} ${customClass} disabled:opacity-75 disabled:cursor-not-allowed w-24`}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Loading' : label}
    </button>
  )
}

export default Button
