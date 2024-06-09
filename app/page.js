
import React from 'react'

import Header from './header'
import Main from './Main'
import Assorti from './assorti'
import Footer from './footer'
export default function Home() {
  return (
    <div className='w-full'>
      <Header></Header>
      <Main></Main>
      <Assorti></Assorti>
      <Footer></Footer>

    </div>
  )
}
