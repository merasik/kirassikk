import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

const ConcernCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full transform transition-transform hover:-translate-y-2">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100 text-red-500">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const SolutionStep: React.FC<{ index: number; title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ index, title, children, icon }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-xl ring-4 ring-blue-100">{index}</div>
            <div className="w-px h-full bg-gray-300"></div>
        </div>
        <div className="pb-16">
            <div className="flex items-center mb-2">
                 <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-xl bg-blue-100 text-[#4285F4]">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{children}</p>
        </div>
    </div>
);

const GuaranteeCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </div>
        <div>
            <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{children}</p>
        </div>
    </div>
);


const ParentsPage: React.FC = () => {
    const { setCurrentPage } = useAppContext();

    return (
        <div className="space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="text-center py-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Ваш ребенок на пороге <span className="text-[#4285F4]">большого будущего</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                    Мы знаем, как важен для вас правильный выбор университета. UniMap создан, чтобы помочь вашему ребенку найти свой путь, а вам — обрести спокойствие.
                </p>
            </section>

            {/* Parent Concerns Section */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Мы понимаем ваши тревоги</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Выбор будущей профессии — один из самых ответственных этапов. Мы поможем развеять сомнения и сделать этот процесс прозрачным и управляемым.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ConcernCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} title="Правильный ли выбор?">
                        Как убедиться, что выбранная специальность действительно подходит ребенку и будет востребована в будущем?
                    </ConcernCard>
                    <ConcernCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} title="Не будет ли время потрачено зря?">
                        Что если через год ребенок поймет, что ошибся? Как минимизировать риски и сделать осознанный выбор с первого раза?
                    </ConcernCard>
                    <ConcernCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} title="Слишком много информации">
                        Рейтинги, отзывы, дни открытых дверей... Как не утонуть в потоке информации и выделить главное?
                    </ConcernCard>
                    <ConcernCard icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} title="Как помочь, не навредив?">
                        Как поддержать ребенка, направить его, но при этом не навязывать свое мнение и дать ему сделать самостоятельный выбор?
                    </ConcernCard>
                </div>
            </section>

            {/* Our Solution Section */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">От стресса к уверенности: наш подход</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        UniMap — это не просто тест. Это комплексная система, которая ведет абитуриента по четкому и понятному пути.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <SolutionStep index={1} title="Глубокое самопознание" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>
                        Все начинается с понимания себя. Наш психологический тест помогает выявить не только интересы, но и скрытые таланты и склонности ребенка, предлагая направления, о которых он мог и не задумываться.
                    </SolutionStep>
                    <SolutionStep index={2} title="Персональный подбор ВУЗов" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}>
                        Наш AI-алгоритм анализирует результаты теста, оценки и личные предпочтения, чтобы составить короткий список из 3-5 наиболее подходящих университетов. Это экономит время и фокусирует внимание на главном.
                    </SolutionStep>
                    <SolutionStep index={3} title="Поддержка от менторов" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8z" /></svg>}>
                        Ребенок получает возможность общаться со студентами из вузов мечты. Менторы делятся реальным опытом, помогают подготовить портфолио и отвечают на вопросы, на которые не ответят в приемной комиссии.
                    </SolutionStep>
                     <SolutionStep index={4} title="Интерактивное обучение" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}>
                        Наш курс в игровом формате превращает подготовку к поступлению из скучной рутины в увлекательное приключение. Это снижает стресс и помогает усваивать информацию эффективнее.
                    </SolutionStep>
                </div>
            </section>
            
            {/* Guarantees Section */}
            <section className="container mx-auto px-4 bg-white py-16 rounded-3xl shadow-xl border border-gray-100">
                 <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Наши гарантии: спокойствие для вас, уверенность для ребенка</h2>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <GuaranteeCard title="Достоверность информации">
                        Мы используем только проверенные данные с официальных сайтов университетов и регулярно их обновляем.
                    </GuaranteeCard>
                    <GuaranteeCard title="Безопасное сообщество">
                        Все менторы проходят верификацию. Мы создаем безопасную и поддерживающую среду для общения.
                    </GuaranteeCard>
                     <GuaranteeCard title="Развитие самостоятельности">
                        Мы не решаем за ребенка, а даем ему инструменты для принятия собственного, взвешенного решения. Это важный шаг к взрослой жизни.
                    </GuaranteeCard>
                    <GuaranteeCard title="Прозрачность процесса">
                        Вы всегда будете понимать, на каком этапе находится ваш ребенок и какие шаги ему предстоят дальше.
                    </GuaranteeCard>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
                <div className="bg-blue-600 text-white text-center py-16 px-6 rounded-3xl relative overflow-hidden bg-gradient-to-br from-[#4285F4] to-blue-700">
                    <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white/20 rounded-full -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 border-8 border-white/20 rounded-lg translate-x-16 translate-y-16 rotate-45"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold">Сделайте шаг к осознанному будущему вашего ребенка</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-blue-100">
                           Подарите ему возможность выбрать профессию по призванию. Зарегистрируйтесь на UniMap и сделайте первый шаг вместе.
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

export default ParentsPage;
