import { NewTodo, Todo } from '../../models';

export interface TodosStore {
    todos: Todo[];
    newTodo: NewTodo | null;
}
