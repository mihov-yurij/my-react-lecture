import CountUp from 'react-countup';

const CounterUp = () => {
  return (
    <div>
      {/* Компонент CountUp для анімації чисел */}
      <h1>Зароблено коштів: <CountUp prefix='$ ' end={1000} decimals={2} separator='.' duration={5} redraw={true} /></h1>
      <h1>Зареєстровано: <CountUp end={450} duration={15} /></h1>
    </div>
  );
};

export default CounterUp;