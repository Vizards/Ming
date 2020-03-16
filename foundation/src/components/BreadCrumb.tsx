import React from 'react'
import { Breadcrumb } from "antd"
import { generateBreadCrumbPathArr } from "@/config/routes"

const BreadCrumb: React.FC = () => {
  return (
    <Breadcrumb>
      {generateBreadCrumbPathArr().map(routeName => (
        <Breadcrumb.Item key={routeName}>{routeName}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default BreadCrumb
