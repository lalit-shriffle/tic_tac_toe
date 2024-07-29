import React from 'react'

type Props = {
    msg:string | undefined
}

const ErrorFeedback = ({msg}: Props) => {
  return (<>
    {msg && <span className="text-red-400">{msg}</span>}
  </>
  )
}

export default ErrorFeedback