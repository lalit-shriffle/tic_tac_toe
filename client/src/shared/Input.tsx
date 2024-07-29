import React from "react";

type Props = {
    value: string;
    type: string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
};

const Input = ({type,value,onChange}: Props) => {
  return (
      <input
        onChange={onChange}
        value={value}
        type={type}
        className="border border-gray-300 rounded outline-none p-2 shadow-sm w-full"
      />
  );
};

export default Input;
