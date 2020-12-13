import React from 'react'

export default function Textarea({ id, label, rows = 2, value, onChange }) {
  return (
    <div id={id + '-container'}>
      <div className='form-group'>
        <label htmlFor={id}> {label}</label>
        <textarea
          type='text'
          className='form-control'
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
