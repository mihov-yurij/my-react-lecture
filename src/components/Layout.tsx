import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  // Состояние для открытия/закрытия мобильного меню
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
        {/* Главный контейнер, который центрирует контент и выстраивает элементы в ряд */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4 relative">
          
          {/* Блок логотипа */}
          <div className="flex items-center gap-3 shrink-0 select-none">
            <div className="w-10 h-10 overflow-hidden">
              <img 
                src="/icon.jpg" 
                alt="ОНМУ Логотип" 
                className="w-full h-full object-contain rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-black text-base sm:text-lg tracking-tight text-blue-900 leading-none">ОНМУ Кар'єра</h1>
              <span className="text-[10px] sm:text-xs text-slate-500 mt-1 hidden xs:block">Платформа розумного працевлаштування</span>
            </div>
          </div>

          {/* ДЕСКТОПНАЯ НАВИГАЦИЯ (Автоматически скрывается на мобильных меньше md:768px) */}
          <nav className="hidden md:flex items-center gap-6 text-base lg:text-lg text-slate-600 font-medium">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Головна</a>
            <a href="#" className="hover:text-blue-600 transition">Студентам</a>
            <a href="#" className="hover:text-blue-600 transition">Роботодавцям</a>
            <a href="#" className="hover:text-blue-600 transition">Курси</a>
            <a href="#" className="hover:text-blue-600 transition">Події</a>
          </nav>

          {/* ДЕСКТОПНЫЕ КНОПКИ АВТОРИЗАЦИИ (Скрываются на мобильных) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">Увійти</button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-md transition">Реєстрація</button>
          </div>

          {/* КНОПКА-БУРГЕР (Видна только на мобильных вместо меню) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-slate-600 focus:outline-none z-50 absolute right-4 top-1/2 -translate-y-1/2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-0.5 bg-slate-800 rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-slate-800 rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-slate-800 rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>

          {/* МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ (Появляется при клике на бургер) */}
          <div className={`absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg py-6 px-6 flex flex-col gap-6 md:hidden transition-all duration-300 z-40 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
            <nav className="flex flex-col gap-4 font-semibold text-slate-700">
              <a href="#" onClick={() => setIsOpen(false)} className="text-blue-600 py-1 no-underline">Головна</a>
              <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-600 py-1 no-underline">Студентам</a>
              <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-600 py-1 no-underline">Роботодавцям</a>
              <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-600 py-1 no-underline">Курси</a>
              <a href="#" onClick={() => setIsOpen(false)} className="hover:text-blue-600 py-1 no-underline">Події</a>
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center border border-blue-600 text-blue-600 font-bold rounded-lg text-sm bg-transparent">Увійти</button>
              <button onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center bg-blue-600 text-white font-bold rounded-lg text-sm shadow-sm">Реєстрація</button>
            </div>
          </div>

        </div>
      </header>

      {/* Контент страниц */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 py-6 md:py-12">
        <Outlet />
      </main>
    </div>
  );
}
