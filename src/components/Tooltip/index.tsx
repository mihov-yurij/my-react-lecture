import { Tooltip as ReactTooltip } from 'react-tooltip'; // Імпорт іменованого експорту

const Tooltip = () => {
  return (
    <div>
      {/* Елемент, до якого прив'язана підказка */}
      <button data-tooltip-id="info-tooltip" data-tooltip-content="Це кнопка входу">
        Увійти
      </button>

      {/* Інший елемент з підказкою */}
      <p data-tooltip-id="my-tooltip" data-tooltip-content="Це інформаційний текст">
        Дізнайтеся більше про наші послуги
      </p>

      {/* Компонент ReactTooltip, який відображає всі підказки */}
      <ReactTooltip id="my-tooltip" place="top" variant="error" />
      <ReactTooltip id="info-tooltip" place="top" variant="info" />
    </div>
  );
};

export default Tooltip;