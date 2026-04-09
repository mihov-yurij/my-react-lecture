import { useReducer, type FormEvent, type ChangeEvent } from 'react';

// --- Types ---
type FormState = {
  name: string;
  email: string;
  error: string | null;
  loading: boolean;
};

type FormAction =

  | { type: 'SET_FIELD'; field: 'name' | 'email'; value: string }
  | { type: 'START_SUBMIT' }

  | { type: 'SET_ERROR'; payload: string | null }
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name as 'name' | 'email', value });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!state.name || !state.email) {
      return dispatch({ type: 'SET_ERROR', payload: 'All fields are required!' });
    }

    dispatch({ type: 'START_SUBMIT' });

    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Form Submitted:', state);
    dispatch({ type: 'FINISH_SUBMIT' });
    alert('Success!');
  };

  return { ...state, handleChange, submitForm };
};

// --- Component ---
export default function Home() {
  const { name, email, error, loading, handleChange, submitForm } = useContactForm();

  return (
    <div className="home-page">
      <h2>Welcome Home</h2>

      <Card title={loading ? 'Processing...' : 'Contact Us'}>
        {error && (
          <div style={{ color: '#d32f2f', marginBottom: '12px', fontSize: '14px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleChange}
            disabled={loading}
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
            disabled={loading}
            style={inputStyle}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </Card>
    </div>
  );
}

// Повторяем вспомогательный компонент (в реальном проекте вынесли бы в /components)
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    background: '#fff',
    maxWidth: '400px'
  }}>
    <h3 style={{ marginTop: 0, color: 'indigo' }}>{title}</h3>
    {children}
  </section>
);

const inputStyle = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};
