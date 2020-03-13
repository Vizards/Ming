import React from 'react'
import { Breadcrumb } from "antd"
import { breadCrumbMap } from "@/config/routes"

const BreadCrumb: React.FC = () => {
  return (
    <Breadcrumb>
      {breadCrumbMap()[window.location.pathname]?.map(routeName => (
        <Breadcrumb.Item key={routeName}>{routeName}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default BreadCrumb
