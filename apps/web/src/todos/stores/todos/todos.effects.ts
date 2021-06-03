import axios from 'axios';
import { createEffect } from 'effector';
import { environment } from '@environment';

export let fetchTodosFx = createEffect(() =>
    axios.get(`${environment.apiUrl}/todos`).then((response) => response.data)
);
