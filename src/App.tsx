import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './components/Layout';
import RouterPlayground from './pages/UserPlayground';
import UserDetails from './pages/UserDetails';
import { IconContext } from 'react-icons';

export default function App() {
  return (
    <IconContext.Provider value={{ style: { color: 'indigo', fontSize: '32px' } }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/router" element={<RouterPlayground />} />
          <Route path="/users/:userId" element={<UserDetails />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </IconContext.Provider>
  );
}
