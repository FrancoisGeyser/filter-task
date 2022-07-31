import React from 'react'
import { PageLayout } from './components/page/PageLayout'
import { DisplayUsers } from './components/users/displayUsers'
import { DisplayFilters } from './components/filters/DisplayFilters'
import { Header } from './components/page/Header'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <PageLayout>
        <DisplayFilters />
        <DisplayUsers />
      </PageLayout>
    </>
  )
}

export default App
