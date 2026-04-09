import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: 16,
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <h1 style={{ marginTop: 0 }}>React Hooks — Lecture Playground</h1>
      <hr />
      <Outlet />
    </div>
  );
}