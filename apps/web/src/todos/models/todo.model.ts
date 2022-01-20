export interface Todo {
    publicId: string;
    title: string;
    completed: boolean;
}

export type NewTodo = Omit<Todo, 'publicId'>;

export type Todos = Todo[];
