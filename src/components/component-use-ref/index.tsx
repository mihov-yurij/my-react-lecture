import { useEffect, useRef, useState } from 'react';

export function Demo() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    // 1. Обновляем стейт для рендера
    setCount((prev) => prev + 1);
    
    // 2. Обновляем реф для "технических" нужд (например, замер скорости кликов)
    countRef.current++;
    
    console.log('Ref value in handler:', countRef.current);
  };

  return (
    <div className="tutorial">
      {/* 
         Отображаем только стейт. 
         Если вам нужно видеть значение рефа — синхронизируйте его со стейтом 
         или используйте только стейт для вывода в UI.
      */}
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export function Demo2() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Использование рефа внутри useEffect (после рендера) — это ПРАВИЛЬНО
    inputRef.current?.focus();
  }, []);

  return (
    <div className="tutorial">
      <input ref={inputRef} type="text" placeholder="I will be focused" />
    </div>
  );
}
