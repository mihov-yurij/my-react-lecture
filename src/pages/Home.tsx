import { 
  Briefcase, 
  Building2, 
  Users, 
  TrendingUp, 
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const singlePartners = ["/gol.jpg", "/tis.jpg", "/msc.jpg", "/formag.jpg", "/upwork.jpg", "/DTEK.jpg"];
  const partners = [...singlePartners, ...singlePartners, ...singlePartners];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden px-4 md:px-0">
      
      {/* HERO SECTION / ГЛАВНЫЙ БАННЕР */}
      <section className="w-full md:max-w-7xl md:mx-auto py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8 items-center">
        
        {/* Левая текстовая часть */}
        <div className="lg:col-span-7 space-y-6 flex flex-col items-start w-full">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-xs sm:text-sm block">
            ОНМУ КАР'ЄРА  - <br className="sm:hidden" /> ДЕ ТАЛАНТ ЗУСТРІЧАЄ МОЖЛИВІСТЬ
          </span>
          
          {/* Идеальный контейнер заголовка с вертикальным растягиванием */}
          <div className="w-full py-4 select-none flex flex-col items-start gap-y-6 sm:gap-y-7 md:gap-y-10">
            <h1 className="text-[11vw] sm:text-6xl md:text-7xl font-black text-blue-900 uppercase transform scale-y-[1.5] origin-left leading-none">
              ПЛАТФОРМА
            </h1>
            <span className="block text-[6.5vw] sm:text-3xl md:text-4xl font-bold text-blue-600 transform scale-y-[1.5] origin-left leading-none">
              майбутніх можливостей
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl pt-4">
            Ми об'єднуємо талановитих студентів і прогресивні компанії для створення успішного майбутнього.
          </p>
        </div>

        {/* Правая часть: На мобилках картинки уходят под текст, на десктопе — абсолютное наложение */}
        <div className="lg:col-span-5 w-full flex flex-col sm:flex-row lg:relative gap-6 lg:gap-0 h-auto lg:h-[380px]">
          <div className="w-full sm:w-1/2 lg:w-72 h-64 sm:h-80 lg:h-[350px] lg:absolute lg:top-0 lg:right-4 rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl border-4 border-white z-20">
            <img src="public/meeting.jpg" alt="Student" className="w-full h-full object-cover" />
          </div>
          <div className="w-full sm:w-1/2 lg:w-56 h-48 sm:h-80 lg:h-48 lg:absolute lg:bottom-4 lg:left-4 rounded-2xl overflow-hidden shadow-lg lg:shadow-xl border-4 border-white z-30">
            <img src="public/classification.jpg" alt="Meeting" className="w-full h-full object-cover" />
          </div>
        </div>

      </section>

      {/* СЕКЦИЯ АВТОМАТИЧЕСКОЙ КАРУСЕЛИ ПАРТНЕРОВ */}
      <section className="w-full md:max-w-7xl md:mx-auto py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">Компанії-партнери</h3>
          <button className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:underline">
            Усі компанії <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="relative w-full overflow-hidden bg-white py-6 rounded-2xl border border-slate-100 shadow-sm before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 sm:before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-10 sm:after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
          <div className="flex w-max gap-6 sm:gap-8 animate-marquee whitespace-nowrap px-4 hover:[animate-play-state:paused]">
            {partners.map((partner, idx) => (
              <div key={idx} className="w-32 sm:w-40 h-16 sm:h-20 flex items-center justify-center bg-white rounded-xl border border-slate-100 p-2">
                <img src={partner} alt="Partner logo" className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION / СТАТИСТИКА */}
      <section className="w-full bg-white border-y border-slate-100 py-8 my-6">
        <div className="w-full md:max-w-7xl md:mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Briefcase size={24} /></div>
            <div>
              <div className="text-xl font-black text-slate-900">1500+</div>
              <div className="text-sm text-slate-500">активних вакансій</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Building2 size={24} /></div>
            <div>
              <div className="text-xl font-black text-slate-900">400+</div>
              <div className="text-sm text-slate-500">компаній-партнерів</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Users size={24} /></div>
            <div>
              <div className="text-xl font-black text-slate-900">5000+</div>
              <div className="text-sm text-slate-500">студентів</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><TrendingUp size={24} /></div>
            <div>
              <div className="text-xl font-black text-slate-900">89%</div>
              <div className="text-sm text-slate-500">працевлаштування</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md p-1 bg-white/5">
                <img src="/icon.jpg" alt="ОНМУ Логотип" className="w-full h-full object-contain rounded-sm" />
              </div>
              <h5 className="font-black text-lg">ОНМУ Кар'єра</h5>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              Платформа розумного працевлаштування студентів та випускників Одеського національного морського університету.
            </p>
          </div>
          <div className="md:col-span-6 space-y-4 md:text-right flex flex-col md:items-center justify-center">
            <h6 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">Ми в соцмережах</h6>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1CUStz2qwk/" className="bg-white/5 p-3 rounded-lg text-white hover:bg-yellow-500 hover:text-[#0f172a] transition-all" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/maritime_business_marketing?igsh=cWQ1bW53d24zbGo5" className="bg-white/5 p-3 rounded-lg text-white hover:bg-yellow-500 hover:text-[#0f172a] transition-all" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://t.me/+OF2sUCrnSGAyZjli" className="bg-white/5 p-3 rounded-lg text-white hover:bg-yellow-500 hover:text-[#0f172a] transition-all" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </a>
              <a href="https://www.linkedin.com/school/maritimeuniversityofficial/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-lg text-white hover:bg-yellow-500 hover:text-[#0f172a] transition-all" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} ОНМУ Кар'єра. Всі права захищені.
        </div>
      </footer>

    </div>
  );
}


