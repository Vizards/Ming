import React from 'react'
import Loading from "@/components/Loading"

export default () => {
  return (
    <main
      id={`root-${location.pathname.split('/').filter(key => key.length > 0)[0]}`}
      style={{ height: '100vh' }}
    >
      <Loading />
    </main>
  )
}
