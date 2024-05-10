import React, { useState } from "react";

export const AboutUsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 "
      >
        НЕМНОГО О НАС
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-8 rounded-md max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Добро пожаловать в UPFOOD!
            </h2>
            <h4 className="text-lg mb-4">
              Мы в UPFOOD гордимся тем, что помогаем вам достигать ваших целей в
              питании и создавать здоровый образ жизни. Наш магазин предлагает
              широкий выбор продуктов и рационов, которые учитывают ваши
              индивидуальные потребности, предпочтения и даже аллергии.
            </h4>
            <h4 className="text-lg">
              Мы стремимся к тому, чтобы ваш опыт покупок был приятным и
              удобным, и всегда готовы помочь вам на каждом шагу вашего пути к
              здоровью и благополучию.
            </h4>
            <button
              onClick={togglePopup}
              className="mt-6 rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
