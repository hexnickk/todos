import { nanoid } from 'nanoid';

export interface Todo {
    publicId: string;
    order: number;
    title: string;
    completed: boolean;
}

export type NewTodo = Omit<Todo, 'publicId'>;

export const todoIsRegular = (todo: Todo | NewTodo): todo is Todo => 'publicId' in todo;
export const todoIsNew = (todo: Todo | NewTodo): todo is NewTodo => !todoIsRegular(todo);
export const todoFromNew = (todo: NewTodo): Todo => ({
    ...todo,
    publicId: nanoid(),
});
