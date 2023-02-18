import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker({ dateChanged }) {

    return (
        <DatePicker selected={new Date()} onChange={dateChanged} />
    )
}