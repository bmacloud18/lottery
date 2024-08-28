import { MouseEventHandler } from 'react';

export default function Button({
    text,
    onClick,
    disabled
}:  {
    text: string
    onClick: MouseEventHandler,
    disabled: boolean
}) {
    
    return (
        <button onClick={onClick} className="border-solid border w-28 h-12 bg-buttonwhite text-white rounded hover:bg-yellow justify-self-end">
          {text}
        </button>
    )
}