import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  className?: string;
}

export default function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      className={`w-full focus:outline-none py-2 flex items-center justify-between rounded-md h-[44px] focus:border-gray-400/40 focus:bg-[#171717] transition-all duration-400 bg-[#121212] border-[1px] border-gray-500/20 px-3 ${className}`}
      type={type}
      {...props}
    />
  );
}
