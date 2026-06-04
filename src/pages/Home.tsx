import { 
  Briefcase, 
  Building2, 
  Users, 
  TrendingUp, 
  UserPlus, 
  ChevronRight,
  Mail
} from "lucide-react";
import DatePickerComponent from "../components/DatePicker";

export default function Home() {
  const singlePartners = ["/gol.jpg", "/tis.jpg", "/msc.jpg", "/formag.jpg", "/upwork.jpg", "/DTEK.jpg"];

  
  const partners = [...singlePartners, ...singlePartners, ...singlePartners];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* HEADER / НАВИГАЦИЯ */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">⚓</div>
            <div>
              <h1 className="font-black text-lg tracking-tight text-blue-900 leading-none">ОНМУ Кар'єра</h1>
              <span className="text-xs text-slate-500">Платформа розумного працевлаштування</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Головна</a>
            <a href="#" className="hover:text-blue-600 transition">Студентам</a>
            <a href="#" className="hover:text-blue-600 transition">Роботодавцям</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition">Увійти</button>
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition">Реєстрація</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION / ГЛАВНЫЙ БАННЕР */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">ОНМУ КАР'ЄРА-ДЕ ТАЛАНТ ЗУСТРІЧАЄ МОЖЛИВІСТЬ</span>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-950 py-6 scale-y-[1.5] origin-left leading-[1.4]">
            Платформа <br />
            <span className="text-blue-600">майбутніх можливостей</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl">
            Ми об'єднуємо талановитих студентів і прогресивні компанії для створення успішного майбутнього.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition">
              <UserPlus size={18} /> Створити профіль
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 max-w-xs">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Обрати дату старту</label>
            <DatePickerComponent />
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[380px] w-full hidden md:block">
          <div className="absolute top-0 right-4 w-72 h-[350px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20">
            <img src="public/meeting.jpg" alt="Student" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-4 left-4 w-56 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-30">
            <img src="public/classification.jpg" alt="Meeting" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ АВТОМАТИЧЕСКОЙ КАРУСЕЛИ ПАРТНЕРОВ */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black text-slate-900">Компанії-партнери</h3>
          <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline">
            Усі компанії <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Контейнер карусели со скрытием выходящих элементов */}
        <div className="relative w-full overflow-hidden bg-white py-6 rounded-2xl border border-slate-100 shadow-sm before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
          
          {/* Лента, которая движется сама по кругу */}
          <div className="flex w-max gap-8 animate-marquee whitespace-nowrap px-4 hover:[animate-play-state:paused]">
            {partners.map((partner, idx) => (
            <div
               key={idx}
               className="w-40 h-20 flex items-center justify-center bg-white rounded-xl border border-slate-100 p-2"
    >            <img 
                  src={partner} 
                  alt="Partner logo" 
                  className="max-w-full max-h-full object-contain"/>
            </div>
         ))}
        </div>


        </div>
      </section>

      {/* STATS SECTION / СТАТИСТИКА */}
      <section className="bg-white border-y border-slate-100 py-10 my-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Briefcase size={28} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">1500+</div>
              <div className="text-sm text-slate-500">активних вакансій</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 size={28} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">400+</div>
              <div className="text-sm text-slate-500">компаній-партнерів</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={28} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">5000+</div>
              <div className="text-sm text-slate-500">студентів</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp size={28} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">89%</div>
              <div className="text-sm text-slate-500">працевлаштування</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">⚓</div>
              <h5 className="font-black text-lg">ОНМУ Кар'єра</h5>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Платформа розумного працевлаштування студентів та випускників Одеського національного морського університету.
            </p>
          </div>
          <div className="md:col-span-6 space-y-4 md:text-right flex flex-col md:items-end justify-center">
            <h6 className="text-white font-bold text-sm uppercase tracking-wider">Ми в соцмережах</h6>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition"></a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-pink-600 text-white rounded-lg flex items-center justify-center transition"></a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition"></a>
            </div>
            <div className="flex items-center gap-2 text-sm pt-2">
              <Mail size={16} className="text-blue-500" />
              <a href="mailto:career@onmu.edu.ua" className="hover:text-white transition">career@onmu.edu.ua</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between text-xs text-slate-500 gap-4">
          <div>© 2026 ОНМУ Кар'єра. Усі права захищені.</div>
        </div>
      </footer>

    </div>
  );
}


