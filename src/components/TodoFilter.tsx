import { useTodos } from '../context/TodoContext';
import type { FilterStatus } from '../types/todo';

const filters: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

export function TodoFilter() {
  const { todos, filter, setFilter, clearCompleted } = useTodos();

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-gray-200">
      <span className="text-sm text-gray-600">
        残り <span className="font-semibold text-blue-600">{activeCount}</span> 件
      </span>

      <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          完了済みを削除
        </button>
      )}
    </div>
  );
}
