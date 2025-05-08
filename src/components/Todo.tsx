import { type Todo as TodoTypes } from '../types';

interface Props extends TodoTypes {
    onRemoveTodo: (id: string) => void;
    onToggleCompleteTodo: ({
        id,
        completed,
    }: Pick<TodoTypes, 'id' | 'completed'>) => void;
}

export const Todo: React.FC<Props> = ({
    id,
    title,
    completed,
    onRemoveTodo,
    onToggleCompleteTodo,
}) => {
    const handleChangeCheckbox = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        onToggleCompleteTodo({
            id,
            completed: event.target.checked,
        });
    };
    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={handleChangeCheckbox}
            />
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {
                    onRemoveTodo(id);
                }}
            />
        </div>
    );
};
