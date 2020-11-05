import React from 'react'
import { t } from '../../pure-common/utils/translation'

const tThis = path => t('home.sections.section_subscription.' + path)

export default function SubscriptionBlock() {
  return (
    <div className='subscription-block'>
      <form action=''>
        <label>{tThis('label')}</label>
        <input type='email' placeholder='Email' />
        <button>{tThis('subscripbe_button')}</button>
        <span>
          <input type='checkbox' className='checkbox' />
          <p>{tThis('agreement_checkbox_subtitle')}</p>
        </span>
      </form>
    </div>
  )
}
