export default function Input({
  register,
  className,
  errorMessage,
  name,
  rules,
  type = 'text',
  placeholder
}: any) {
  return (
    <>
      <input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className={className}
      />
      <p className="text-red-600 mt-2">{errorMessage}</p>
    </>
  );
}
