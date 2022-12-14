import React from "react";

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  return ( 
    <input
      className="appearance-none block text-xl rounded w-full text-black py-3 px-4 border-gray-200 focus:outline-none focus:border-gray-500"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}