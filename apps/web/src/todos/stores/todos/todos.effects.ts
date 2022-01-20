import { createEffect } from 'effector';

export let fetchTodosFx = createEffect(
    () => []
    // axios.get(`${environment.apiUrl}/todos`).then((response) => response.data)
);
