import React from 'react'
import { t } from '../../pure-common/utils/translation'

const tThis = path => t('home.sections.section_subscription.' + path)

export default function SubscriptionBlock() {
  return (
    <div className='subscription-block'>
      <form action=''>
        <h1>{tThis('label')}</h1>
        <p className='subscription-block-text'>{tThis('text')}</p>
        <input type='email' placeholder='Email' />
        <button>{tThis('subscripbe_button')}</button>
        <div>
          <input type='checkbox' className='checkbox' id='checkbox' />
          <label htmlFor='checkbox'>{tThis('agreement_checkbox_subtitle')}</label>
        </div>
      </form>
    </div>
  )
}
