import React from 'react';
import { forumArticles } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

const Message: React.FC<{ name: string; text: string; time: string; avatarUrl: string; isOwn?: boolean }> = ({ name, text, time, avatarUrl, isOwn }) => (
    <div className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
        <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
            <div className={`p-3 rounded-xl max-w-xs ${isOwn ? 'bg-[#4285F4] text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                {!isOwn && <p className="font-semibold text-sm mb-1 text-blue-600">{name}</p>}
                <p>{text}</p>
            </div>
            <span className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>{time}</span>
        </div>
    </div>
);

const ChatWindow: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full max-h-[600px]">
        <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 text-center">{title}</h3>
        </div>
        <div className="flex-grow p-4 space-y-6 overflow-y-auto">
            {children}
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Напишите сообщение..."
                    className="w-full bg-white border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:ring-2 focus:ring-[#4285F4]/80 outline-none transition"
                    disabled
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#4285F4] text-white rounded-full hover:opacity-90 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);

const ArticleCard: React.FC<{ article: typeof forumArticles[0] }> = ({ article }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center p-6">
             <div className="absolute top-0 left-0 w-24 h-24 border-4 border-white/20 rounded-full -translate-x-10 -translate-y-10"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 border-8 border-white/20 rounded-lg translate-x-10 translate-y-10 rotate-45"></div>
            <div className="relative text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 h-14">{article.title}</h3>
            <p className="text-gray-600 mb-4 h-20 overflow-hidden">{article.snippet}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                    <p className="font-semibold text-gray-800">{article.authorName}</p>
                    <p className="text-sm text-blue-600">{article.authorUniversity}</p>
                </div>
                <a href="#" className="font-semibold text-[#4285F4] hover:text-opacity-80 transition-colors">
                    Читать &rarr;
                </a>
            </div>
        </div>
    </div>
);


const ForumPage: React.FC = () => {
    const { user, setCurrentPage } = useAppContext();

    if (!user) {
        return (
            <div className="text-center p-12 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800">Доступ к этому пространству откроется после регистрации</h2>
                <p className="mt-4 text-gray-600">
                    Присоединяйтесь к UniMap, чтобы общаться в чатах, задавать вопросы студентам и читать эксклюзивные статьи.
                </p>
                <button
                    onClick={() => setCurrentPage(Page.Onboarding)}
                    className="mt-8 bg-[#4285F4] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-colors shadow-lg transform hover:scale-105"
                >
                    Зарегистрироваться
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-24">
            {/* Intro Section */}
            <section className="relative text-center py-20 rounded-3xl overflow-hidden bg-gray-800">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#4285F4]/80 to-purple-500/80 opacity-90"></div>
                 <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-16 -translate-y-16 filter blur-xl"></div>
                 <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-16 translate-y-16 filter blur-xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Форум "Ассамблея"
                    </h1>
                    <p className="mt-6 text-lg text-gray-200">
                        Общайтесь с абитуриентами, задавайте вопросы студентам и получайте инсайдерскую информацию из первых уст.
                    </p>
                </div>
            </section>

            {/* Chats Section */}
            <section>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <ChatWindow title="Чат абитуриентов">
                            <Message name="Айсулу" text="Всем привет! Кто-нибудь подает в КБТУ на IT?" time="10:30" avatarUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" />
                            <Message name="Тимур" text="Я подаю! Уже готовлюсь к их внутреннему экзамену по математике." time="10:31" avatarUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" isOwn />
                            <Message name="Айсулу" text="Сложно? Я немного переживаю." time="10:32" avatarUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" />
                             <Message name="Тимур" text="Есть свои нюансы, но решаемо. Главное — нарешивать их прошлогодние тесты." time="10:33" avatarUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" isOwn />
                        </ChatWindow>
                        <a 
                            href="https://t.me/+S6oSVs7i2ugzYjQ6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full bg-[#2AABEE] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#259ad1] transition-colors shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.1-.86 1.32-1.74 1.32l-4.23-.28-4.42 4.13c-.5.48-1.2.23-1.45-.48z"/></svg>
                            <span>Чат абитуриентов в Telegram</span>
                        </a>
                    </div>
                    <div className="space-y-4">
                        <ChatWindow title="Вопрос-ответ со студентами">
                            <Message name="Камила" text="Привет! У меня вопрос к студентам NU. Насколько важны внеучебные достижения при поступлении?" time="12:01" avatarUrl="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=200&auto=format&fit=crop" />
                            <Message name="Айгерим (Ментор)" text="Привет, Камила! Очень важны. Приемная комиссия смотрит на вас как на личность, а не только на оценки. Волонтерство, проекты, лидерство — все это большой плюс." time="12:05" avatarUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" />
                            <Message name="Камила" text="Спасибо большое за ответ! Стало понятнее." time="12:06" avatarUrl="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=200&auto=format&fit=crop" />
                        </ChatWindow>
                         <a 
                            href="https://t.me/+2yr6rPokHQNlZWUy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full bg-[#2AABEE] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#259ad1] transition-colors shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.1-.86 1.32-1.74 1.32l-4.23-.28-4.42 4.13c-.5.48-1.2.23-1.45-.48z"/></svg>
                            <span>Чат со студентами в Telegram</span>
                        </a>
                    </div>
                 </div>
            </section>

            {/* My Life Articles Section */}
            <section>
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Life</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Реальные истории и советы от студентов, которые уже прошли этот путь.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {forumArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ForumPage;