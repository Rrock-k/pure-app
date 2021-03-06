import React from 'react'
import { Link } from 'react-router-dom'
import SelectInput from 'pure-common/common/SelectInput'
import { contexts } from 'config/contexts'

export default function Variation({ product, index, selected, setSelected }) {
  const { language } = contexts.useLanguageContext()

  const variation = product.variations[index]
  const { options, url } = variation

  let summary, details, urlName, name, onlyOptionNameIfAny
  if (language === 'ru') {
    name = variation.name
    summary = variation.summary
    details = variation.details
    urlName = variation.urlName
    onlyOptionNameIfAny = options.length === 1 ? options[0].optionName : null
  } else {
    name = variation.nameEn
    summary = variation.summaryEn
    details = variation.detailsEn
    urlName = variation.urlNameEn
    onlyOptionNameIfAny = options.length === 1 ? options[0].optionNameEn : null
  }

  const header =
    options.length > 1 ? (
      <>
        <p className='variation-label uppercase'>{name}</p>
        <SelectInput
          value={options[selected]?.optionName || ''}
          label={''}
          options={options.map(({ optionName }) => optionName)}
          defaultValue='Выберите опцию'
          if={`variation-${index}-select`}
          className='variation-select'
          onChange={({ target: { value } }) => {
            let selectedIndex = null
            options.forEach((option, i) =>
              option.optionName === value ? (selectedIndex = i) : void 0
            )
            setSelected(selectedIndex)
          }}
        />
      </>
    ) : (
      <p className='variation-label'>
        <span className='uppercase'>{name}</span>
        {onlyOptionNameIfAny && <span>: {onlyOptionNameIfAny}</span>}
      </p>
    )

  return (
    <div className='product-info-variation'>
      {header}
      {variation.summary && (
        <details>
          <summary className='product-info-variation-summary'>
            {variation.summary && <span>{summary}</span>}
          </summary>
          {variation.details && <p className='product-info-variation-details-text'>{details}</p>}
          {variation.url && (
            <Link className='product-info-variation-details-url btn-black uppercase' to={url}>
              {urlName}
            </Link>
          )}
        </details>
      )}
    </div>
  )
}
