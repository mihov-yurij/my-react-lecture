import { Link, Outlet, useLocation } from 'react-router-dom';
import { HiHome, HiBeaker, HiUsers } from 'react-icons/hi'; // Установите npm install react-icons

export default function Layout() {
  const { pathname } = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: <HiHome /> },
    { path: '/router', label: 'Playground', icon: <HiBeaker /> },
    { path: '/users/42', label: 'Профиль', icon: <HiUsers /> },
  ];

  return (
    <div className="app-wrapper">
      <header className="main-header">
        <nav className="nav-container">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link ${pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
        </nav>
      </header>

      <main className="content-area">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
