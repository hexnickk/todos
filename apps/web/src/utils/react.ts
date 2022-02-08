import React, { ComponentType, memo } from 'react';

// See more details here
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
export let typedMemo: <T extends ComponentType>(
    c: T,
    areEqual?: (prev: React.ComponentProps<T>, next: React.ComponentProps<T>) => boolean
) => T = memo;
