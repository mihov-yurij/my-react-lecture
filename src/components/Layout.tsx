import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-layout">
      {/* Ваша шапка сайта или меню навигации */}
      <nav style={{ padding: '1rem', background: '#f5f5f5', display: 'flex', gap: '15px', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'indigo', fontWeight: 'bold' }}>Главная</Link>
        <Link to="/router" style={{ textDecoration: 'none', color: 'indigo', fontWeight: 'bold' }}>Playground</Link>
        <Link to="/search-params" style={{ textDecoration: 'none', color: 'indigo', fontWeight: 'bold' }}>Мэтчинг</Link>
        
        {/* НОВАЯ КНОПКА ДЛЯ РЕГИСТРАЦИИ */}
        <Link 
          to="/register" 
          style={{ 
            textDecoration: 'none', 
            color: 'white', 
            background: 'indigo', 
            padding: '5px 12px', 
            borderRadius: '4px',
            fontWeight: 'bold',
            marginLeft: 'auto' // Прижмет кнопку к правому краю меню
          }}
        >
          ➕ Регистрация / Добавить вакансию
        </Link>
      </nav>

      {/* Контент текущей страницы */}
      <main className="content" style={{ padding: '20px' }}>
        <Outlet /> 
      </main>
    </div>
  );
}

