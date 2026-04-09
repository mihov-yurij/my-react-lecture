import { useMemo, useState } from 'react';
import { initialItems } from './utils';

interface DemoProps {
    title: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

function Demo({ title, children, style }: DemoProps) {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [items, count],
  );

  return (
    <div className="tutorial" style={style}>
      <h1>{title}</h1>
      {children}
      <h1>Count: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Demo;