import React from 'react'

type Props = {
    children:string
}

const Label = ({children}: Props) => {
  return (
    <lable className="font-medium">{children} :</lable>

  )
}

export default Label