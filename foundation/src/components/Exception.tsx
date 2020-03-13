import React from 'react'
import { history } from 'umi'
import { Result, Button } from 'antd'

interface IExceptionProps {
  type: "404" | "403" | "500"
}

const Exception: React.FC<IExceptionProps> = ({ type }) => {
  const titleMap = {
    403: {
      title: '无权访问',
      subtitle: '您无权访问此页面，如有疑问请联系管理员'
    },
    404: {
      title: '页面不存在',
      subtitle: '抱歉，您访问的页面不存在'
    },
    500: {
      title: '错误',
      subtitle: '渲染服务器出现问题，请联系开发人员'
    }
  }

  const backHome = () => {
    history.replace('/home')
  }

  return (
    <main style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Result
        status={type}
        title={titleMap[type].title}
        subTitle={titleMap[type].subtitle}
        extra={<Button type="primary" onClick={backHome}>返回首页</Button>}
      />
    </main>
  )
}

export default Exception
