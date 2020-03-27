import React from 'react'

export default (props: any) => {
  localStorage.removeItem('profile')
  return props.children
}
