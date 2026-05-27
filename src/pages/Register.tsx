import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [salary, setSalary] = useState('');
  const [workType, setWorkType] = useState('remote');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title) return alert('Заполните основные поля!');

    // Собираем данные в зависимости от роли
    const isCandidate = role === 'candidate';
    const url = isCandidate ? 'http://localhost:3000/api/candidates' : 'http://localhost:3000/api/vacancies';
    
    const bodyData = isCandidate ? {
      fullName: name,
      role: title,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      expectedSalary: Number(salary) || 50000,
      workType,
      bio: 'Новый соискатель'
    } : {
      companyName: name,
      title: title,
      requiredSkills: skills.split(',').map(s => s.trim()).filter(Boolean),
      budgetMax: Number(salary) || 50000,
      workType,
      description: 'Новая вакансия'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        alert(isCandidate ? 'Резюме успешно сохранено на сервере!' : 'Вакансия опубликована на сервере!');
        navigate(`/search-params?role=${isCandidate ? 'employer' : 'candidate'}`);
      }
    } catch (error) {
      alert('Ошибка при сохранении на сервере');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Регистрация в системе</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setRole('candidate')} style={{ marginRight: '10px', padding: '8px 16px', background: role === 'candidate' ? 'indigo' : '#eee', color: role === 'candidate' ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Я Соискатель</button>
        <button onClick={() => setRole('employer')} style={{ padding: '8px 16px', background: role === 'employer' ? 'indigo' : '#eee', color: role === 'employer' ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Я Наниматель</button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{role === 'candidate' ? 'Имя и Фамилия' : 'Название компании'}:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{role === 'candidate' ? 'Желаемая должность' : 'Название вакансии'}:</label>
          <input type="text" value={title} placeholder="например, Frontend Developer" onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Навыки (через запятую):</label>
          <input type="text" value={skills} placeholder="React, TypeScript, Node.js" onChange={e => setSkills(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{role === 'candidate' ? 'Зарплатные ожидания ($)' : 'Бюджет вакансии до ($)'}:</label>
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Формат работы:</label>
          <select value={workType} onChange={e => setWorkType(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="remote">Удаленка</option>
            <option value="hybrid">Гибрид</option>
            <option value="office">Офис</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '12px', background: 'indigo', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          {role === 'candidate' ? 'Создать резюме' : 'Опубликовать вакансию'}
        </button>
      </form>
    </div>
  );
}
