import { useCallback, useState } from 'react';
import Search from './Search';
import { shuffle } from './utils';

const ALL_USERS = ['john', 'alex', 'george', 'simon', 'james'];

export default function Demo() {
  const [users, setUsers] = useState(ALL_USERS);

  // Оптимизируем поиск: убираем зависимость [users], 
  // так как поиск всегда идет по исходному массиву ALL_USERS
  const handleSearch = useCallback((text: string) => {
    const filteredUsers = ALL_USERS.filter((user) =>
      user.toLowerCase().includes(text.toLowerCase())
    );
    setUsers(filteredUsers);
  }, []); // Пустой массив зависимостей — функция создается один раз

  const handleShuffle = () => {
    setUsers(shuffle([...ALL_USERS])); // Копируем массив перед перемешиванием
  };

  return (
    <div className="tutorial">
      <div className="align-center mb-2 flex" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={handleShuffle}>Shuffle</button>

        {/* Убедитесь, что в компоненте Search пропс называется onChange */}
        <Search onChange={handleSearch} />
      </div>
      
      <ul style={{ marginTop: '16px' }}>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
