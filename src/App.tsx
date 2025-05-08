import { useState } from 'react';
import { Todos } from './components/Todos';
import {
    type FilterValue,
    type TodoTitle,
    type Todo as TodoType,
} from './types';
import { TODO_FILTERS } from './const';
import { Footer } from './components/Footer';
import { Headers } from './components/Header';

const mockTodos = [
    {
        id: 1,
        title: 'todo 1',
        completed: true,
    },
    {
        id: 2,
        title: 'todo 2',
        completed: false,
    },
    {
        id: 3,
        title: 'todo 3',
        completed: false,
    },
];
const App = () => {
    const [todos, setTodos] = useState(mockTodos);
    const [filterSelected, setFilterSelected] = useState<FilterValue>(
        TODO_FILTERS.ALL
    );
    const handleRemove = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleCompleted = ({
        id,
        completed,
    }: Pick<TodoType, 'id' | 'completed'>): void => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter);
    };

    const handleRemoveAllCompleted = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    const activeCount = todos.filter((todo) => !todo.completed).length;
    const completedCount = todos.length - activeCount;

    const filteredTodos = todos.filter((todo) => {
        if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
        if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
        return todo;
    });

    const handleAddTodo = ({ title }: TodoTitle): void => {
        const newTodo = {
            title,
            id: crypto.randomUUID(),
            completed: false,
        };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    };

    return (
        <div className="todoapp">
            <Headers onAddTodo={handleAddTodo} />
            <Todos
                onToggleCompleteTodo={handleCompleted}
                onRemoveTodo={handleRemove}
                todos={filteredTodos}
            />
            <Footer
                completedCount={completedCount}
                activeCount={activeCount}
                filterSelected={filterSelected}
                onClearCompleted={handleRemoveAllCompleted}
                handleFilterChange={handleFilterChange}
            />
        </div>
    );
};

export default App;
