import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

// Helper component for icons
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-[#4285F4]/10">
        {children}
    </div>
);

// Helper component for "Why Trust Us" cards
const TrustCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <IconWrapper>{icon}</IconWrapper>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
);

const AbstractFeatureCard: React.FC<{icon: React.ReactNode}> = ({ icon }) => (
    <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200/50 rounded-full"></div>
            <div className="absolute top-5 left-5 w-48 h-48 border-4 border-blue-200/50 rounded-full"></div>
            <div className="absolute top-10 right-5 w-4 h-4 bg-purple-200/50 rounded-full"></div>
            <div className="absolute bottom-10 left-5 w-8 h-8 bg-purple-200/50 rounded-full"></div>
            <div className="relative z-10 text-[#4285F4]">
                {icon}
            </div>
        </div>
    </div>
);

const AboutUsPage: React.FC = () => {
    const { setCurrentPage } = useAppContext();

    return (
        <div className="space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="relative text-center py-20 md:py-32 rounded-3xl overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-30 -translate-x-16 -translate-y-16 filter blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full opacity-30 translate-x-16 translate-y-16 filter blur-2xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
                        О <span className="text-[#4285F4]">UniMap</span>: Ваш личный навигатор в мире образования
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                        Мы — команда энтузиастов, которая верит, что правильный выбор университета может изменить жизнь. UniMap был создан, чтобы сделать этот сложный путь простым, осознанным и увлекательным.
                    </p>
                </div>
            </section>

            {/* Why Trust Us Section */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Почему нам можно доверять?</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Мы строим наш сервис на трех китах: экспертизе, персонализации и сообществе.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TrustCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4285F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6v-1a6 6 0 00-9-5.197" /></svg>}
                        title="Опытные менторы"
                    >
                        Наши наставники — это не теоретики, а студенты и недавние выпускники лучших вузов. Они прошли этот путь сами и готовы поделиться реальным, актуальным опытом поступления и учебы.
                    </TrustCard>
                    <TrustCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4285F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                        title="Умный подход"
                    >
                        Мы используем современные технологии, включая психологические тесты и анализ данных, чтобы ваши рекомендации были не просто списком вузов, а по-настояшему персональным планом действий.
                    </TrustCard>
                    <TrustCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4285F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8z" /></svg>}
                        title="Проверенная информация"
                    >
                        Вся информация в нашей базе данных регулярно обновляется и проверяется. Мы предоставляем только достоверные сведения о программах, требованиях к поступлению и особенностях университетов.
                    </TrustCard>
                </div>
            </section>
            
            {/* Our "Zest" Section */}
            <section className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">В чем наша изюминка?</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Мы создали не просто сервис, а целую экосистему, которая делает процесс поступления эффективным и мотивирующим.</p>
                </div>
                
                <div className="space-y-16">
                    {/* Feature 1: Ecosystem */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <span className="font-semibold text-blue-600">Экосистема</span>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Сообщество абитуриентов и студентов</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">UniMap — это живая платформа, где будущие студенты встречаются с теми, кто уже учится в университете мечты. Это прямой доступ к инсайдерской информации, возможность задать вопросы и получить поддержку от сверстников. Мы создаем мосты между поколениями студентов, формируя сильное и полезное комьюнити.</p>
                        </div>
                        <AbstractFeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                    </div>
                    
                    {/* Feature 2: Gamification */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                         <div className="md:w-1/2">
                            <span className="font-semibold text-blue-600">Игровой режим</span>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Превращаем рутину в приключение</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">Поступление — это марафон, а не спринт. Чтобы вы не потеряли мотивацию, мы разбили весь процесс на понятные шаги-квесты. Прошли тест — получили ачивку. Собрали портфолио — открыли новый уровень. Такой подход помогает отслеживать прогресс и делает сложный путь увлекательным.</p>
                        </div>
                        <AbstractFeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>} />
                    </div>
                    
                    {/* Feature 3: Bonus System */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <span className="font-semibold text-blue-600">Бонусная система</span>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Награды за ваши усилия</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">Мы ценим ваш труд и время. За каждое выполненное задание в системе вы зарабатываете UniCoins. Накопленные коины можно обменять на ценные призы: дополнительную консультацию с ментором, доступ к эксклюзивным вебинарам от приемных комиссий или скидки на курсы подготовки к экзаменам от наших партнеров.</p>
                        </div>
                         <AbstractFeatureCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01v.01M12 21v-1m0 1v.01M12 18v-1m0-1v-1m0-1V4m0 1.01v.01M6 12h.01M7 12h.01M8 12h.01M9 12h.01M10 12h.01M11 12h.01M12 12h.01M13 12h.01M14 12h.01M15 12h.01M16 12h.01M17 12h.01M18 12h.01" /></svg>} />
                    </div>
                </div>
            </section>
            
             {/* CTA Section */}
            <section className="container mx-auto px-4">
                <div className="bg-[#4285F4] text-white text-center py-16 px-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white/20 rounded-full -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 border-8 border-white/20 rounded-lg translate-x-16 translate-y-16 rotate-45"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold">Готовы начать свой путь?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-blue-100">
                           Сделайте первый шаг к поступлению в университет мечты. Пройдите наш тест и получите первые персональные рекомендации уже через 5 минут.
                        </p>
                        <button
                            onClick={() => setCurrentPage(Page.Onboarding)}
                            className="mt-10 bg-white text-[#4285F4] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Начать бесплатно
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;