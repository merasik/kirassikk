import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="container mx-auto py-6 px-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} UniMap. Все права защищены.</p>
        <p className="text-sm mt-2">Ваш компас в мире высшего образования.</p>
      </div>
    </footer>
  );
};

export default Footer;