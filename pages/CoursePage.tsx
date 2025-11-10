import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

// --- MOCK DATA ---
const themesData = [
    { 
        id: 'theme1', 
        title: 'Основы выбора', 
        description: 'Поймем, как найти свое призвание, сопоставить интересы с профессиями и выбрать подходящее направление.', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        gameData: {
            books: [
                { id: 'book1', title: 'Понимание себя', info: 'Первый шаг к выбору профессии — это самоанализ. Важно понять свои сильные стороны, интересы и ценности.', quiz: { question: 'Что является первым шагом в выборе профессии?', options: ['Самоанализ', 'Выбор ВУЗа', 'Подача документов'], answer: 'Самоанализ' } },
                { id: 'book2', title: 'Профессии будущего', info: 'Мир стремительно меняется. Изучайте тренды рынка труда, чтобы выбрать востребованную и перспективную специальность.', quiz: { question: 'Почему важно изучать тренды?', options: ['Чтобы выбрать перспективную специальность', 'Это не важно', 'Чтобы удивить друзей'], answer: 'Чтобы выбрать перспективную специальность' } },
                { id: 'book3', title: 'Сопоставление', info: 'Соотнесите свои интересы с существующими профессиями. Используйте тесты на профориентацию как один из инструментов.', quiz: { question: 'Что нужно соотнести?', options: ['Интересы и профессии', 'Бюджет и город', 'Рейтинг и престиж'], answer: 'Интересы и профессии' } },
            ],
            finalTest: [
                { id: 'q1', question: 'Какой главный принцип выбора профессии?', options: ['Осознанность и анализ', 'Следование за модой', 'Выбор родителей'], answer: 'Осознанность и анализ' },
                { id: 'q2', question: 'Для чего нужны тесты на профориентацию?', options: ['Как вспомогательный инструмент', 'Как единственно верное решение', 'Для развлечения'], answer: 'Как вспомогательный инструмент' },
            ]
        }
    },
    { 
        id: 'theme2', 
        title: 'Анализ ВУЗов', 
        description: 'Учимся исследовать университеты, сравнивать программы и понимать, что скрывается за рейтингами.', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        gameData: {
            books: [
                { id: 'book4', title: 'Рейтинги', info: 'Рейтинги — полезный, но не единственный критерий. Смотрите на методологию и учитывайте свои цели.', quiz: { question: 'Рейтинги это...', options: ['Абсолютная правда', 'Один из инструментов', 'Неважная информация'], answer: 'Один из инструментов' } },
                { id: 'book5', title: 'Учебный план', info: 'Изучите учебный план (curriculum). Он показывает, какие именно предметы вы будете изучать.', quiz: { question: 'Что показывает учебный план?', options: ['Стоимость обучения', 'Список предметов', 'Имена профессоров'], answer: 'Список предметов' } },
                { id: 'book6', title: 'Студ. жизнь', info: 'Внеучебная деятельность - важная часть опыта. Узнайте про клубы и сообщества.', quiz: { question: 'Почему важна студ. жизнь?', options: ['Для нетворкинга и развития', 'Это не важно', 'Только для развлечения'], answer: 'Для нетворкинга и развития' } },
            ],
            finalTest: [
                { id: 'q1', question: 'На что, кроме рейтинга, стоит обращать внимание?', options: ['На учебный план и профессоров', 'Только на расположение', 'Только на стоимость'], answer: 'На учебный план и профессоров' },
            ]
        }
    },
    { id: 'theme3', title: 'Портфолио чемпиона', description: 'Соберем пакет документов, который выделит вас: от академических достижений до внеучебной деятельности.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h9M7 16h6M7 8h6v4H7V8z" /></svg>, gameData: null },
    { id: 'theme4', title: 'Мастер эссе', description: 'Искусство написания мотивационных писем, которые читают до конца и запоминают.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l7.586-7.586z" /></svg>, gameData: null },
    { id: 'theme5', title: 'Подготовка к экзаменам', description: 'Стратегии и лайфхаки для успешной сдачи ЕНТ, IELTS и других вступительных тестов.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>, gameData: null },
    { id: 'theme6', title: 'День собеседования', description: 'Как произвести впечатление на приемную комиссию и уверенно ответить на самые каверзные вопросы.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, gameData: null },
];

const tasksData = [
    { id: 'task1', themeId: 'theme1', text: 'Пройти тест на профориентацию', completed: true, bonus: 10 },
    { id: 'task2', themeId: 'theme1', text: 'Составить список из 5 интересных профессий', completed: false, bonus: 15 },
    { id: 'task3', themeId: 'theme2', text: 'Выбрать 3 вуза для детального анализа', completed: false, bonus: 10 },
    { id: 'task4', themeId: 'theme2', text: 'Сравнить учебные планы по выбранной специальности', completed: false, bonus: 20 },
    { id: 'task5', themeId: 'theme3', text: 'Собрать все академические грамоты и сертификаты', completed: false, bonus: 15 },
    { id: 'task6', themeId: 'theme4', text: 'Написать первый черновик мотивационного письма', completed: false, bonus: 25 },
];

const exchangeItems = [
    { id: 'discount5', title: 'Скидка 5% на курсы подготовки', cost: 75 },
    { id: 'consultation', title: 'Доп. консультация с ментором', cost: 100 },
    { id: 'webinar', title: 'Доступ к закрытому вебинару', cost: 50 },
];

// --- GAME COMPONENTS ---

const QuizModal: React.FC<{ book: any; onAnswer: (isCorrect: boolean) => void; }> = ({ book, onAnswer }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleConfirm = () => {
        if (selectedOption === null) return;
        onAnswer(selectedOption === book.quiz.answer);
    };

    return (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full transform transition-all animate-in fade-in zoom-in-95">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-6">{book.info}</p>
                <div className="border-t pt-6">
                    <p className="font-semibold text-gray-800 mb-4">{book.quiz.question}</p>
                    <div className="space-y-3">
                        {book.quiz.options.map((opt: string) => (
                            <label key={opt} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedOption === opt ? 'bg-blue-100 border-blue-400' : 'border-gray-300 hover:bg-gray-50'}`}>
                                <input type="radio" name="quiz-option" value={opt} checked={selectedOption === opt} onChange={() => setSelectedOption(opt)} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-3 text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button onClick={handleConfirm} disabled={!selectedOption} className="w-full mt-6 bg-[#4285F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:bg-gray-400">
                    Подтвердить
                </button>
            </div>
        </div>
    );
};

const FinalTestModal: React.FC<{ test: any[]; onFinish: (score: number) => void; }> = ({ test, onFinish }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const isCompleted = Object.keys(answers).length === test.length;

    const handleSubmit = () => {
        let score = 0;
        test.forEach(q => {
            if (answers[q.id] === q.answer) {
                score++;
            }
        });
        onFinish(score);
    };

    return (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Итоговый тест</h2>
                <div className="space-y-8">
                    {test.map((q, index) => (
                        <div key={q.id}>
                            <p className="font-semibold text-gray-800 mb-3">{index + 1}. {q.question}</p>
                            <div className="space-y-2">
                                {q.options.map((opt: string) => (
                                    <label key={opt} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${answers[q.id] === opt ? 'bg-blue-100 border-blue-400' : 'border-gray-300 hover:bg-gray-50'}`}>
                                        <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-3 text-gray-700">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                 <button onClick={handleSubmit} disabled={!isCompleted} className="w-full mt-8 bg-[#4285F4] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:bg-gray-400">
                    Завершить
                </button>
            </div>
        </div>
    );
};


const GameModal: React.FC<{ theme: any; onClose: () => void; onComplete: (themeId: string) => void; }> = ({ theme, onClose, onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();
    const [gameState, setGameState] = useState<'playing' | 'quiz' | 'finalTest' | 'results'>('playing');
    const [activeBook, setActiveBook] = useState<any>(null);
    const [hitTargets, setHitTargets] = useState<string[]>([]);
    const [finalScore, setFinalScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const gameData = theme.gameData;

    const player = useMemo(() => ({ x: 80, y: 250 }), []);
    const mousePos = useRef({ x: 400, y: 250 });
    const arrow = useRef({ x: 0, y: 0, active: false, angle: 0, speed: 15 });

    const targets = useMemo(() => {
        if (!gameData?.books) return [];
        return gameData.books.map((book: any, index: number) => ({
            ...book,
            x: 700,
            y: 100 + index * 150,
            radius: 40,
        }));
    }, [gameData]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0f9ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw background elements
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(600, 0, 200, canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.font = 'bold 100px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('UniMap', 300, 280);

        // Draw targets
        targets.forEach(target => {
             const isHit = hitTargets.includes(target.id);
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
            
            if (isHit) {
                ctx.fillStyle = '#94a3b8';
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(target.x - 15, target.y);
                ctx.lineTo(target.x - 5, target.y + 10);
                ctx.lineTo(target.x + 15, target.y - 8);
                ctx.stroke();
            } else {
                ctx.fillStyle = '#ef4444';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(target.x, target.y, target.radius * 0.66, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(target.x, target.y, target.radius * 0.33, 0, Math.PI * 2);
                ctx.fillStyle = '#ef4444';
                ctx.fill();
            }
        });
        
        // Draw player and bow
        const angle = Math.atan2(mousePos.current.y - player.y, mousePos.current.x - player.x);
        
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(angle);
        
        // Bow
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, 40, -Math.PI / 2.5, Math.PI / 2.5);
        ctx.stroke();
        // Bowstring
        ctx.beginPath();
        ctx.moveTo(0, -35);
        ctx.lineTo(-20, 0);
        ctx.lineTo(0, 35);
        ctx.stroke();

        ctx.restore();

        // Player body
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw arrow
        if(arrow.current.active) {
            ctx.save();
            ctx.translate(arrow.current.x, arrow.current.y);
            ctx.rotate(arrow.current.angle);
            ctx.fillStyle = '#334155';
            ctx.fillRect(0, -1.5, 30, 3);
            ctx.beginPath();
            ctx.moveTo(30, 0);
            ctx.lineTo(25, -5);
            ctx.lineTo(25, 5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

    }, [targets, hitTargets, player]);

    const gameLoop = useCallback(() => {
        if (arrow.current.active) {
            arrow.current.x += Math.cos(arrow.current.angle) * arrow.current.speed;
            arrow.current.y += Math.sin(arrow.current.angle) * arrow.current.speed;

            // Check collision with targets
            targets.forEach(target => {
                if (!hitTargets.includes(target.id)) {
                    const distance = Math.hypot(arrow.current.x - target.x, arrow.current.y - target.y);
                    if (distance < target.radius) {
                        arrow.current.active = false;
                        setActiveBook(target);
                        setGameState('quiz');
                    }
                }
            });

            // Check if arrow is off-screen
            const canvas = canvasRef.current;
            if (canvas && (arrow.current.x < 0 || arrow.current.x > canvas.width || arrow.current.y < 0 || arrow.current.y > canvas.height)) {
                arrow.current.active = false;
            }
        }

        draw();
        animationFrameId.current = requestAnimationFrame(gameLoop);
    }, [draw, hitTargets, targets]);

    useEffect(() => {
        gameLoop();
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameLoop]);

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mousePos.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const handleCanvasClick = () => {
        if (gameState !== 'playing' || arrow.current.active) return;

        arrow.current.active = true;
        arrow.current.angle = Math.atan2(mousePos.current.y - player.y, mousePos.current.x - player.x);
        arrow.current.x = player.x;
        arrow.current.y = player.y;
    };


    const handleQuizAnswer = (isCorrect: boolean) => {
        if (isCorrect && activeBook) {
            const newHitTargets = [...hitTargets, activeBook.id];
            setHitTargets(newHitTargets);

            if (newHitTargets.length === targets.length) {
                setTimeout(() => setGameState('finalTest'), 500);
            } else {
                setGameState('playing');
            }
        } else {
            setGameState('playing');
        }
        setActiveBook(null);
    };

    const handleFinishTest = (score: number) => {
        setFinalScore(score);
        setGameState('results');
        if (score >= gameData.finalTest.length / 2) {
            onComplete(theme.id);
        }
        setTimeout(() => setShowResults(true), 100); 
    };

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
             <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Игровой режим: {theme.title}</h2>
            <div className="relative w-[800px] h-[500px]">
                <canvas 
                    ref={canvasRef} 
                    width="800" 
                    height="500" 
                    onClick={handleCanvasClick} 
                    onMouseMove={handleMouseMove}
                    className="bg-gray-100 rounded-lg shadow-inner cursor-crosshair"
                ></canvas>
                {gameState === 'quiz' && activeBook && <QuizModal book={activeBook} onAnswer={handleQuizAnswer} />}
                {gameState === 'finalTest' && <FinalTestModal test={gameData.finalTest} onFinish={handleFinishTest} />}
                {gameState === 'results' && (
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg transform transition-transform duration-700 ease-out ${showResults ? 'translate-y-0' : 'translate-y-[100%]'}`}>
                        <div className="bg-white rounded-t-2xl p-8 text-center shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)]">
                            <h2 className="text-3xl font-bold mb-4">Поздравляем!</h2>
                            <p className="text-lg">Ваш результат: {finalScore} / {gameData.finalTest.length}</p>
                            <p className="text-xl font-semibold mt-4">Вы заработали <span className="text-yellow-500">{(finalScore / gameData.finalTest.length * 50).toFixed(0)} UniCoins!</span></p>
                            <button onClick={onClose} className="mt-6 bg-[#4285F4] text-white px-6 py-3 rounded-lg font-semibold">
                                Вернуться к курсу
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENTS ---
const CoursePage: React.FC = () => {
    const { user, setCurrentPage } = useAppContext();
    const [activeTab, setActiveTab] = useState('game');
    const [tasks, setTasks] = useState(tasksData);
    const [isGameModalOpen, setIsGameModalOpen] = useState(false);
    const [selectedThemeForGame, setSelectedThemeForGame] = useState<any>(null);
    const [completedThemes, setCompletedThemes] = useState<string[]>([]);
    const [spentCoins, setSpentCoins] = useState(0);
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

    const toggleTask = (taskId: string) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    };

    const handleGameComplete = (themeId: string) => {
        if (!completedThemes.includes(themeId)) {
            setCompletedThemes(prev => [...prev, themeId]);
        }
    };
    
    const themesWithStatus = useMemo(() => {
        const completedSet = new Set(completedThemes);
        return themesData.map((theme, index) => {
            const isCompleted = completedSet.has(theme.id);
            const isLocked = !user && index > 0;
            return { ...theme, isCompleted, isLocked };
        });
    }, [completedThemes, user]);
    
    const earnedCoins = tasks.filter(t => t.completed).reduce((sum, task) => sum + task.bonus, 0);
    const totalBonus = earnedCoins - spentCoins;

    const goals = [
        { name: 'Выбрать направление', progress: tasks.filter(t => ['task1', 'task2'].includes(t.id) && t.completed).length / 2 * 100 },
        { name: 'Определиться с ВУЗом', progress: tasks.filter(t => ['task3', 'task4'].includes(t.id) && t.completed).length / 2 * 100 },
        { name: 'Собрать портфолио', progress: tasks.filter(t => ['task5', 'task6'].includes(t.id) && t.completed).length / 2 * 100 },
    ];

    const startGame = (theme: any) => {
        if (theme.gameData && !theme.isLocked) {
            setSelectedThemeForGame(theme);
            setIsGameModalOpen(true);
        }
    };
    
    const handlePurchase = (item: typeof exchangeItems[0]) => {
        if (totalBonus >= item.cost && !purchasedItems.includes(item.id)) {
            setSpentCoins(prev => prev + item.cost);
            setPurchasedItems(prev => [...prev, item.id]);
        }
    };

    const TabButton: React.FC<{ id: string; title: string; }> = ({ id, title }) => (
        <button
          onClick={() => setActiveTab(id)}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${activeTab === id ? 'bg-[#4285F4] text-white shadow-lg' : 'text-gray-600 hover:bg-blue-100'}`}
        >
          {title}
        </button>
      );

    return (
        <div className="max-w-6xl mx-auto">
            {isGameModalOpen && selectedThemeForGame && (
                <GameModal 
                    theme={selectedThemeForGame} 
                    onClose={() => setIsGameModalOpen(false)}
                    onComplete={handleGameComplete}
                />
            )}

            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Курс абитуриента</h1>
                <p className="text-xl text-gray-600">Ваш пошаговый план к поступлению в университет мечты.</p>
            </div>
            
            {!user && (
                <div className="mb-8 p-4 bg-blue-100 border border-blue-200 text-blue-800 rounded-2xl text-center shadow-sm">
                    <p>
                        <strong className="font-semibold">Только первая тема доступна для гостей.</strong>{' '}
                        {/* Fix: provide the page argument to setCurrentPage */}
                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Page.Onboarding); }} className="font-semibold underline hover:text-blue-600">
                            Зарегистрируйтесь
                        </a>
                        , чтобы разблокировать все темы и сохранить свой прогресс!
                    </p>
                </div>
            )}

            <div className="flex justify-center items-center space-x-4 mb-12 p-2 bg-gray-100 rounded-full">
                <TabButton id="game" title="Игровой режим" />
                <TabButton id="themes" title="Темы" />
                <TabButton id="tasks" title="Задания" />
                <TabButton id="tracker" title="Трекер целей" />
            </div>

            <div className="transition-all duration-500">
                {activeTab === 'game' && (
                     <div className="p-8 bg-white rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-center mb-2">Игровой режим: Tiro</h2>
                        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Превратите обучение в увлекательное приключение! Выбирайте тему, поражайте цели, отвечайте на вопросы и зарабатывайте UniCoins.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {themesWithStatus.map(theme => (
                                <div key={theme.id} className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${theme.isLocked ? 'border-gray-200 bg-gray-100 text-gray-400' : theme.gameData ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 bg-gray-50'}`}>
                                    {theme.isLocked && (
                                        <div className="absolute top-3 right-3" title="Тема заблокирована">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
                                        </div>
                                    )}
                                    <div className={`flex items-center space-x-4 mb-3 ${theme.isLocked ? 'opacity-50' : ''}`}>
                                        <div className="text-blue-500">{theme.icon}</div>
                                        <h3 className="text-xl font-bold text-gray-800">{theme.title}</h3>
                                    </div>
                                    <p className={`mb-4 flex-grow ${theme.isLocked ? 'opacity-50' : 'text-gray-600'}`}>{theme.description}</p>
                                    <button
                                        onClick={() => startGame(theme)}
                                        disabled={!theme.gameData || theme.isLocked}
                                        className={`w-full mt-auto text-white px-4 py-2 rounded-lg font-semibold transition ${
                                            theme.isLocked 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : theme.isCompleted 
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : theme.gameData
                                                        ? 'bg-[#4285F4] hover:opacity-90'
                                                        : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {theme.isLocked ? 'Заблокировано' : theme.isCompleted ? 'Пройдено ✓' : theme.gameData ? 'Начать игру' : 'Скоро'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'themes' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {themesWithStatus.map(theme => (
                            <div key={theme.id} className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${theme.isLocked ? 'opacity-50' : ''}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-blue-500">{theme.icon}</div>
                                        <h3 className="text-xl font-bold text-gray-800">{theme.title}</h3>
                                    </div>
                                     {theme.isCompleted && <span className="text-green-500" title="Тема пройдена">✓</span>}
                                     {theme.isLocked && <span className="text-gray-400" title="Заблокировано">🔒</span>}
                                </div>
                                <p className="text-gray-600 flex-grow">{theme.description}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'tasks' && (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3 bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold mb-6">Список заданий</h2>
                            <div className="space-y-4">
                                {tasks.map(task => (
                                    <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${task.completed ? 'bg-green-100/70' : 'bg-gray-100/70 hover:bg-gray-200/50'}`}>
                                        <div className="flex items-center">
                                            <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-4 ${task.completed ? 'bg-green-500' : 'border-2 border-gray-300'}`}>
                                                {task.completed && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <span className={`text-lg ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{task.text}</span>
                                        </div>
                                        <span className="text-lg font-semibold text-yellow-500">+{task.bonus} UniCoins</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-6 border-t">
                                <h2 className="text-3xl font-bold mb-6">Обмен ЮниКоинами</h2>
                                <div className="space-y-4">
                                    {exchangeItems.map(item => {
                                        const isPurchased = purchasedItems.includes(item.id);
                                        const canAfford = totalBonus >= item.cost;
                                        return (
                                            <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg ${isPurchased ? 'bg-gray-100' : 'bg-white border'}`}>
                                                <div>
                                                    <p className={`font-semibold ${isPurchased ? 'text-gray-500' : 'text-gray-800'}`}>{item.title}</p>
                                                    <p className={`text-sm ${isPurchased ? 'text-gray-400' : 'text-yellow-600'}`}>Стоимость: {item.cost} UniCoins</p>
                                                </div>
                                                <button 
                                                    onClick={() => handlePurchase(item)}
                                                    disabled={isPurchased || !canAfford}
                                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                                                        isPurchased 
                                                            ? 'bg-green-500 text-white cursor-default' 
                                                            : canAfford 
                                                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {isPurchased ? 'Приобретено' : 'Обменять'}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
                            <h3 className="text-2xl font-bold mb-2">Ваш баланс</h3>
                             <div className="text-6xl font-extrabold drop-shadow-lg mb-4">{totalBonus}</div>
                            <p className="text-lg font-semibold text-yellow-300">UniCoins</p>
                            <p className="mt-4 text-blue-100">Выполняйте задания, чтобы заработать больше и обменять на бонусы!</p>
                        </div>
                    </div>
                )}
                 {activeTab === 'tracker' && (
                    <div className="p-8 bg-white rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-center mb-8">Трекер ваших целей</h2>
                        <div className="space-y-8">
                            {goals.map(goal => (
                                <div key={goal.name}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-xl font-semibold text-gray-800">{goal.name}</h4>
                                        <span className="text-lg font-bold text-blue-600">{goal.progress.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${goal.progress}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursePage;
