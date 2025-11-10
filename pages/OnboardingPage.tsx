import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { UserProfile, QuestionnaireData, Mentor, University, ChatMessage } from '../types';
import { psychTestQuestions, mentors } from '../data/mockData';
import { analyzePsychTest, recommendUniversities } from '../services/geminiService';

const OnboardingPage: React.FC = () => {
    const { login } = useAppContext();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1
        fullName: '',
        nickname: '',
        email: '',
        password: '',
        // Step 2
        psychTest: {} as Record<string, string>,
        // Step 3
        budget: 1000000,
        region: '',
        avgGrade: 4.5,
        exams: '',
        preferences: '',
        studyFormat: 'hybrid' as 'online' | 'offline' | 'hybrid',
    });
    
    // State for results
    const [psychTestResults, setPsychTestResults] = useState<string[]>([]);
    const [recommendedUnis, setRecommendedUnis] = useState<University[]>([]);
    const [chatAnswers, setChatAnswers] = useState<string[]>([]);
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePsychTestChange = (questionId: string, answer: string) => {
        setFormData(prev => ({
            ...prev,
            psychTest: { ...prev.psychTest, [questionId]: answer }
        }));
    };
    
    const nextStep = () => setStep(s => s + 1);

    const handleSubmitStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if(formData.fullName && formData.nickname && formData.email && formData.password) {
            nextStep();
        }
    };
    
    const handleSubmitStep2 = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const results = await analyzePsychTest(formData.psychTest);
            setPsychTestResults(results);
            nextStep();
        } catch (error) {
            console.error("Error analyzing psych test:", error);
            alert("Произошла ошибка при анализе теста. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitStep3 = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const questionnaireData: QuestionnaireData = {
            fullName: formData.fullName,
            budget: Number(formData.budget),
            region: formData.region,
            avgGrade: Number(formData.avgGrade),
            exams: formData.exams,
            preferences: formData.preferences,
            studyFormat: formData.studyFormat,
        };
        try {
            const unis = await recommendUniversities(questionnaireData, psychTestResults);
            setRecommendedUnis(unis);
            nextStep(); // Move to the new chat step
        } catch (error) {
            console.error("Error recommending universities:", error);
            alert("Произошла ошибка при подборе университетов. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitStep4 = (finalAnswers: string[]) => {
      setChatAnswers(finalAnswers);
      nextStep();
    };
    
    const handleSelectMentor = (mentor: Mentor) => {
        setSelectedMentor(mentor);
        nextStep();
    }
    
    const TOTAL_STEPS = 7;

    useEffect(() => {
        if (step === TOTAL_STEPS && selectedMentor) {
            const questionnaireData: QuestionnaireData = {
                fullName: formData.fullName,
                budget: Number(formData.budget),
                region: formData.region,
                avgGrade: Number(formData.avgGrade),
                exams: formData.exams,
                preferences: formData.preferences,
                studyFormat: formData.studyFormat,
            };

            const finalUser: UserProfile = {
                fullName: formData.fullName,
                nickname: formData.nickname,
                email: formData.email,
                questionnaireData: questionnaireData,
                psychTestResults: psychTestResults,
                recommendedUniversities: recommendedUnis,
                chatConsultationAnswers: chatAnswers,
                chosenMentor: selectedMentor,
            };
            
            setTimeout(() => {
                login(finalUser);
            }, 3000); // Wait 3 seconds on the final screen before redirecting.
        }
    }, [step, selectedMentor, chatAnswers, formData, login, psychTestResults, recommendedUnis]);

    const renderStep = () => {
        const stepComponents = [
            <RegistrationStep key={1} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmitStep1} />,
            <PsychTestStep key={2} formData={formData} handlePsychTestChange={handlePsychTestChange} handleSubmit={handleSubmitStep2} isLoading={isLoading} />,
            <QuestionnaireStep key={3} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmitStep3} isLoading={isLoading} />,
            <ChatConsultationStep key={4} onSubmit={handleSubmitStep4} />,
            <UniversityResultsStep key={5} universities={recommendedUnis} nextStep={nextStep} />,
            <MentorSelectionStep key={6} handleSelectMentor={handleSelectMentor} />,
            <FinalStep key={7} />,
        ];
        return stepComponents[step - 1] || null;
    };
    

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100">
            <div className="mb-8">
                <p className="text-sm font-semibold text-blue-600 mb-2">Шаг {step} из {TOTAL_STEPS}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#4285F4] h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}></div>
                </div>
            </div>
            <div className="transition-opacity duration-500 ease-in-out">
                 {renderStep()}
            </div>
        </div>
    );
};

const FormInput: React.FC<{ label: string; name: string; value: string | number; onChange: any; type?: string; required?: boolean; as?: 'textarea' | 'select'; children?: React.ReactNode, placeholder?: string }> = ({ label, name, value, onChange, type = 'text', required = true, as, children, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {as === 'textarea' ? (
            <textarea id={name} name={name} value={value} onChange={onChange} required={required} rows={4} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/80 transition-shadow shadow-sm hover:shadow-md" />
        ) : as === 'select' ? (
            <select id={name} name={name} value={value} onChange={onChange} required={required} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/80 transition-shadow shadow-sm hover:shadow-md">
                {children}
            </select>
        ) : (
            <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/80 transition-shadow shadow-sm hover:shadow-md" />
        )}
    </div>
);

const RegistrationStep: React.FC<{
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleInputChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Регистрация</h2>
        <p className="text-center text-gray-600">Начнем с основ. Создайте свой аккаунт, чтобы сохранять прогресс.</p>
        <FormInput label="Полное имя" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Иванов Иван" />
        <FormInput label="Никнейм" name="nickname" value={formData.nickname} onChange={handleInputChange} placeholder="ivanov_i" />
        <FormInput label="Email" name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="ivan@example.com" />
        <FormInput label="Пароль" name="password" value={formData.password} onChange={handleInputChange} type="password" />
        <button type="submit" className="w-full bg-[#4285F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors">Далее</button>
    </form>
);

const PsychTestStep: React.FC<{
    formData: any;
    handlePsychTestChange: (questionId: string, answer: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}> = ({ formData, handlePsychTestChange, handleSubmit, isLoading }) => {
    const isCompleted = Object.keys(formData.psychTest).length === psychTestQuestions.length;
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">Тест на профориентацию</h2>
            <p className="text-center text-gray-600">Ответьте на несколько вопросов, чтобы мы могли определить ваши сильные стороны и интересы.</p>
            {psychTestQuestions.map(q => (
                <div key={q.id}>
                    <p className="font-semibold text-gray-800 mb-3">{q.text}</p>
                    <div className="space-y-2">
                        {q.options.map(opt => (
                            <label key={opt} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.psychTest[q.id] === opt ? 'bg-[#4285F4]/20 border-[#4285F4]' : 'border-gray-300 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={formData.psychTest[q.id] === opt}
                                    onChange={() => handlePsychTestChange(q.id, opt)}
                                    className="h-4 w-4 text-[#4285F4] focus:ring-[#4285F4]/80 border-gray-300"
                                />
                                <span className="ml-3 text-gray-800">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button type="submit" disabled={!isCompleted || isLoading} className="w-full bg-[#4285F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:bg-[#4285F4]/60 disabled:cursor-not-allowed flex items-center justify-center">
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Узнать результаты'}
            </button>
        </form>
    );
};

const QuestionnaireStep: React.FC<{
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}> = ({ formData, handleInputChange, handleSubmit, isLoading }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Ваши предпочтения</h2>
        <p className="text-center text-gray-600">Теперь давайте уточним детали, чтобы подобрать идеальные университеты.</p>
        <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Ваш примерный бюджет на обучение (в тенге/год)</label>
            <input id="budget" name="budget" type="range" min="500000" max="10000000" step="100000" value={formData.budget} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center font-semibold text-blue-600 mt-2">{Number(formData.budget).toLocaleString()} ₸</div>
        </div>
        <FormInput label="Предпочтительный город/регион для обучения" name="region" value={formData.region} onChange={handleInputChange} placeholder="Например, Алматы, Астана, или страна" />
        <FormInput label="Ваш средний балл (GPA)" name="avgGrade" value={formData.avgGrade} onChange={handleInputChange} type="number" />
        <FormInput label="Сданные экзамены и баллы (ЕНТ, IELTS, SAT и т.д.)" name="exams" value={formData.exams} onChange={handleInputChange} placeholder="ЕНТ: 125, IELTS: 7.5" />
        <FormInput label="Ваши предпочтения и пожелания" name="preferences" value={formData.preferences} onChange={handleInputChange} as="textarea" placeholder="Например, 'хочу вуз с сильной программой по AI и возможностью стажировок в IT-компаниях'." />
        <FormInput label="Предпочитаемый формат обучения" name="studyFormat" value={formData.studyFormat} onChange={handleInputChange} as="select">
            <option value="offline">Оффлайн</option>
            <option value="online">Онлайн</option>
            <option value="hybrid">Гибридный</option>
        </FormInput>
        <button type="submit" disabled={isLoading} className="w-full bg-[#4285F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:bg-[#4285F4]/60 flex items-center justify-center">
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : 'Подобрать университеты'}
        </button>
    </form>
);

const ChatConsultationStep: React.FC<{ onSubmit: (answers: string[]) => void }> = ({ onSubmit }) => {
    const questions = [
        "Отлично! Теперь давайте подготовимся к мотивационному письму. Расскажите о вашем самом значимом достижении (в учебе или вне ее), которое, по вашему мнению, демонстрирует ваш потенциал.",
        "Прекрасно. Теперь опишите случай, когда вы проявили лидерские качества или инициативу. Это может быть школьный проект, организация мероприятия или что-то еще.",
        "И последний вопрос: что для вас самое важное при выборе университета, помимо качества образования? (Например, студенческое сообщество, возможности для исследований, карьерные перспективы и т.д.)"
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(true);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: questions[currentQuestionIndex] }]);
                setIsTyping(false);
            }, 1500);
        } else {
            setIsTyping(true);
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: "Спасибо за ваши ответы! Мы используем их для построения вашего уникального профиля. Нажмите 'Далее', чтобы продолжить." }]);
                setIsTyping(false);
                onSubmit(answers);
            }, 1500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex]);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);


    const handleSend = () => {
        if (inputValue.trim() === '' || currentQuestionIndex >= questions.length) return;
        
        const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: inputValue }];
        setMessages(newMessages);
        setAnswers(prev => [...prev, inputValue]);
        setInputValue('');
        setCurrentQuestionIndex(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">Мини-консультация с AI</h2>
            <p className="text-center text-gray-600">Ответьте на несколько вопросов. Это поможет ментору лучше понять вас и подготовить сильное портфолио.</p>
            <div className="h-96 bg-gray-100 rounded-lg p-4 flex flex-col space-y-4 overflow-y-auto border">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                         <div className={`p-3 rounded-xl max-w-sm ${msg.sender === 'user' ? 'bg-[#4285F4] text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-end gap-2">
                        <div className="p-3 rounded-xl max-w-sm bg-white text-gray-800 rounded-bl-none shadow-sm flex items-center space-x-2">
                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                        </div>
                    </div>
                )}
                 <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ваш ответ..."
                    disabled={isTyping || currentQuestionIndex >= questions.length}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#4285F4]/80"
                />
                <button
                    onClick={handleSend}
                    disabled={isTyping || currentQuestionIndex >= questions.length}
                    className="bg-[#4285F4] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 disabled:bg-[#4285F4]/60"
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

const UniversityResultsStep: React.FC<{
    universities: University[];
    nextStep: () => void;
}> = ({ universities, nextStep }) => (
    <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Ваши персональные рекомендации</h2>
        <p className="text-gray-600">На основе ваших ответов, мы подобрали для вас 3 наиболее подходящих университета.</p>
        <div className="space-y-4">
            {universities.map(uni => (
                <div key={uni.id} className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
                    <img src={uni.logoUrl} alt={uni.name} className="h-16 w-16 object-contain mr-4" />
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-gray-800">{uni.name}</h3>
                        <p className="text-gray-500">{uni.city}, {uni.country}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={nextStep} className="w-full bg-[#4285F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors">Далее</button>
    </div>
);

const MentorSelectionStep: React.FC<{
    handleSelectMentor: (mentor: Mentor) => void;
}> = ({ handleSelectMentor }) => (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Выберите своего ментора</h2>
        <p className="text-center text-gray-600">Наши менторы — студенты и выпускники лучших вузов. Они помогут вам на каждом этапе поступления.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mentors.map(mentor => (
                <div key={mentor.id} className="border rounded-lg p-4 text-center transition-shadow hover:shadow-lg flex flex-col items-center">
                    <img src={mentor.imageUrl} alt={mentor.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                    <h3 className="font-bold text-lg text-gray-800">{mentor.name}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-2 flex-grow">{mentor.specialization}</p>
                    <button onClick={() => handleSelectMentor(mentor)} className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors w-full">
                        Выбрать
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const FinalStep: React.FC = () => (
    <div className="text-center space-y-6 py-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#4285F4] mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <h2 className="text-3xl font-bold text-gray-900">Поздравляем! Ваш профиль готов!</h2>
        <p className="text-gray-600 max-w-md mx-auto">Вы успешно прошли все этапы. Теперь у вас есть персональный план, рекомендованные вузы и ментор. Вся информация доступна в вашем профиле.</p>
        <p className="font-semibold text-gray-800">Вы будете автоматически перенаправлены на страницу профиля.</p>
    </div>
);

export default OnboardingPage;