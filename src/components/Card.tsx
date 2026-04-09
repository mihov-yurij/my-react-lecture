import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ title, children, style }: CardProps) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #ddd',
      background: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      marginBottom: '20px',
      ...style
    }}>
      <h3 style={{ marginTop: 0, color: 'indigo' }}>{title}</h3>
      {children}
    </div>
  );
}
