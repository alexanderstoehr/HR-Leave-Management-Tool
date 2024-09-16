import {RouteContentStyled, RouteHeadStyled} from "../styles/routeGeneralStyles.js";
import CalendarComponent from "../components/Calendar.jsx";

export default function CompanyCalendarRoute() {
    return (
        <RouteContentStyled>
            <RouteHeadStyled>
                <div>
                    <h2>Calendar</h2>
                </div>
            </RouteHeadStyled>
            <CalendarComponent viewType="company"/>
        </RouteContentStyled>
    )
}
