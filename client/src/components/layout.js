import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

export default function Layout() {
  return (
    <div>
        <main>
            <Header/>
            <Outlet/>
        </main>
    </div>
  )
}
