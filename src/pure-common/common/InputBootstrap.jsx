import React from 'react'

export default function InputBootstrap({
  id,
  label,
  value,
  onChange,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div id={id + '-container'} className={'input-container ' + className}>
      <div className='form-group'>
        {label && <label htmlFor={id}>{label}</label>}
        <input type={type} className='form-control' {...{ id, value, onChange, ...props }} />
      </div>
    </div>
  )
}
