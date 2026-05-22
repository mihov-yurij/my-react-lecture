import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Candidate, Vacancy } from '../types';

export function SearchParamsDemo() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Состояния для хранения динамических данных, загруженных с сервера
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Определяем роль из URL: 'employer' или 'candidate'
  const currentRole = searchParams.get('role') || 'employer';
  const searchSkill = searchParams.get('skill') || '';
  const selectedFormat = searchParams.get('format') || 'all';

  // --- Загрузка данных с Node.js сервера при старте страницы ---
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Запрашиваем JSON файлы у нашего бэкенда
        const candidatesRes = await fetch('http://localhost:3000/api/candidates');
        const vacanciesRes = await fetch('http://localhost:3000/api/vacancies');

        if (candidatesRes.ok && vacanciesRes.ok) {
          const candidatesData = await candidatesRes.json();
          const vacanciesData = await vacanciesRes.json();
          setCandidates(candidatesData);
          setVacancies(vacanciesData);
        }
      } catch (error) {
        console.error('Не удалось загрузить данные с сервера:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentRole]); // Перезапрашиваем при смене роли, чтобы обновить списки

  // Вспомогательная функция обновления URL-фильтров
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  // --- ЛОГИКА МЭТЧИНГА НА ОСНОВЕ ДАННЫХ С СЕРВЕРА ---
  const maxSalary = Number(searchParams.get('maxSalary') || '300000');
  const processedCandidates = candidates.map(candidate => {
    let score = 100;
    if (searchSkill && !candidate.skills.map(s => s.toLowerCase()).includes(searchSkill.toLowerCase())) score -= 50;
    if (candidate.expectedSalary > maxSalary) score -= 30;
    if (selectedFormat !== 'all' && candidate.workType !== selectedFormat) score -= 20;
    return { ...candidate, matchScore: Math.max(0, score) };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const minSalary = Number(searchParams.get('minSalary') || '100000');
  const processedVacancies = vacancies.map(vacancy => {
    let score = 100;
    if (searchSkill && !vacancy.requiredSkills.map(s => s.toLowerCase()).includes(searchSkill.toLowerCase())) score -= 50;
    if (vacancy.budgetMax < minSalary) score -= 30;
    if (selectedFormat !== 'all' && vacancy.workType !== selectedFormat) score -= 20;
    return { ...vacancy, matchScore: Math.max(0, score) };
  }).sort((a, b) => b.matchScore - a.matchScore);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>Загрузка данных с сервера...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Кнопки переключения ролей */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <button
          onClick={() => setSearchParams({ role: 'employer' })}
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: currentRole === 'employer' ? 'indigo' : '#eee', color: currentRole === 'employer' ? 'white' : '#333', borderRadius: '4px', fontWeight: 'bold' }}
        >
          💼 Я Наниматель (Ищу сотрудников)
        </button>
        <button
          onClick={() => setSearchParams({ role: 'candidate' })}
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: currentRole === 'candidate' ? 'indigo' : '#eee', color: currentRole === 'candidate' ? 'white' : '#333', borderRadius: '4px', fontWeight: 'bold' }}
        >
          📄 Я Соискатель (Ищу работу)
        </button>
      </div>

      {/* Панель фильтров */}
      <div style={{ display: 'flex', gap: '15px', background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ключевой навык:</label>
          <input
            type="text"
            placeholder="Например: React"
            value={searchSkill}
            onChange={(e) => updateFilters('skill', e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ flex: 1 }}>
          {currentRole === 'employer' ? (
            <>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Макс. бюджет: {maxSalary} руб.</label>
              <input type="range" min="100000" max="300000" step="10000" value={maxSalary} onChange={(e) => updateFilters('maxSalary', e.target.value)} style={{ width: '100%', accentColor: 'indigo' }} />
            </>
          ) : (
            <>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Желаемая зарплата от: {minSalary} руб.</label>
              <input type="range" min="100000" max="300000" step="10000" value={minSalary} onChange={(e) => updateFilters('minSalary', e.target.value)} style={{ width: '100%', accentColor: 'indigo' }} />
            </>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Формат работы:</label>
          <select value={selectedFormat} onChange={(e) => updateFilters('format', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="all">Любой</option>
            <option value="remote">Удаленка</option>
            <option value="hybrid">Гибрид</option>
            <option value="office">Офис</option>
          </select>
        </div>
      </div>

      {/* Рендеринг списков */}
      <h3>{currentRole === 'employer' ? 'Рекомендованные соискатели с сервера:' : 'Подходящие вакансии с сервера:'}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {currentRole === 'employer' ? (
          processedCandidates.map(c => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fff' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{c.fullName} — <span style={{ color: '#555' }}>{c.role}</span></h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#777' }}>Ожидания: <b>{c.expectedSalary} руб.</b> | График: <b>{c.workType}</b></p>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {c.skills.map(s => <span key={s} style={{ fontSize: '12px', background: '#eee', padding: '3px 8px', borderRadius: '12px' }}>{s}</span>)}
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '5px', minWidth: '80px', background: c.matchScore > 70 ? '#e6f4ea' : '#feefe3', color: c.matchScore > 70 ? '#137333' : '#b06000' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{c.matchScore}%</div>
                <div style={{ fontSize: '11px' }}>совпадение</div>
              </div>
            </div>
          ))
        ) : (
          processedVacancies.map(v => (
            <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fff' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{v.title} — <span style={{ color: 'indigo' }}>{v.companyName}</span></h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#777' }}>Бюджет до: <b>{v.budgetMax} руб.</b> | График: <b>{v.workType}</b></p>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {v.requiredSkills.map(s => <span key={s} style={{ fontSize: '12px', background: '#e0dbec', color: 'indigo', padding: '3px 8px', borderRadius: '12px' }}>{s}</span>)}
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '5px', minWidth: '80px', background: v.matchScore > 70 ? '#e6f4ea' : '#feefe3', color: v.matchScore > 70 ? '#137333' : '#b06000' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{v.matchScore}%</div>
                <div style={{ fontSize: '11px' }}>совпадение</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}




