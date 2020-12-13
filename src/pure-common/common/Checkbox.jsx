import React from 'react'
export default function Checkbox({ onChange, checked, id, className = '', label, ...props }) {
  let classList = 'checkbox-container ' + className

  return (
    <div className={classList} id={id + '-container'}>
      <div className='form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          {...{ id, checked, onChange, ...props }}
        />
        <label className='form-check-label' htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  )
}
