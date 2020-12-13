import React from 'react'

export default function Input({ name, value, onChange, type = 'text' }) {
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input {...{ id: name, type, name, value, onChange }} className='form-control' />
    </>
  )
}
