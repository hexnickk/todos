import React, { memo } from 'react';
import './SuspenseLoader.less';

import { Spin } from 'antd';

export const SuspenseLoader = memo(() => (
    <div className="suspense-loader">
        <Spin spinning={true} size="large"></Spin>
    </div>
));
