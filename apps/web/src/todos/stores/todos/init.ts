import { forward } from 'effector';
import { $todosStore } from './state';
import { todosLoadFx, todosSaveFx } from './effects';

forward({
    from: $todosStore,
    to: todosSaveFx,
});

forward({
    from: todosLoadFx.doneData,
    to: $todosStore,
});
