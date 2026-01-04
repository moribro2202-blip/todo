import { useTodos } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-6xl mb-4">
          {filter === 'completed' ? '🎉' : '📝'}
        </div>
        <p className="text-gray-500">
          {filter === 'completed'
            ? '完了済みのタスクはありません'
            : filter === 'active'
            ? 'すべてのタスクが完了しています'
            : 'タスクを追加しましょう'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
