import React, { Children } from "react";

type Props = {
  onClick: (e:React.MouseEvent<HTMLElement>) => void;
  children: string;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-black p-2 border-none text-white rounded font-semibold"
    >
      {children}
    </button>
  );
};

export default Button;
