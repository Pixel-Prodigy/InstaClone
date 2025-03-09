export default function ErrorMessage({
  message,
  className,
  ...props
}: {
  message: string | undefined;
  className?: string;
  [key: string]: any;
}) {
  return (
    <p
      className={`text-red-700 mt-1 flex items-center justify-center text-lg w-full ${className}`}
      {...props}
    >
      {message}!
    </p>
  );
}
