import React from 'react'
import { useState } from 'react'
import { subscribeUser } from 'pure-common/utils/apiQueries'
import { t } from 'pure-common/utils/translation'

import './styles/Subscription.css'

const tThis = path => t('home.sections.section_subscription.' + path)

export default function SubscriptionBlock() {
  const [emailSubscribed, setSubscribed] = useState(localStorage.getItem('emailSubscribed'))
  const [email, setEmail] = useState('')
  const [agreement, setAgreement] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!agreement)
      return setError('Для подписки необходимо дать согласие на обработку персональных данных')
    subscribeUser(email)
      .then(() => {
        localStorage.setItem('emailSubscribed', email)
        setSubscribed(email)
        setEmail('')
        setError('')
        setAgreement(v => {
          const nextState = !v
          return nextState
        })
      })
      .catch(err => setError(err.response?.data))
  }

  if (emailSubscribed)
    return (
      <div className='subscription-block subscribed'>
        <p>Подписка на новости успешно осуществлена для электронного адреса</p>
        <strong>
          <p>{emailSubscribed}</p>
        </strong>
        <button className='btn btn-link' onClick={() => setSubscribed('')}>
          Добавить подписку
        </button>
      </div>
    )

  return (
    <div className='subscription-block'>
      <form action='submit' onSubmit={handleSubmit}>
        <h1>{tThis('label')}</h1>
        <p className='subscription-block-text'>{tThis('text')}</p>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
        {error && <label className='error-label'>{tThis(error)}</label>}
        <button className='btn-subscribe'>{tThis('subscribe_button')}</button>
        <div>
          <input
            checked={agreement}
            onChange={() => setAgreement(!agreement)}
            type='checkbox'
            className='checkbox'
            id='checkbox'
          />
          <label htmlFor='checkbox'>{tThis('agreement_checkbox_subtitle')}</label>
        </div>
      </form>
    </div>
  )
}
