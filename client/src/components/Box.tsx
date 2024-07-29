import React, { Children } from "react";

type Props = {
  onClick: (num: number) => void;
  boxNumber: number;
  children : number;
  middle?:boolean
};

const Box = ({ onClick, boxNumber, children ,middle}: Props) => {
   
  return (
    <div
      onClick={(e) => onClick(boxNumber)}
      className={`h-10 w-10  cursor-pointer  flex justify-center items-center
        ${middle && "border-b-2 border-t-2 border-red-400"}
        ${ [2,5,8].includes(boxNumber) && "border-l-2 border-r-2 border-red-400"}
        `}
    >
        {children}
    </div>
  );
};

export default Box;
