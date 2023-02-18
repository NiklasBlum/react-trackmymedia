import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker({ date, dateChanged }) {

    return (
        <DatePicker dateFormat="dd.MM.yyyy"
            showTimeInput
            isClearable
            placeholderText="Select a date!"
            selected={date}
            onChange={dateChanged} />
    )
}