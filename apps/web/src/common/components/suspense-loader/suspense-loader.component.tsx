import React, { memo } from 'react';
import './suspense-loader.component.less';
import { Spin } from 'antd';

export const SuspenseLoader = memo(() => (
    <div className="suspense-loader" data-cy="suspense-loader">
        <Spin spinning={true} size="large"></Spin>
    </div>
));
