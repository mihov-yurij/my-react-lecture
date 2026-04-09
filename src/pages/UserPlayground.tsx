import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

// 1. Выносим логику в кастомный хук для чистоты компонента
const useRouterPlayground = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const matchUsers = useMatch('/users/:userId');

  const tab = searchParams.get('tab') ?? 'overview';
  const q = searchParams.get('q') ?? '';

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      return next;
    });
  };

  return {
    location,
    navigate,
    tab,
    q,
    matchUsers,
    setTab: (tab: string) => updateParams({ tab }),
    setQuery: (q: string) => updateParams({ q: q || null }),
    goToUser: (id: string) => navigate(`/users/${id}?from=router`),
  };
};

export default function RouterPlayground() {
  const { location, navigate, tab, q, matchUsers, setTab, setQuery, goToUser } = useRouterPlayground();

  return (
    <div className="playground-container">
      <h2>Router Hooks Playground</h2>

      {/* Секция Location */}
      <Card title="useLocation">
        <pre>{JSON.stringify({
          pathname: location.pathname,
          search: location.search || '(empty)',
          hash: location.hash || '(empty)'
        }, null, 2)}</pre>
      </Card>

      {/* Секция Search Params */}
      <Card title="useSearchParams">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          {['overview', 'stats', 'settings'].map((t) => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              style={{ fontWeight: tab === t ? 'bold' : 'normal' }}
            >
              Set {t}
            </button>
          ))}
        </div>
        
        <label>
          Search (q):
          <input 
            value={q} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Type something..."
            style={{ marginLeft: '10px' }}
          />
        </label>
        <p>Current: <b>{tab}</b> | <b>{q || '—'}</b></p>
      </Card>

      {/* Секция Navigation */}
      <Card title="useNavigate">
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate(-1)}>← Back</button>
          <button onClick={() => navigate(1)}>Forward →</button>
          <button onClick={() => goToUser('42')}>User 42</button>
        </div>
      </Card>

      {/* Секция Match & Links */}
      <Card title="useMatch & Links">
        <p>Match '/users/:userId': <b>{matchUsers ? '✅ YES' : '❌ NO'}</b></p>
        <nav>
          <Link to="/users/1">User 1</Link> | <Link to="/users/2?from=router#bio">User 2 (with hash)</Link>
        </nav>
      </Card>
    </div>
  );
}

// Вспомогательный компонент для чистоты верстки
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    marginBottom: '16px',
    background: '#f9f9f9'
  }}>
    <h3 style={{ marginTop: 0 }}>{title}</h3>
    {children}
  </section>
);
