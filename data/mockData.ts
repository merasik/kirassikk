import { University, Mentor, Testimonial, UserProfile, Profession } from '../types';

export const mentors: Mentor[] = [
  { 
    id: 1, 
    name: 'Айгерим Султанова', 
    specialization: 'IT & Computer Science (США и Канада)', 
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    details: 'Выпускница Stanford University, помогает с поступлением в топовые IT-вузы Северной Америки. Опыт работы в Google.'
  },
  { 
    id: 2, 
    name: 'Дмитрий Орлов', 
    specialization: 'Инженерия и Технологии (Европа)', 
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    details: 'Окончил ETH Zurich. Специализируется на подаче документов в технические университеты Германии, Швейцарии и Нидерландов.'
  },
  { 
    id: 3, 
    name: 'Гульнара Ибраева', 
    specialization: 'Бизнес и Экономика (Казахстан)', 
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    details: 'Эксперт по программам MBA и экономическим факультетам в КБТУ, KIMEP и NU. Поможет составить сильное мотивационное письмо.'
  },
  { 
    id: 4, 
    name: 'Артур Ким', 
    specialization: 'Медицина и Бионауки', 
    imageUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=800&auto=format&fit=crop',
    details: 'Выпускник КазНМУ им. Асфендиярова, имеет опыт поступления в медицинские вузы Европы. Консультирует по экзаменам UCAT и BMAT.'
   },
];

export const universities: University[] = [
  // Kazakhstan
  {
    id: 1,
    name: 'Nazarbayev University (NU)',
    city: 'Астана',
    country: 'Казахстан',
    description: 'Ведущий исследовательский университет в Центральной Азии, предлагающий образование по западным стандартам. Отличается сильным профессорско-преподавательским составом, современной инфраструктурой и фокусом на научные исследования.',
    admissionInfo: 'Поступление многоэтапное: онлайн-регистрация на портале, загрузка документов, сдача стандартизированных тестов и прохождение собеседования (для некоторых программ). Важно продемонстрировать не только академические успехи, но и внеучебную деятельность.',
    requiredExams: [
      { name: 'IELTS / TOEFL', minScore: '6.5 / 79', deadline: 'Декабрь' },
      { name: 'SAT / ACT / NUET', minScore: '1240 / 26 / 120', deadline: 'Декабрь-Январь' }
    ],
    popularMajors: [
      { name: 'Computer Science', subjectCombination: 'Физ-Мат' },
      { name: 'Robotics and Mechatronics', subjectCombination: 'Физ-Мат' },
      { name: 'Economics', subjectCombination: 'Мат-Гео' },
      { name: 'Political Science and International Relations', subjectCombination: 'История / Англ' },
    ],
    applicationLink: 'https://nu.edu.kz/admissions',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Nazarbayev_University_logo.svg/1200px-Nazarbayev_University_logo.svg.png',
    tags: ['Казахстан', 'IT', 'Инженерия', 'Бизнес', 'Наука', 'Астана', 'Международный стандарт'],
    ranking: 85
  },
  {
    id: 2,
    name: 'Казахстанско-Британский Технический Университет (КБТУ)',
    city: 'Алматы',
    country: 'Казахстан',
    description: 'Элитный технический вуз, известный своими тесными связями с нефтегазовой и IT-индустриями. Сильнейшие программы по нефтегазовому делу, информационным технологиям и финансам.',
    admissionInfo: 'Поступление осуществляется через портал КБТУ. Основные критерии - высокие баллы ЕНТ и успешная сдача внутреннего экзамена KBTU Profile Subject Test. Учитывается средний балл аттестата (GPA).',
    requiredExams: [
      { name: 'ЕНТ', minScore: '70+', deadline: 'Июнь' },
      { name: 'KBTU Profile Subject Test', minScore: '50/100', deadline: 'Июль' },
      { name: 'IELTS (для англ. отделения)', minScore: '5.5+', deadline: 'Август' }
    ],
    popularMajors: [
      { name: 'Information Systems', subjectCombination: 'Физ-Мат' },
      { name: 'Petroleum Engineering', subjectCombination: 'Физ-Мат' },
      { name: 'Finance', subjectCombination: 'Мат-Гео' },
    ],
    applicationLink: 'https://kbtu.edu.kz/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/9/91/KBTU_logo.png/250px-KBTU_logo.png',
    tags: ['Казахстан', 'IT', 'Инженерия', 'Бизнес', 'Алматы', 'Нефтегаз'],
    ranking: 80
  },
  {
    id: 3,
    name: 'Satbayev University',
    city: 'Алматы',
    country: 'Казахстан',
    description: 'Первый и ведущий технический вуз Казахстана, национальный исследовательский университет. Фундаментальная подготовка в области горного дела, металлургии, геологии и других инженерных наук.',
    admissionInfo: 'Зачисление происходит на основании государственных образовательных грантов по результатам ЕНТ. Необходимо подать заявление через портал электронного правительства egov.kz.',
    requiredExams: [
        { name: 'ЕНТ', minScore: '50+ (зависит от специальности)', deadline: 'Июнь' }
    ],
    popularMajors: [
        { name: 'Metallurgy and Mineral Processing', subjectCombination: 'Физ-Хим' },
        { name: 'Geology and Exploration of Mineral Deposits', subjectCombination: 'Физ-Мат' },
        { name: 'Automation and Control', subjectCombination: 'Физ-Мат' },
    ],
    applicationLink: 'https://satbayev.university/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Satbayev_University_logo.svg/2560px-Satbayev_University_logo.svg.png',
    tags: ['Казахстан', 'Инженерия', 'Наука', 'Алматы', 'Промышленность'],
    ranking: 75
  },
  {
    id: 4,
    name: 'Astana IT University',
    city: 'Астана',
    country: 'Казахстан',
    description: 'Профильный университет, созданный для подготовки высококлассных специалистов в сфере цифровых технологий. Обучение ведется на английском языке с фокусом на проектную деятельность.',
    admissionInfo: 'Поступление на основе конкурса грантов. Требуются баллы ЕНТ по профильным предметам и сертификат IELTS. Для абитуриентов без IELTS проводится внутренний экзамен по английскому языку.',
    requiredExams: [
        { name: 'ЕНТ', minScore: '70+', deadline: 'Июнь' },
        { name: 'IELTS', minScore: '6.0', deadline: 'Август' }
    ],
    popularMajors: [
        { name: 'Software Engineering', subjectCombination: 'Физ-Мат' },
        { name: 'Big Data Analysis', subjectCombination: 'Физ-Мат' },
        { name: 'Cybersecurity', subjectCombination: 'Физ-Мат' },
    ],
    applicationLink: 'https://astanait.edu.kz/',
    logoUrl: 'https://astanait.edu.kz/wp-content/uploads/2022/07/aitu-logo-en.png',
    tags: ['Казахстан', 'IT', 'Астана', 'Big Data', 'Кибербезопасность'],
    ranking: 70
  },
  {
    id: 5,
    name: 'Университет КИМЭП (KIMEP)',
    city: 'Алматы',
    country: 'Казахстан',
    description: 'Признанный лидер в области бизнес-образования, экономики и права в Центральной Азии. Обучение полностью на английском языке, американская модель образования, программы двойного диплома.',
    admissionInfo: 'Поступление происходит через внутренние тесты KIMEP. Необходимо пройти KIMEP English Placement Test (KEPT) и тест по математике (для некоторых специальностей). Баллы ЕНТ не требуются.',
    requiredExams: [
        { name: 'KIMEP English Placement Test (KEPT)', minScore: 'Проходной балл', deadline: 'Июль' },
        { name: 'IELTS / TOEFL (альтернатива KEPT)', minScore: '6.0 / 60', deadline: 'Август' }
    ],
    popularMajors: [
        { name: 'Business Administration', subjectCombination: 'Любая' },
        { name: 'Economics', subjectCombination: 'Мат-Гео' },
        { name: 'International Law', subjectCombination: 'История / Англ' },
    ],
    applicationLink: 'https://kimep.kz/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/KIMEP_University_Logo.png',
    tags: ['Казахстан', 'Бизнес', 'Право', 'Алматы', 'Экономика', 'Международный стандарт'],
    ranking: 78
  },
  {
    id: 6,
    name: 'КазНУ им. аль-Фараби',
    city: 'Алматы',
    country: 'Казахстан',
    description: 'Один из крупнейших и старейших классических университетов страны. Предлагает самый широкий спектр специальностей: от естественных и гуманитарных наук до медицины и юриспруденции.',
    admissionInfo: 'Основной критерий для поступления на грант - это баллы ЕНТ. Конкурс и проходные баллы сильно варьируются в зависимости от факультета. Самый большой вуз по количеству государственных грантов.',
    requiredExams: [
        { name: 'ЕНТ', minScore: '50+ (зависит от специальности)', deadline: 'Июнь' }
    ],
    popularMajors: [
        { name: 'General Medicine', subjectCombination: 'Хим-Био' },
        { name: 'Jurisprudence', subjectCombination: 'История / Человек.Общество.Право' },
        { name: 'Biology and Biotechnology', subjectCombination: 'Хим-Био' },
    ],
    applicationLink: 'https://www.kaznu.kz/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/KazNU_Logo.png/800px-KazNU_Logo.png',
    tags: ['Казахстан', 'Наука', 'Медицина', 'Гуманитарные науки', 'Алматы', 'Классический вуз'],
    ranking: 72
  },
  // North America
  {
    id: 7,
    name: 'Massachusetts Institute of Technology (MIT)',
    city: 'Cambridge',
    country: 'США',
    description: 'Мировой эталон в области науки, инженерии и технологий. Славится своей культурой инноваций, междисциплинарными исследованиями и выпускниками, меняющими мир.',
    admissionInfo: 'Подача документов через портал MIT Application. Требуется заполнение подробной анкеты, написание нескольких эссе, предоставление рекомендаций и результатов тестов. Важно продемонстрировать исключительные достижения в STEM.',
    requiredExams: [
      { name: 'SAT / ACT', minScore: '1500+ / 34+', deadline: '1 января' },
      { name: 'TOEFL', minScore: '100+', deadline: '1 января' }
    ],
    popularMajors: [
        { name: 'Computer Science and Engineering', subjectCombination: 'Физ-Мат' },
        { name: 'Mechanical Engineering', subjectCombination: 'Физ-Мат' },
        { name: 'Physics', subjectCombination: 'Физ-Мат' },
    ],
    applicationLink: 'https://mitadmissions.org/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png',
    tags: ['США', 'IT', 'Инженерия', 'Наука', 'Топ-10 мира'],
    ranking: 99
  },
  {
    id: 8,
    name: 'Stanford University',
    city: 'Stanford',
    country: 'США',
    description: 'Один из самых престижных и избирательных университетов мира, расположенный в сердце Кремниевой долины. Синергия первоклассного образования, передовых исследований и предпринимательского духа.',
    admissionInfo: 'Подача документов через платформу Common App. Помимо блестящих академических показателей, приемная комиссия ищет студентов с уникальной историей, лидерским потенциалом и стремлением оказать влияние на общество.',
    requiredExams: [
      { name: 'SAT / ACT', minScore: '1480+ / 33+', deadline: '2 января' },
      { name: 'TOEFL', minScore: '100+', deadline: '2 января' }
    ],
    popularMajors: [
        { name: 'Computer Science', subjectCombination: 'Физ-Мат' },
        { name: 'Economics', subjectCombination: 'Мат-Гео' },
        { name: 'Human Biology', subjectCombination: 'Хим-Био' },
    ],
    applicationLink: 'https://admission.stanford.edu/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png',
    tags: ['США', 'IT', 'Инженерия', 'Бизнес', 'Наука', 'Топ-10 мира'],
    ranking: 98
  },
  {
    id: 9,
    name: 'University of Toronto',
    city: 'Toronto',
    country: 'Канада',
    description: 'Ведущий исследовательский университет Канады, входящий в число лучших в мире. Предлагает огромное разнообразие программ и известен своими прорывными исследованиями, в частности в области искусственного интеллекта.',
    admissionInfo: 'Подача заявки через Ontario Universities\' Application Centre (OUAC). Требуются высокие академические показатели в аттестате, подтверждение владения английским. Для некоторых программ (инженерия, бизнес) могут потребоваться дополнительные эссе или видео-интервью.',
    requiredExams: [
      { name: 'IELTS / TOEFL', minScore: '6.5 / 100', deadline: '15 января' }
    ],
    popularMajors: [
        { name: 'Computer Science', subjectCombination: 'Физ-Мат' },
        { name: 'Commerce (Rotman)', subjectCombination: 'Мат-Гео' },
        { name: 'Life Sciences', subjectCombination: 'Хим-Био' },
    ],
    applicationLink: 'https://future.utoronto.ca/',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/University_of_Toronto_logo.svg/1200px-University_of_Toronto_logo.svg.png',
    tags: ['Канада', 'IT', 'Инженерия', 'Бизнес', 'Наука', 'Топ-вуз Канады'],
    ranking: 92
  },
  // Europe
  {
    id: 10,
    name: 'University of Oxford',
    city: 'Oxford',
    country: 'Великобритания',
    description: 'Один из старейших и самых знаменитых университетов мира с уникальной коллегиальной системой. Славится гуманитарными, социальными и медицинскими науками.',
    admissionInfo: 'Процесс подачи через UCAS. Включает предоставление прогнозируемых оценок A-levels (или эквивалент), сильное мотивационное письмо (personal statement), рекомендации, а для большинства курсов - вступительные тесты и обязательное собеседование.',
    requiredExams: [
      { name: 'IELTS / TOEFL', minScore: '7.5 / 110', deadline: '15 октября' },
      { name: 'Varies (e.g., TSA, LNAT, MAT)', minScore: 'Зависит от теста', deadline: 'Сентябрь' }
    ],
    popularMajors: [
        { name: 'Philosophy, Politics and Economics (PPE)', subjectCombination: 'История / Англ' },
        { name: 'Medicine', subjectCombination: 'Хим-Био' },
        { name: 'Law', subjectCombination: 'История / Англ' },
    ],
    applicationLink: 'https://www.ox.ac.uk/admissions',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1200px-Oxford-University-Circlet.svg.png',
    tags: ['Великобритания', 'Наука', 'Медицина', 'Гуманитарные науки', 'Право', 'Топ-10 мира'],
    ranking: 97
  },
  {
    id: 11,
    name: 'ETH Zurich',
    city: 'Zurich',
    country: 'Швейцария',
    description: 'Швейцарский федеральный технологический институт, один из ведущих мировых университетов в области науки и технологий. Родина более 20 нобелевских лауреатов, включая Альберта Эйнштейна.',
    admissionInfo: 'Требуется либо аттестат, признаваемый эквивалентным швейцарскому, либо сдача сложных вступительных экзаменов (Aufnahmeprüfung). Обучение на бакалавриате преимущественно на немецком языке. Высокие требования к математике и естественным наукам.',
    requiredExams: [
        { name: 'Goethe-Zertifikat (German)', minScore: 'C1', deadline: '30 апреля' },
        { name: 'Entrance Examination (if needed)', minScore: 'Проходной балл', deadline: 'Январь' }
    ],
    popularMajors: [
        { name: 'Mechanical Engineering', subjectCombination: 'Физ-Мат' },
        { name: 'Computer Science', subjectCombination: 'Физ-Мат' },
        { name: 'Architecture', subjectCombination: 'Творческий' },
    ],
    applicationLink: 'https://ethz.ch/en/studies/admission.html',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/ETH_logo_black.svg/2560px-ETH_logo_black.svg.png',
    tags: ['Швейцария', 'IT', 'Инженерия', 'Наука', 'Топ-вуз Европы'],
    ranking: 95
  },
  {
    id: 12,
    name: 'Technical University of Munich (TUM)',
    city: 'Munich',
    country: 'Германия',
    description: 'Один из лучших технических университетов Европы, "Университет предпринимательства". Сильные связи с промышленностью, особенно с автомобильной и IT-сферами. Высокий уровень исследований.',
    admissionInfo: 'Подача документов через портал TUMonline. Для многих программ с ограниченным набором (NC) требуется прохождение процедуры оценки способностей (aptitude assessment), которая может включать собеседование или тест. Важен высокий средний балл аттестата.',
    requiredExams: [
        { name: 'IELTS / TOEFL (for English programs)', minScore: '6.5 / 88', deadline: '15 июля' },
        { name: 'TestAS (recommended)', minScore: 'Выше среднего', deadline: 'Май' }
    ],
    popularMajors: [
        { name: 'Informatics', subjectCombination: 'Физ-Мат' },
        { name: 'Management and Technology', subjectCombination: 'Мат-Гео' },
        { name: 'Electrical Engineering', subjectCombination: 'Физ-Мат' },
    ],
    applicationLink: 'https://www.tum.de/en/studies/application',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/TU_M%C3%BCnchen_Logo.svg/2560px-TU_M%C3%BCnchen_Logo.svg.png',
    tags: ['Германия', 'IT', 'Инженерия', 'Топ-вуз Европы'],
    ranking: 90
  },
];

export const professions: Profession[] = [
  {
    id: 1,
    name: 'Разработчик ПО (Software Engineer)',
    description: 'Проектирует, разрабатывает, тестирует и поддерживает программное обеспечение для компьютеров и приложений. Работает с различными языками программирования и технологиями.',
    requiredSubjects: ['Математика (профиль)', 'Информатика', 'Физика', 'Английский язык'],
    prospects: 'Одна из самых востребованных профессий в мире. Высокая зарплата, возможности удаленной работы и карьерного роста до тимлида, архитектора или CTO.',
    relatedUniversityIds: [1, 2, 4, 7, 8, 9, 11, 12],
    tags: ['IT', 'Программирование', 'Технологии', 'Высокий спрос']
  },
  {
    id: 2,
    name: 'Аналитик данных (Data Scientist)',
    description: 'Собирает, обрабатывает и анализирует большие объемы данных для выявления тенденций, создания прогнозов и помощи бизнесу в принятии решений. Использует статистику, машинное обучение и визуализацию.',
    requiredSubjects: ['Математика (профиль)', 'Информатика', 'Статистика'],
    prospects: 'Ключевая роль в любой современной компании. Огромный спрос на рынке, интересные задачи и возможность влиять на бизнес-стратегию.',
    relatedUniversityIds: [1, 4, 7, 8, 9, 11],
    tags: ['IT', 'Big Data', 'Аналитика', 'Машинное обучение']
  },
  {
    id: 3,
    name: 'Врач (General Medicine)',
    description: 'Диагностирует, лечит и предотвращает заболевания, оказывает медицинскую помощь людям. Требует глубоких знаний в области биологии, химии и анатомии.',
    requiredSubjects: ['Биология', 'Химия', 'Физика'],
    prospects: 'Стабильная, уважаемая и социально значимая профессия. Требует длительного обучения, но предлагает пожизненную карьеру и возможность помогать людям.',
    relatedUniversityIds: [6, 10],
    tags: ['Медицина', 'Наука', 'Биология', 'Помощь людям']
  },
  {
    id: 4,
    name: 'Маркетолог-аналитик',
    description: 'Изучает рынок, поведение потребителей и эффективность рекламных кампаний. Разрабатывает стратегии для продвижения продуктов и услуг, используя цифровые инструменты и анализ данных.',
    requiredSubjects: ['Математика', 'Экономика', 'Обществознание'],
    prospects: 'Креативная и динамичная сфера. Маркетологи нужны в любой отрасли. Возможность работать с известными брендами и влиять на их успех.',
    relatedUniversityIds: [1, 5, 8, 9],
    tags: ['Маркетинг', 'Бизнес', 'Аналитика', 'Креатив']
  },
  {
    id: 5,
    name: 'Инженер-робототехник',
    description: 'Проектирует, создает и обслуживает роботов и автоматизированные системы для промышленности, медицины, космоса и бытового использования.',
    requiredSubjects: ['Математика (профиль)', 'Физика', 'Информатика'],
    prospects: 'Профессия на стыке механики, электроники и программирования. Огромные перспективы в связи с автоматизацией всех сфер жизни.',
    relatedUniversityIds: [1, 3, 7, 11],
    tags: ['Инженерия', 'IT', 'Робототехника', 'Будущее']
  },
  {
    id: 6,
    name: 'Финансовый аналитик',
    description: 'Оценивает инвестиционные возможности, анализирует финансовое состояние компаний, составляет прогнозы и дает рекомендации по управлению активами.',
    requiredSubjects: ['Математика', 'Экономика', 'Финансы'],
    prospects: 'Работа в банках, инвестиционных фондах, крупных корпорациях. Высокий уровень ответственности и соответствующая оплата труда.',
    relatedUniversityIds: [2, 5, 8],
    tags: ['Финансы', 'Бизнес', 'Аналитика', 'Инвестиции']
  },
  {
    id: 7,
    name: 'Архитектор',
    description: 'Проектирует здания и городские пространства, сочетая в своей работе творчество, инженерные знания и социальную ответственность.',
    requiredSubjects: ['Математика', 'Черчение', 'Рисунок', 'История искусств'],
    prospects: 'Возможность создавать объекты, которые будут служить людям десятилетиями. Требует развитого пространственного мышления и креативности.',
    relatedUniversityIds: [3, 11],
    tags: ['Творчество', 'Инженерия', 'Дизайн', 'Строительство']
  },
  {
    id: 8,
    name: 'Юрист (Международное право)',
    description: 'Специализируется на правовых отношениях между государствами, международными организациями и частными лицами. Работает с договорами, разрешает споры.',
    requiredSubjects: ['История', 'Обществознание', 'Английский язык'],
    prospects: 'Карьера в международных корпорациях, правительственных организациях, ООН. Требует аналитического склада ума и безупречного владения языками.',
    relatedUniversityIds: [5, 6, 10],
    tags: ['Право', 'Гуманитарные науки', 'Международные отношения']
  },
  {
    id: 9,
    name: 'UI/UX Дизайнер',
    description: 'Проектирует пользовательские интерфейсы для сайтов и приложений, делая их удобными, понятными и эстетически привлекательными.',
    requiredSubjects: ['Информатика', 'Искусство', 'Психология'],
    prospects: 'Ключевая роль в создании любого цифрового продукта. Высокий спрос, творческая работа и возможность видеть результат своего труда в действии.',
    relatedUniversityIds: [1, 2, 4],
    tags: ['IT', 'Дизайн', 'Творчество', 'Психология']
  },
  {
    id: 10,
    name: 'Инженер-нефтяник',
    description: 'Занимается разведкой, бурением, добычей и транспортировкой нефти и газа. Требует глубоких знаний в геологии, физике и химии.',
    requiredSubjects: ['Математика (профиль)', 'Физика', 'Химия'],
    prospects: 'Стратегически важная отрасль для Казахстана. Высокие зарплаты и работа над масштабными проектами. Требует готовности к командировкам.',
    relatedUniversityIds: [2, 3],
    tags: ['Инженерия', 'Промышленность', 'Нефтегаз', 'Казахстан']
  },
  { id: 11, name: 'Специалист по кибербезопасности', description: 'Защищает компьютерные системы и сети от хакерских атак, вирусов и утечек данных. Анализирует уязвимости и разрабатывает защитные меры.', requiredSubjects: ['Информатика', 'Математика', 'Физика'], prospects: 'Спрос на этих специалистов растет экспоненциально с цифровизацией мира. Критически важная и высокооплачиваемая работа.', relatedUniversityIds: [4, 1, 2, 7], tags: ['IT', 'Кибербезопасность', 'Защита данных', 'Высокий спрос'] },
  { id: 12, name: 'Биотехнолог', description: 'Использует живые организмы и биологические процессы для создания новых продуктов в медицине, сельском хозяйстве и промышленности.', requiredSubjects: ['Биология', 'Химия', 'Математика'], prospects: 'Передовая научная область, решающая глобальные проблемы: от создания новых лекарств до производства биотоплива.', relatedUniversityIds: [6, 1, 9], tags: ['Наука', 'Биология', 'Медицина', 'Инновации'] },
  { id: 13, name: 'Менеджер проектов (Project Manager)', description: 'Планирует, организует и контролирует выполнение проектов, управляя командой, бюджетом и сроками. Требует лидерских и организаторских качеств.', requiredSubjects: ['Математика', 'Экономика', 'Информатика'], prospects: 'Универсальная профессия, востребованная в IT, строительстве, консалтинге и многих других сферах. Отличный карьерный путь.', relatedUniversityIds: [5, 1, 12], tags: ['Бизнес', 'Управление', 'IT', 'Организация'] },
  { id: 14, name: 'Эколог', description: 'Изучает взаимодействие живых организмов с окружающей средой, оценивает влияние человеческой деятельности на природу и разрабатывает меры по ее защите.', requiredSubjects: ['Биология', 'География', 'Химия'], prospects: 'Растущая актуальность в связи с глобальными экологическими проблемами. Работа в госструктурах, НКО и промышленных компаниях.', relatedUniversityIds: [6, 1], tags: ['Наука', 'Экология', 'Биология', 'География'] },
  { id: 15, name: 'Психолог', description: 'Помогает людям справляться с эмоциональными и поведенческими проблемами, проводит консультации, диагностику и терапию.', requiredSubjects: ['Биология', 'Обществознание'], prospects: 'Растет понимание важности ментального здоровья. Возможность частной практики, работы в клиниках, школах, компаниях.', relatedUniversityIds: [1, 6], tags: ['Медицина', 'Гуманитарные науки', 'Помощь людям', 'Психология'] },
  { id: 16, name: 'Логист', description: 'Организует и управляет потоками товаров, информации и финансов от точки производства до конечного потребителя. Оптимизирует доставку и хранение.', requiredSubjects: ['Математика', 'География', 'Экономика'], prospects: 'Ключевая роль в мировой торговле и e-commerce. Спрос растет вместе с развитием онлайн-магазинов и глобальных поставок.', relatedUniversityIds: [2, 5], tags: ['Бизнес', 'Транспорт', 'Экономика', 'Организация'] },
  { id: 17, name: 'Журналист / Медиаспециалист', description: 'Собирает, обрабатывает и распространяет информацию через различные каналы: от традиционных СМИ до блогов и социальных сетей. Создает контент.', requiredSubjects: ['Литература', 'История', 'Иностранный язык'], prospects: 'Динамичная и творческая профессия. Требует умения быстро ориентироваться в информации, писать и работать с мультимедиа.', relatedUniversityIds: [5, 6, 1], tags: ['Творчество', 'Гуманитарные науки', 'Медиа', 'Коммуникации'] },
  { id: 18, name: 'HR-специалист (Менеджер по персоналу)', description: 'Занимается подбором, адаптацией, обучением и мотивацией сотрудников в компании. Формирует корпоративную культуру.', requiredSubjects: ['Обществознание', 'Психология', 'Экономика'], prospects: 'Важная роль в любой компании. Помогает строить эффективные команды и развивать таланты.', relatedUniversityIds: [5, 1], tags: ['Бизнес', 'Управление', 'Психология', 'Коммуникации'] },
  { id: 19, name: 'Энергетик', description: 'Проектирует, обслуживает и модернизирует системы производства, передачи и распределения энергии, включая возобновляемые источники.', requiredSubjects: ['Физика', 'Математика', 'Информатика'], prospects: 'Стратегически важная отрасль. Перспективы связаны с переходом на "зеленую" энергетику и повышением энергоэффективности.', relatedUniversityIds: [3, 12], tags: ['Инженерия', 'Промышленность', 'Энергетика', 'Экология'] },
  { id: 20, name: 'Специалист по международным отношениям', description: 'Анализирует политические, экономические и культурные связи между странами. Работает в дипломатии, международных организациях, аналитических центрах.', requiredSubjects: ['История', 'География', 'Иностранный язык'], prospects: 'Карьера в МИД, посольствах, международных фондах. Требует широкого кругозора, аналитических способностей и навыков ведения переговоров.', relatedUniversityIds: [1, 5, 6, 10], tags: ['Гуманитарные науки', 'Политика', 'Международные отношения', 'Коммуникации'] }
];


export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Айжан',
      university: 'Поступила в Nazarbayev University',
      text: 'Благодаря UniMap я не только выбрала вуз мечты, но и составила такое портфолио, что меня приняли без проблем! Ментор был на связи 24/7.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Санжар',
      university: 'Поступил в КБТУ',
      text: 'Психологический тест точно определил мои склонности к программированию. Дальше все пошло как по маслу. Спасибо за четкий план действий!',
      imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Мадина',
      university: 'Поступила в University of Toronto',
      text: 'Я была в полной растерянности, но анкета и консультация с ментором помогли разложить все по полочкам. Процесс поступления за границу перестал казаться страшным.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    }
];

export const psychTestQuestions = [
    {
        id: 'q1',
        text: 'Что вам интереснее?',
        options: ['Работать с людьми и помогать им', 'Анализировать данные и находить закономерности', 'Создавать что-то новое своими руками', 'Управлять процессами и организовывать людей']
    },
    {
        id: 'q2',
        text: 'В какой обстановке вы чувствуете себя наиболее продуктивным?',
        options: ['В тихом кабинете, в одиночестве', 'В команде, обсуждая идеи', 'В динамичной среде, где постоянно что-то меняется', 'В творческой мастерской или лаборатории']
    },
    {
        id: 'q3',
        text: 'Какая задача вас больше привлекает?',
        options: ['Решить сложную математическую задачу', 'Написать убедительный текст или статью', 'Разработать дизайн для нового продукта', 'Провести успешные переговоры']
    },
    {
        id: 'q4',
        text: 'Что для вас важнее в будущей работе?',
        options: ['Стабильность и четкий график', 'Возможность для творчества и самовыражения', 'Высокий доход и карьерный рост', 'Польза для общества и помощь другим']
    },
     {
        id: 'q5',
        text: 'Как вы относитесь к риску?',
        options: ['Предпочитаю избегать', 'Готов рисковать ради большой цели', 'Рискую, только если все тщательно просчитал', 'Риск - это часть любой интересной работы']
    }
];

export const forumArticles = [
  {
    id: 1,
    title: 'Как я прошел в КБТУ на грант, готовясь всего 3 месяца',
    authorName: 'Алихан Муратов',
    authorUniversity: 'Студент, КБТУ',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    snippet: 'Многие думают, что для поступления в топ-вуз нужно готовиться годами. Я расскажу свою историю, как сфокусированная подготовка и правильная стратегия помогли мне...'
  },
  {
    id: 2,
    title: 'Мой опыт поступления в Европу: ошибки и лайфхаки',
    authorName: 'Елена Воробьева',
    authorUniversity: 'Студентка, TUM',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
    snippet: 'Поступление за границу — это квест со множеством неизвестных. Я набила шишек, чтобы вы могли их избежать. Делюсь своим опытом подачи документов в Германию.'
  },
  {
    id: 3,
    title: 'Не только учеба: как я нашел баланс в Nazarbayev University',
    authorName: 'Данияр Исмаилов',
    authorUniversity: 'Студент, NU',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    snippet: 'NU славится своей академической нагрузкой. Но университетская жизнь — это не только дедлайны. Рассказываю про студенческие клубы, спорт и как все успевать.'
  }
];

export const mockUser: UserProfile = {
    fullName: 'Тестовый Пользователь',
    nickname: 'testuser',
    email: 'test@example.com',
    questionnaireData: {
        fullName: 'Тестовый Пользователь',
        budget: 500000,
        region: 'Алматы',
        avgGrade: 4.8,
        exams: 'ЕНТ: 125, IELTS: 8.0',
        preferences: 'Хочу вуз с сильной исследовательской базой и возможностью стажировок.',
        studyFormat: 'hybrid',
    },
    psychTestResults: ["IT и Компьютерные науки", "Предпринимательство"],
    recommendedUniversities: [universities[0], universities[1], universities[7]],
    chosenMentor: mentors[0],
    chatConsultationAnswers: [
      "Я верю, что мой проект по созданию образовательного приложения для школьников демонстрирует мой потенциал и стремление внести вклад в общество.",
      "Организация и проведение благотворительного IT-хакатона для студентов моего города.",
      "Сильное сообщество выпускников и тесные связи с индустрией."
    ]
};