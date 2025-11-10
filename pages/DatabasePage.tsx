import React, { useState, useMemo } from 'react';
import { universities, professions } from '../data/mockData';
import { University, Profession } from '../types';

// --- SHARED ICONS ---
const UniversityIcon: React.FC = () => (
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#4285F4]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
        </svg>
    </div>
);

const ProfessionIcon: React.FC = () => (
    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    </div>
);


// --- UNIVERSITY-RELATED COMPONENTS ---
const UniversityCard: React.FC<{ university: University, isSelected: boolean, onSelect: () => void, onCompareToggle: () => void, isComparing: boolean }> = ({ university, isSelected, onSelect, onCompareToggle, isComparing }) => {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-200">
      <div className="flex items-center p-4">
        <div className="flex-grow">
          <button onClick={onSelect} className="w-full text-left flex items-center justify-between">
            <div className="flex items-center">
                <UniversityIcon />
                <div className="ml-4">
                    <h3 className="font-bold text-lg text-gray-800">{university.name}</h3>
                    <p className="text-gray-500">{university.city}, {university.country}</p>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${isSelected ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="pl-4 border-l border-gray-200 ml-4">
            <label className="flex items-center space-x-2 cursor-pointer" title="Выбрать для сравнения">
                <input type="checkbox" checked={isComparing} onChange={onCompareToggle} className="h-5 w-5 rounded text-[#4285F4] focus:ring-[#4285F4]/50 border-gray-300" />
            </label>
        </div>
      </div>
      {isSelected && (
        <div className="p-6 bg-blue-50/30 border-t border-gray-200 space-y-6">
          
          <div>
            <h4 className="font-bold text-blue-600 text-lg mb-2">1. Базовая информация</h4>
            <p className="text-gray-800">{university.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-blue-600 text-lg mb-2">2. Как поступить</h4>
            <p className="text-gray-800">{university.admissionInfo}</p>
          </div>

          <div>
            <h4 className="font-bold text-blue-600 text-lg mb-3">3. Необходимые экзамены</h4>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-gray-800">Экзамен</th>
                            <th className="p-3 text-sm font-semibold text-gray-800">Мин. балл</th>
                            <th className="p-3 text-sm font-semibold text-gray-800">Дедлайн</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {university.requiredExams.map((exam, index) => (
                             <tr key={index} className="hover:bg-gray-100/50">
                                <td className="p-3 text-base text-gray-800 font-medium">{exam.name}</td>
                                <td className="p-3 text-base text-gray-800"><span className="font-mono bg-blue-100 text-blue-800 py-1 px-2 rounded-md">{exam.minScore}</span></td>
                                <td className="p-3 text-base text-gray-700">{exam.deadline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-blue-600 text-lg mb-3">4. Популярные специальности</h4>
             <ul className="space-y-2">
                {university.popularMajors.map((major, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm">
                        <span className="text-gray-800">{major.name}</span>
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full">{major.subjectCombination}</span>
                    </li>
                ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-blue-600 text-lg mb-2">5. Теги</h4>
             <div className="flex flex-wrap gap-2">
                {university.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full">{tag}</span>
                ))}
              </div>
          </div>
          
          <div className="pt-4">
             <a
                href={university.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#4285F4] text-white px-5 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-md"
              >
                6. Перейти на сайт приемной комиссии
              </a>
          </div>
        </div>
      )}
    </div>
  );
};

const UniversitiesView: React.FC<{
    onStartRanking: () => void;
    onStartComparison: () => void;
    compareList: number[];
    setCompareList: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({ onStartRanking, onStartComparison, compareList, setCompareList }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        universities.forEach(uni => {
            uni.tags.forEach(tag => tags.add(tag));
        });
        const countries = ['Казахстан', 'США', 'Канада', 'Великобритания', 'Швейцария', 'Германия'];
        const otherTags = Array.from(tags).filter(t => !countries.includes(t)).sort();
        return [...countries, ...otherTags];
    }, []);

    const filteredUniversities = useMemo(() => {
        return universities.filter(uni => {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = uni.name.toLowerCase().includes(lowerSearchTerm) || 
                                  uni.city.toLowerCase().includes(lowerSearchTerm) ||
                                  uni.country.toLowerCase().includes(lowerSearchTerm);
            const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => uni.tags.includes(filter));
            return matchesSearch && matchesFilters;
        });
    }, [searchTerm, activeFilters]);

    const handleFilterToggle = (tag: string) => {
        setActiveFilters(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };
  
    const handleCompareToggle = (id: number) => {
        setCompareList(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div className="sticky top-24 bg-[#F7F9FC]/80 backdrop-blur-md z-20 py-4 mb-6 rounded-b-lg -mx-4 px-4">
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Поиск по названию, городу или стране..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4285F4]/50 focus:border-[#4285F4] transition"
                    />
                    <button 
                        onClick={onStartRanking} 
                        className="bg-white text-blue-600 px-5 py-3 rounded-lg font-semibold border-2 border-blue-200 hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap"
                        title="Показать рейтинг университетов"
                    >
                       🏆 Рейтинг
                    </button>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button 
                                key={tag}
                                onClick={() => handleFilterToggle(tag)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeFilters.includes(tag) ? 'bg-[#4285F4] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {tag}
                            </button>
                        ))}
                        {activeFilters.length > 0 && (
                            <button onClick={() => setActiveFilters([])} className="text-sm font-semibold text-[#4285F4] hover:underline">
                                Сбросить
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredUniversities.length > 0 ? filteredUniversities.map(uni => (
                    <UniversityCard
                        key={uni.id}
                        university={uni}
                        isSelected={selectedId === uni.id}
                        onSelect={() => setSelectedId(selectedId === uni.id ? null : uni.id)}
                        onCompareToggle={() => handleCompareToggle(uni.id)}
                        isComparing={compareList.includes(uni.id)}
                    />
                )) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>Университеты не найдены.</p>
                        <p>Попробуйте изменить поисковый запрос или сбросить фильтры.</p>
                    </div>
                )}
            </div>
      
            {compareList.length > 0 && (
                <div className="fixed bottom-8 right-8 z-50">
                    <button 
                        onClick={onStartComparison}
                        className="bg-[#4285F4] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition-transform transform hover:scale-105"
                    >
                        Сравнить ({compareList.length})
                    </button>
                </div>
            )}
        </>
    );
};


// --- PROFESSION-RELATED COMPONENTS ---
const ProfessionCard: React.FC<{ profession: Profession, isSelected: boolean, onSelect: () => void }> = ({ profession, isSelected, onSelect }) => {
    const relatedUniversities = useMemo(() => {
        return profession.relatedUniversityIds
            .map(id => universities.find(uni => uni.id === id))
            .filter(Boolean) as University[];
    }, [profession.relatedUniversityIds]);

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:border-purple-200">
            <button onClick={onSelect} className="w-full text-left flex items-center justify-between p-4">
                <div className="flex items-center">
                    <ProfessionIcon />
                    <div className="ml-4">
                        <h3 className="font-bold text-lg text-gray-800">{profession.name}</h3>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${isSelected ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isSelected && (
                <div className="p-6 bg-purple-50/30 border-t border-gray-200 space-y-6">
                    <div>
                        <h4 className="font-bold text-purple-600 text-lg mb-2">Описание профессии</h4>
                        <p className="text-gray-800">{profession.description}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-purple-600 text-lg mb-3">Профильные предметы</h4>
                        <div className="flex flex-wrap gap-2">
                            {profession.requiredSubjects.map(subject => (
                                <span key={subject} className="px-3 py-1 text-sm font-semibold bg-purple-100 text-purple-800 rounded-full">{subject}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-purple-600 text-lg mb-2">Перспективы</h4>
                        <p className="text-gray-800">{profession.prospects}</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-purple-600 text-lg mb-3">Где учиться</h4>
                         <ul className="space-y-2">
                            {relatedUniversities.map(uni => (
                                <li key={uni.id} className="flex items-center p-2 bg-white rounded-md shadow-sm">
                                    <img src={uni.logoUrl} alt="" className="h-6 w-6 object-contain mr-3"/>
                                    <span className="text-gray-800">{uni.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-purple-600 text-lg mb-2">Теги</h4>
                        <div className="flex flex-wrap gap-2">
                            {profession.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfessionsView: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        professions.forEach(prof => {
            prof.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, []);

    const filteredProfessions = useMemo(() => {
        return professions.filter(prof => {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = prof.name.toLowerCase().includes(lowerSearchTerm);
            const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => prof.tags.includes(filter));
            return matchesSearch && matchesFilters;
        });
    }, [searchTerm, activeFilters]);

    const handleFilterToggle = (tag: string) => {
        setActiveFilters(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <>
            <div className="sticky top-24 bg-[#F7F9FC]/80 backdrop-blur-md z-20 py-4 mb-6 rounded-b-lg -mx-4 px-4">
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Поиск по названию профессии..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
                    />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button 
                                key={tag}
                                onClick={() => handleFilterToggle(tag)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeFilters.includes(tag) ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {tag}
                            </button>
                        ))}
                        {activeFilters.length > 0 && (
                            <button onClick={() => setActiveFilters([])} className="text-sm font-semibold text-purple-600 hover:underline">
                                Сбросить
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredProfessions.length > 0 ? filteredProfessions.map(prof => (
                    <ProfessionCard
                        key={prof.id}
                        profession={prof}
                        isSelected={selectedId === prof.id}
                        onSelect={() => setSelectedId(selectedId === prof.id ? null : prof.id)}
                    />
                )) : (
                     <div className="text-center py-12 text-gray-500">
                        <p>Профессии не найдены.</p>
                    </div>
                )}
            </div>
        </>
    );
};

// --- VIEWS FOR RANKING & COMPARISON (University-specific) ---
const RankingView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const rankedUniversities = useMemo(() => {
        return [...universities]
            .filter(uni => uni.ranking)
            .sort((a, b) => (b.ranking || 0) - (a.ranking || 0));
    }, []);

    return (
        <div>
            <button onClick={onBack} className="mb-6 text-[#4285F4] font-semibold hover:underline">&larr; Назад к списку</button>
            <h2 className="text-3xl font-bold text-center mb-8">Рейтинг университетов</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {rankedUniversities.map((uni, index) => (
                        <li key={uni.id} className="flex items-center p-4 hover:bg-gray-100/50 transition-colors">
                            <span className="text-2xl font-bold text-gray-400 w-12 text-center">{index + 1}</span>
                            <div className="mx-4"><UniversityIcon /></div>
                            <div className="flex-grow">
                                <p className="font-bold text-gray-800">{uni.name}</p>
                                <p className="text-sm text-gray-500">{uni.city}, {uni.country}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-[#4285F4] text-lg">{uni.ranking}</p>
                                <p className="text-sm text-gray-500">балл</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ComparisonView: React.FC<{ universityIds: number[], onBack: () => void }> = ({ universityIds, onBack }) => {
    const selectedUniversities = universities.filter(uni => universityIds.includes(uni.id));

    if (selectedUniversities.length === 0) {
        return (
             <div className="text-center p-8">
                <p>Выберите университеты для сравнения.</p>
                <button onClick={onBack} className="mt-4 text-[#4285F4] font-semibold hover:underline">&larr; Назад к списку</button>
            </div>
        )
    }

    const features = [
        { key: 'name', label: 'Название ВУЗа' },
        { key: 'country', label: 'Страна' },
        { key: 'city', label: 'Город' },
        { key: 'ranking', label: 'Рейтинг UniMap' },
        { key: 'description', label: 'Ключевые преимущества' },
        { key: 'admissionInfo', label: 'Особенности поступления' },
    ];

    return (
        <div>
            <button onClick={onBack} className="mb-6 text-[#4285F4] font-semibold hover:underline">&larr; Назад к списку</button>
            <h2 className="text-3xl font-bold text-center mb-8">Сравнение университетов</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                <table className="w-full min-w-max border-collapse">
                    <thead className="sticky top-0 bg-gray-100 z-10">
                        <tr>
                            <th className="p-4 text-left font-bold text-gray-800 border-b-2 border-gray-200 w-1/5">Характеристика</th>
                            {selectedUniversities.map(uni => (
                                <th key={uni.id} className="p-4 text-left font-semibold border-b-2 border-l border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10"><UniversityIcon /></div>
                                        <span className="font-bold text-gray-800">{uni.name}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, index) => (
                            <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-4 font-semibold text-gray-800 align-top border-b border-gray-200">{feature.label}</td>
                                {selectedUniversities.map(uni => (
                                    <td key={uni.id} className="p-4 align-top text-gray-700 border-b border-l border-gray-200">
                                        {(uni as any)[feature.key] || 'Н/Д'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                         <tr className={(features.length) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="p-4 font-semibold text-gray-800 align-top border-b border-gray-200">Сайт приемной комиссии</td>
                            {selectedUniversities.map(uni => (
                                <td key={uni.id} className="p-4 align-top border-b border-l border-gray-200">
                                    <a href={uni.applicationLink} target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline font-semibold">Перейти &rarr;</a>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const DatabasePage: React.FC = () => {
  const [activeView, setActiveView] = useState<'universities' | 'professions'>('universities');
  const [pageState, setPageState] = useState<'list' | 'comparison' | 'ranking'>('list');
  const [compareList, setCompareList] = useState<number[]>([]);

  const handleStartComparison = () => setPageState('comparison');
  const handleStartRanking = () => setPageState('ranking');
  const handleBackToList = () => {
    setPageState('list');
    // Do not reset compare list here, so user can go back and forth
  };

  if (pageState === 'ranking') {
    return <div className="max-w-5xl mx-auto"><RankingView onBack={handleBackToList} /></div>;
  }
  
  if (pageState === 'comparison') {
    return <div className="max-w-7xl mx-auto"><ComparisonView universityIds={compareList} onBack={handleBackToList} /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">База данных</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Исследуйте университеты и профессии, чтобы найти свой путь.
        </p>
      </div>

      <div className="flex justify-center mb-8 p-1.5 bg-gray-200/80 rounded-full">
        <button
          onClick={() => setActiveView('universities')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'universities' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600'}`}
        >
          Университеты
        </button>
        <button
          onClick={() => setActiveView('professions')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === 'professions' ? 'bg-white text-purple-600 shadow-md' : 'text-gray-600'}`}
        >
          Профессии
        </button>
      </div>

      {activeView === 'universities' ? (
        <UniversitiesView
          onStartRanking={handleStartRanking}
          onStartComparison={handleStartComparison}
          compareList={compareList}
          setCompareList={setCompareList}
        />
      ) : (
        <ProfessionsView />
      )}
    </div>
  );
};

export default DatabasePage;