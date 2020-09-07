import React, { PropsWithChildren } from 'react'

export default (props: PropsWithChildren<any>) => {
  return (
    <main
      style={{ height: '100vh' }}
    >
      {props.children}
    </main>
  )
}
