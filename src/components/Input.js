const Input = ({label, registerConstructor, error, type, placeholder, inputName, defaultValue}) => (
  <>
    <label>{label}</label>
    <input
      {...registerConstructor}
      className={`p-2 rounded border-2  w-full ${error ? 'border-red-400' : 'border-gray-200'} `}
      placeholder={placeholder}
      type={type|| 'text'}
      defaultValue={defaultValue}
    />
    {error && <span className='text-red-400'>{label || inputName} is required</span>}
  </>
)

export default Input
