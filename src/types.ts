// Тип формата работы
export type WorkType = 'remote' | 'office' | 'hybrid';

// Интерфейс Соискателя (Резюме)
export interface Candidate {
  id: string;
  fullName: string;
  avatarUrl: string;
  role: string;               // Например: "Frontend Developer"
  skills: string[];           // Массив навыков: ["React", "TypeScript", "Redux"]
  experienceYears: number;    // Опыт работы в годах
  expectedSalary: number;     // Желаемая зарплата
  workType: WorkType;         // Формат работы
  bio: string;                // О себе
}

// Интерфейс Нанимателя (Вакансия)
export interface Vacancy {
  id: string;
  companyName: string;
  title: string;              // Название вакансии, например: "Middle React Разработчик"
  requiredSkills: string[];   // Требуемые навыки: ["React", "TypeScript"]
  minExperienceRequired: number; // Минимальный опыт
  budgetMax: number;          // Максимальный бюджет (зарплата)
  workType: WorkType;         // Формат работы
  description: string;        // Описание вакансии
}
