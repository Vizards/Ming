import React from 'react';
import { Breadcrumb } from 'antd';
import { getCurrentTitleList } from '@/utils/helpers';

const BreadCrumb: React.FC = () => {
  return (
    <Breadcrumb>
      {getCurrentTitleList().map((routeName) => (
        <Breadcrumb.Item key={routeName}>{routeName}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
