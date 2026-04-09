import { useMemo } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

// 1. Кастомный хук для получения данных пользователя и параметров окружения
const useUserSession = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from') ?? 'direct';

  // Имитация загрузки данных на основе ID
  const user = useMemo(() => ({
    id: userId,
    name: `User #${userId}`,
    role: userId === '42' ? 'Admin' : 'Guest'
  }), [userId]);

  return { userId, user, from, hash, navigate };
};

export default function UserDetails() {
  const { userId, user, from, hash, navigate } = useUserSession();

  return (
    <div className="user-details">
      <h2>User Details Profile</h2>

      <Card title={`Profile: ${user.name}`}>
        <div style={{ lineHeight: '1.6' }}>
          <p><strong>User ID (from params):</strong> {userId}</p>
          <p><strong>Source (from query):</strong> <code>{from}</code></p>
          <p><strong>Section (from hash):</strong> {hash || '—'}</p>
          <p><strong>Computed Role:</strong> {user.role}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => navigate('/router')}>
            To Playground
          </button>
          <button onClick={() => navigate(-1)} style={{ opacity: 0.8 }}>
            ← Go Back
          </button>
        </div>
      </Card>

      <Card title="Quick Navigation">
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <Link to="/users/10?from=details">User 10 (Direct)</Link>
          </li>
          <li>
            <Link to="/users/10?from=details#bio">User 10 (Bio section)</Link>
          </li>
        </ul>
      </Card>
    </div>
  );
}

// 2. Тот же UI-компонент для единства стиля проекта
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    marginBottom: '16px',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  }}>
    <h3 style={{ marginTop: 0, color: 'indigo' }}>{title}</h3>
    {children}
  </section>
);
