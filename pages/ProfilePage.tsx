import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

const ProfileCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-blue-600 mb-4">{title}</h3>
        <div className="space-y-2 text-gray-700">
            {children}
        </div>
    </div>
);

const ProfilePage: React.FC = () => {
    const { user, setCurrentPage } = useAppContext();

    if (!user) {
        return (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">Просмотр профиля</h2>
                <p className="mt-4 text-gray-600 max-w-md mx-auto">
                    Войдите в свой аккаунт или зарегистрируйтесь, чтобы увидеть свой персональный план поступления.
                </p>
                <button 
                    onClick={() => setCurrentPage(Page.Onboarding)}
                    className="mt-6 bg-[#4285F4] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                >
                    Войти или Зарегистрироваться
                </button>
            </div>
        );
    }

    const { questionnaireData, psychTestResults, recommendedUniversities, chosenMentor } = user;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-6 mb-10">
                 <div className="w-24 h-24 rounded-full bg-[#4285F4] text-white flex items-center justify-center text-5xl font-bold">
                    {user.nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">{user.fullName}</h1>
                    <p className="text-xl text-gray-500">@{user.nickname}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileCard title="Данные анкеты">
                    {questionnaireData ? (
                        <>
                            <p><strong>Бюджет:</strong> {questionnaireData.budget.toLocaleString()} ₸/год</p>
                            <p><strong>Регион:</strong> {questionnaireData.region}</p>
                            <p><strong>Средний балл:</strong> {questionnaireData.avgGrade}</p>
                            <p><strong>Экзамены:</strong> {questionnaireData.exams}</p>
                            <p><strong>Формат обучения:</strong> {questionnaireData.studyFormat}</p>
                        </>
                    ) : <p>Анкета еще не заполнена.</p>}
                </ProfileCard>
                
                <ProfileCard title="Результаты тестов">
                    {psychTestResults ? (
                        <>
                            <p className="font-semibold">Рекомендованные направления:</p>
                            <ul className="list-disc list-inside">
                                {psychTestResults.map((field, index) => <li key={index}>{field}</li>)}
                            </ul>
                        </>
                    ) : <p>Психологический тест еще не пройден.</p>}
                </ProfileCard>

                <ProfileCard title="Рекомендованные ВУЗы">
                     {recommendedUniversities ? (
                        <ul className="list-disc list-inside">
                            {recommendedUniversities.map(uni => <li key={uni.id}>{uni.name}</li>)}
                        </ul>
                    ) : <p>Пока нет рекомендаций.</p>}
                </ProfileCard>
                
                <ProfileCard title="Ваш Ментор">
                    {chosenMentor ? (
                        <div className="flex items-center space-x-4">
                            <img src={chosenMentor.imageUrl} alt={chosenMentor.name} className="w-16 h-16 rounded-full"/>
                            <div>
                                <p className="font-bold">{chosenMentor.name}</p>
                                <p className="text-sm text-blue-600">{chosenMentor.specialization}</p>
                            </div>
                        </div>
                    ) : <p>Ментор еще не выбран.</p>}
                </ProfileCard>
            </div>
             {!questionnaireData && (
                <div className="mt-10 text-center">
                    <button 
                        onClick={() => setCurrentPage(Page.Onboarding)} 
                        className="bg-[#4285F4] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                    >
                        Заполнить анкету для получения рекомендаций
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;