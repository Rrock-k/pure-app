import React from 'react'

export default function FileInput({
  id,
  accept = 'image/png, image/jpeg',
  onChange,
  label,
  className,
  inputRef,
  ...props
}) {
  return (
    <div className={className} id={id}>
      <div className='custom-file'>
        <input
          type='file'
          className='custom-file-input'
          {...{ id, accept, onChange, ref: inputRef, ...props }}
        />
        <label className='custom-file-label' htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  )
}
