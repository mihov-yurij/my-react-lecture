import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Импорт страниц и компонентов
import Home from './pages/Home';
import Layout from './components/Layout';
import RouterPlayground from './pages/UserPlayground';
import UserDetails from './pages/UserDetails';
import { Demo, Demo2 } from './components/component-use-ref'; // Проверьте путь к файлу с Demo
import { IconContext } from 'react-icons';

export default function App() {
  return (
    // Глобальная настройка иконок
    <IconContext.Provider value={{ style: { color: 'indigo', fontSize: '24px', verticalAlign: 'middle' } }}>
      <Routes>
        {/* Основной макет с навигацией */}
        <Route element={<Layout />}>
          {/* Главная страница */}
          <Route path="/" element={<Home />} />

          {/* Страницы для изучения Router Hooks */}
          <Route path="/router" element={<RouterPlayground />} />
          <Route path="/users/:userId" element={<UserDetails />} />

          {/* Новые страницы для изучения UseRef */}
          <Route path="/demo-ref" element={<Demo />} />
          <Route path="/demo-focus" element={<Demo2 />} />

          {/* Редирект для всех несуществующих путей */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </IconContext.Provider>
  );
}
