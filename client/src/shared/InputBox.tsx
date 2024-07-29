import React from "react";

type Props = {
  children: React.ReactNode;
};

const InputBox = ({ children }: Props) => {
  return <div className="flex flex-col  items-start w-full">{children}</div>;
};

export default InputBox;
