import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Импорт страниц и компонентов
import Home from './pages/Home';
import Layout from './components/Layout';
import RouterPlayground from './pages/UserPlayground';
import UserDetails from './pages/UserDetails';
import { Demo, Demo2 } from './components/component-use-ref';
import { IconContext } from 'react-icons';
import { SearchParamsDemo } from './pages/SearchParamsDemo';
import { Register } from './pages/Register';

export default function App() {
  return (
    // Глобальная настройка иконок
    <IconContext.Provider value={{ style: { color: 'indigo', fontSize: '24px', verticalAlign: 'middle' } }}>
      <Routes>
        {/* Основной макет с навигацией */}
        <Route element={<Layout />}>
          {/* Главная страница (исправлено на index) */}
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />

          {/* Страницы для изучения Router Hooks */}
          <Route path="/router" element={<RouterPlayground />} />
          <Route path="/users/:userId" element={<UserDetails />} />

          {/* Новые страницы для изучения UseRef */}
          <Route path="/demo-ref" element={<Demo />} />
          <Route path="/demo-focus" element={<Demo2 />} />
          <Route path="/search-params" element={<SearchParamsDemo />} />

          {/* Редирект для всех несуществующих путей */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </IconContext.Provider>
  );
}


