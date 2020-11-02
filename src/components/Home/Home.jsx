import React, { useEffect } from 'react'

import aboutImg from '../../assets/images/sections/clothes.png'

import MainSlider from '../MainSlider'
import InstagramSection from '../InstagramSlider'
import Sections from './Sections'

export default function Home() {
  useEffect(() => {
    console.log('Home did mount')

    return () => {
      console.log('Home did unmount')
    }
  })

  return (
    <>
      <MainSlider />
      <Test />
    </>
  )
}

class Test extends React.Component {
  componentDidMount() {
    console.log('Test mounted')
  }
  componentWillUnmount() {
    console.log('Test unmounted')
  }

  render() {
    console.log('Test rendered')
    return (
      <>
        <Sections />

        <InstagramSection />

        <div className='about'>
          <img src={aboutImg} alt='раздел о нас' className='section-img' />
          <div className='about-text-container'>
            <h3>О нас</h3>

            <p>
              ла ла ла все такое все и еще всякое много чего разного и всяческого рзнообразногоё
            </p>
            <p>Всяческого рзнообразного вдзз сяческого рзнообразного</p>
          </div>
        </div>

        <div className='subscription-block'>
          <form action=''>
            <label>Подпишись на нашу рассылку</label>
            <input type='email' placeholder='Email' />
            <button>Подписаться</button>
            <span>
              <input type='checkbox' className='checkbox' />
              <p>Даю согласие на обработку персональных данных</p>
            </span>
          </form>
        </div>
        <footer>
          <p>I AM IN PURE</p>
          <p style={{ fontSize: '9px' }}>2020</p>
        </footer>
      </>
    )
  }
}
