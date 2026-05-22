import type { Candidate, Vacancy } from './types';



export const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    fullName: 'Иван Иванов',
    avatarUrl: 'https://dicebear.com',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
    experienceYears: 2,
    expectedSalary: 120000,
    workType: 'remote',
    bio: 'Увлеченный фронтенд-разработчик. Люблю чистый код.'
  },
  {
    id: 'c2',
    fullName: 'Мария Петрова',
    avatarUrl: 'https://dicebear.com',
    role: 'Frontend Developer',
    skills: ['React', 'Redux', 'JavaScript', 'Next.js'],
    experienceYears: 4,
    expectedSalary: 180000,
    workType: 'hybrid',
    bio: 'Опыт разработки сложных SPA систем. Пишу тесты.'
  }
];

export const mockVacancies: Vacancy[] = [
  {
    id: 'v1',
    companyName: 'ТехноСтарт',
    title: 'Junior/Middle Frontend Engineer',
    requiredSkills: ['React', 'TypeScript'],
    minExperienceRequired: 1,
    budgetMax: 140000,
    workType: 'remote',
    description: 'Ищем разработчика в команду создания CRM-системы.'
  },
  {
    id: 'v2',
    companyName: 'МегаДев',
    title: 'Senior React Developer',
    requiredSkills: ['React', 'Next.js', 'Redux'],
    minExperienceRequired: 3,
    budgetMax: 220000,
    workType: 'office',
    description: 'Разработка крупного e-commerce проекта.'
  }
];

