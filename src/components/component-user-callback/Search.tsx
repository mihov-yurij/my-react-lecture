import { memo } from 'react';

interface SearchProps {
  onChange: (text: string) => void;
}

// Даем функции имя, чтобы в DevTools было понятно, что это за компонент
const Search = memo(function Search({ onChange }: SearchProps) {
  console.log('Search rendered!');

  return (
    <input
      type="text"
      placeholder="Search users..."
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
});

export default Search;
