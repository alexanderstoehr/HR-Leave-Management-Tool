import {PublicHolidayCardStyled} from "../styles/publicHolidayCardStyles.js";
import {RemoveHoliday} from "../store/slices/CompanySlice";
import {useDispatch} from "react-redux";

export default function PublicHolidayCard({publicHoliday}) {

    const dispatch = useDispatch();
    const removeHoliday = (e) => {
        console.log("In Component Remove Holiday: ", e.target.id);
        dispatch(RemoveHoliday(e.target.id))
    }
    return (
        <PublicHolidayCardStyled>

            <span><b>{publicHoliday.holidayName}</b></span>
            <span>{publicHoliday.holidayDate}
                <img id={publicHoliday.id} onClick={(e) => removeHoliday(e)} src={"/remove-holiday.svg"}/>
            </span>
        </PublicHolidayCardStyled>
    );
}