import React from 'react'
import { Spin } from 'antd'
import { AppstoreTwoTone } from '@ant-design/icons'

export default (loading: boolean) => {
  return (
    <div style={styles.loading}>
      <Spin
        style={styles.spin}
        spinning={loading === undefined ? true : loading}
        indicator={<AppstoreTwoTone spin />}
        tip="模块加载中"
        size="large"
      />
    </div>
  )
}

const styles = {
  loading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spin: {
    height: 'unset'
  }
}
