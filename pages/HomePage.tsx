import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Page, Mentor, Testimonial } from '../types';
import { mentors, testimonials } from '../data/mockData';

const MentorCard: React.FC<{ mentor: Mentor; isHovered: boolean; isAnotherHovered: boolean; onMouseEnter: () => void; onMouseLeave: () => void; }> = ({ mentor, isHovered, isAnotherHovered, onMouseEnter, onMouseLeave }) => (
  <div 
    className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform ${isHovered ? 'scale-105 z-10 shadow-2xl' : 'scale-100'} ${isAnotherHovered ? 'opacity-50 blur-sm' : 'opacity-100'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="relative">
      <img className="w-full h-64 object-cover" src={mentor.imageUrl} alt={mentor.name} />
      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white text-sm">{mentor.details}</p>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
      <p className="text-blue-600 font-medium mt-1">{mentor.specialization}</p>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="flex-grow mb-4">
                <svg className="w-10 h-10 text-blue-200" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352,20.981c-2.32,0-4.205-1.886-4.205-4.205s1.885-4.205,4.205-4.205c2.32,0,4.205,1.886,4.205,4.205 C13.557,19.095,11.672,20.981,9.352,20.981z M22.648,20.981c-2.32,0-4.205-1.886-4.205-4.205s1.885-4.205,4.205-4.205 c2.32,0,4.205,1.886,4.205,4.205C26.852,19.095,24.967,20.981,22.648,20.981z"></path></svg>
                <p className="text-gray-600 mt-4 text-lg italic">"{testimonial.text}"</p>
            </div>
            <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                <img className="w-12 h-12 rounded-full object-cover" src={testimonial.imageUrl} alt={testimonial.name} />
                <div className="ml-4 flex-grow">
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-blue-600">{testimonial.university}</p>
                </div>
            </div>
        </div>
    );
};

const PathStep: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#4285F4]">
            {icon}
        </div>
        <div className="pt-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-gray-600">{description}</p>
        </div>
    </div>
);

const ProblemDiagram = () => {
    const problems = [
        { name: 'Высокий стресс', cx: 80, cy: 70, color: '#ef4444' }, // red-500
        { name: 'Низкая уверенность', cx: 420, cy: 70, color: '#f59e0b' }, // amber-500
        { name: 'Перегрузка информацией', cx: 80, cy: 230, color: '#3b82f6' }, // blue-500
        { name: 'Страх ошибки', cx: 420, cy: 230, color: '#8b5cf6' }, // violet-500
    ];

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-video min-h-[300px] sm:min-h-[400px] font-sans">
            <svg viewBox="0 0 500 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="foggy-blur-effect">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                    </filter>
                    <radialGradient id="fog-gradient-fill">
                        <stop offset="20%" stopColor="#f3f4f6" />
                        <stop offset="100%" stopColor="#e5e7eb" />
                    </radialGradient>
                </defs>

                {/* Connecting Lines */}
                <path d="M 100 85 C 160 110, 200 130, 240 145" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="5, 5" strokeLinecap="round" />
                <path d="M 400 85 C 340 110, 300 130, 260 145" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="5, 5" strokeLinecap="round" />
                <path d="M 100 215 C 160 190, 200 170, 240 155" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="5, 5" strokeLinecap="round" />
                <path d="M 400 215 C 340 190, 300 170, 260 155" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="5, 5" strokeLinecap="round" />

                {/* Central Fog Element */}
                <g transform="translate(250, 150)">
                    <circle cx="0" cy="0" r="80" fill="url(#fog-gradient-fill)" filter="url(#foggy-blur-effect)" />
                    <circle cx="0" cy="0" r="80" fill="url(#fog-gradient-fill)" opacity="0.9" />
                    <text textAnchor="middle" y="-5" fill="#4b5563" fontSize="16" fontWeight="bold">Проблемы многих</text>
                    <text textAnchor="middle" y="18" fill="#4b5563" fontSize="16" fontWeight="bold">абитуриентов</text>
                </g>

                {/* Problem Nodes */}
                {problems.map(({ name, cx, cy, color }) => (
                    <g key={name} transform={`translate(${cx}, ${cy})`} className="text-center">
                         <circle cx="0" cy="-10" r="6" fill={color} />
                         <text textAnchor="middle" y="15" fontSize="14" fill="#374151" className="font-semibold">
                            {name.split(' ')[0]}
                         </text>
                         {name.split(' ').length > 1 && (
                            <text textAnchor="middle" y="32" fontSize="14" fill="#374151" className="font-semibold">
                                {name.split(' ').slice(1).join(' ')}
                            </text>
                         )}
                    </g>
                ))}
            </svg>
        </div>
    );
};


const HomePage: React.FC = () => {
    const { setCurrentPage } = useAppContext();
    const [hoveredMentor, setHoveredMentor] = useState<number | null>(null);

    const pathSteps = [
      {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
          title: 'Заполните анкету',
          description: 'Ответьте на вопросы о ваших интересах, оценках и предпочтениях. Это займет не больше 10 минут.'
      },
      {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
          title: 'Получите рекомендации',
          description: 'Наш AI-алгоритм подберет для вас топ-3 вуза, подходящих именно вам, и определит ваши сильные стороны.'
      },
      {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8z" /></svg>,
          title: 'Выберите ментора',
          description: 'Свяжитесь с наставником из вуза вашей мечты. Он поможет составить портфолио и ответит на все вопросы.'
      },
      {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
          title: 'Пройдите обучение',
          description: 'Пройдите наш интерактивный курс, чтобы систематизировать знания, подготовить портфолио и быть во всеоружии.'
      },
      {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
          title: 'Подготовка и поступление',
          description: 'С помощью ментора соберите пакет документов и подайте заявку в университет вашей мечты.'
      }
    ];
    
    return (
        <div className="space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="text-center py-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Ваш <span className="text-[#4285F4]">компас</span> в мире высшего образования
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                    UniMap помогает абитуриентам из Казахстана выбрать правильный университет и специальность через персональные тесты, подбор вузов и консультации с менторами.
                </p>
                <button
                    onClick={() => setCurrentPage(Page.Onboarding)}
                    className="mt-10 bg-[#4285F4] text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-transform transform hover:scale-105 shadow-lg"
                >
                    Начать бесплатно
                </button>
            </section>
            
            {/* Problem Section */}
            <section className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Проблема: Туманное будущее</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Многие абитуриенты сталкиваются с огромным стрессом и неопределенностью при выборе вуза. Обилие информации, давление со стороны общества и страх сделать неверный шаг создают 'туман', мешающий увидеть ясный путь.
                    </p>
                </div>

                <div className="mt-12 bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
                    <ProblemDiagram />
                </div>
            </section>
            
            {/* Solution/Path Section */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ваш ясный путь к поступлению</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Мы превращаем хаос в понятный, пошаговый план. Всего 5 шагов отделяют вас от осознанного выбора.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200" aria-hidden="true"></div>
                        <div className="space-y-16">
                            {pathSteps.map((step, index) => <PathStep key={index} {...step} />)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mentors Section */}
            <section className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Познакомьтесь с нашими менторами</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Наши наставники — студенты и выпускники лучших вузов, которые прошли этот путь и готовы помочь вам.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mentors.map(mentor => (
                        <MentorCard 
                            key={mentor.id} 
                            mentor={mentor} 
                            isHovered={hoveredMentor === mentor.id}
                            isAnotherHovered={hoveredMentor !== null && hoveredMentor !== mentor.id}
                            onMouseEnter={() => setHoveredMentor(mentor.id)}
                            onMouseLeave={() => setHoveredMentor(null)}
                        />
                    ))}
                </div>
            </section>
            
            {/* Testimonials Section */}
            <section className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Что говорят наши пользователи</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                 </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
                <div className="bg-blue-600 text-white text-center py-16 px-6 rounded-3xl relative overflow-hidden bg-gradient-to-br from-[#4285F4] to-blue-700">
                     <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white/20 rounded-full -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 border-8 border-white/20 rounded-lg translate-x-16 translate-y-16 rotate-45"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold">Готовы развеять туман?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-blue-100">
                           Сделайте первый шаг к поступлению в университет мечты. Пройдите наш тест и получите первые персональные рекомендации уже через 5 минут.
                        </p>
                        <button
                            onClick={() => setCurrentPage(Page.Onboarding)}
                            className="mt-10 bg-white text-[#4285F4] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Найти свой путь
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;