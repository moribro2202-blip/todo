import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TODO
          </h1>
          <p className="text-gray-600">タスクを管理して生産性を上げよう</p>
        </header>

        <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <TodoForm />
          <TodoList />
          <TodoFilter />
        </main>

        <footer className="text-center mt-6 text-sm text-gray-500">
          ダブルクリックで編集 | ブラウザに自動保存
        </footer>
      </div>
    </div>
  );
}

export default App;
