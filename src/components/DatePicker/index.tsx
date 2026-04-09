import { useState, type SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const isFilterDate = (date: Date) => {
    const isBefore = date < new Date(2026, 3, 1)
    const isAfter = date > new Date(2026, 4, 1)

    return !isBefore && !isAfter
  };

  return (
    <div>
      <h2>Виберіть дату:</h2>
      {/* Компонент DatePicker для вибору дати */}
      <DatePicker
        selected={startDate}
        onChange={(date: SetStateAction<Date | null>) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        // maxDate={new Date(2026, 2, 30)}
        // minDate={new Date(2026, 2, 30)}
        filterDate={isFilterDate}
        showYearDropdown
      />
      <h3>Вибрана дата: {startDate?.toDateString()}</h3>
    </div>
  );
};

export default DatePickerComponent;