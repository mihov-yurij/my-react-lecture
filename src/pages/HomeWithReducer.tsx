// Добавьте 'type' перед FormEvent для лучшей практики TypeScript
import { useReducer, type ChangeEvent, type FormEvent } from 'react';
import Card from '../components/Card';


// --- Types ---
type FormState = {
  name: string;
  email: string;
  error: string | null;
  loading: boolean;
};

type FormAction =

  | { type: 'SET_FIELD'; field: 'name' | 'email'; value: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'START_SUBMIT' }

  | { type: 'FINISH_SUBMIT' };

// --- Reducer ---
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'START_SUBMIT':
      return { ...state, loading: true, error: null };
    case 'FINISH_SUBMIT':
      return { ...state, loading: false, name: '', email: '' };
    default:
      return state;
  }
};

// --- Hook ---
const useContactForm = () => {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    error: null,
    loading: false,
  });

  // Исправлено: добавлены типы для события
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ 
      type: 'SET_FIELD', 
      field: name as 'name' | 'email', 
      value 
    });
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.name || !state.email) {
      return dispatch({ type: 'SET_ERROR', payload: 'All fields are required!' });
    }

    dispatch({ type: 'START_SUBMIT' });
    await new Promise((res) => setTimeout(res, 1500)); // Имитация API
    dispatch({ type: 'FINISH_SUBMIT' });
    alert('Форма отправлена!');
  };

  return { ...state, handleChange, submitForm };
};

export default function HomeWithReducer() {
  const { name, email, error, loading, handleChange, submitForm } = useContactForm();

  return (
    <div className="home-container">
      <Card title={loading ? 'Отправка...' : 'Свяжитесь с нами'}>
        <form onSubmit={submitForm} className="reducer-form">
          {error && <p className="error-message">{error}</p>}
          
          <input
            name="name"
            placeholder="Ваше имя"
            value={name}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Секунду...' : 'Отправить'}
          </button>
        </form>
      </Card>
    </div>
  );
}
