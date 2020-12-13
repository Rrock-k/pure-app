import React from 'react'

export default function SelectInput({
  id = Math.random(),
  label,
  value,
  options,
  className,
  defaultValue = 'Не выбрано',
  ...props
}) {
  const selectProps = value ? { ...props, id, value } : { ...props, id, defaultValue }

  return (
    <div id={id + '-container'} className={`select-container ${className}`}>
      <div className='form-group'>
        <label htmlFor={id}>{label}</label>
        <select className='form-control custom-select' {...selectProps}>
          {!props.multiple && <option value=''>{defaultValue}</option>}
          {options?.map(item => {
            return (
              <option key={item.value || item} value={item.value || item}>
                {item.name || item}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
