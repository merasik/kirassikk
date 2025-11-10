import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-blue-600 mb-4">{title}</h3>
        <div className="space-y-3 text-gray-700">
            {children}
        </div>
    </div>
);

const PortfolioPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Портфолио и Документы</h1>
      <p className="text-center text-gray-600 mb-10">
        Здесь собраны все необходимые ресурсы для создания впечатляющего портфолио абитуриента.
      </p>

      <div className="space-y-8">
        <InfoCard title="Структура сильного портфолио">
          <p>Ваше портфолио — это визитная карточка. Оно должно отражать ваши сильные стороны, мотивацию и достижения. Включите следующие разделы:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Мотивационное письмо (Эссе):</strong> Расскажите, почему вы выбрали эту специальность и этот университет.</li>
            <li><strong>Академические достижения:</strong> Дипломы, сертификаты, грамоты с олимпиад и конкурсов.</li>
            <li><strong>Внеучебная деятельность:</strong> Участие в волонтерских проектах, спортивных секциях, творческих кружках.</li>
            <li><strong>Проектная и исследовательская работа:</strong> Описание ваших проектов, исследований или публикаций.</li>
            <li><strong>Рекомендательные письма:</strong> Отзывы от учителей или наставников.</li>
          </ul>
        </InfoCard>

        <InfoCard title="Написание мотивационного письма">
          <p>Эссе — ваш шанс выделиться. Следуйте этим советам:</p>
           <ul className="list-decimal list-inside space-y-2 pl-4">
                <li>Будьте искренними и пишите от своего имени.</li>
                <li>Продемонстрируйте знание программы и университета, на которые подаете документы.</li>
                <li>Свяжите свой прошлый опыт с будущими целями.</li>
                <li>Проверьте текст на ошибки несколько раз.</li>
           </ul>
        </InfoCard>

        <InfoCard title="Шаблоны и ресурсы">
            <p>Мы подготовили для вас полезные шаблоны, которые помогут в оформлении документов.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a href="#" className="flex-1 text-center bg-blue-100 text-blue-800 px-4 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                    Скачать шаблон резюме (CV)
                </a>
                <a href="#" className="flex-1 text-center bg-blue-100 text-blue-800 px-4 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                    Пример мотивационного письма
                </a>
                 <a href="#" className="flex-1 text-center bg-blue-100 text-blue-800 px-4 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                    Чек-лист документов
                </a>
            </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default PortfolioPage;