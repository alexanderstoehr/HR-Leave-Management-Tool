import {Calendar as BigCalendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {api} from "../common/api.js";
import {
    CalendarContainer,
    Controls,
    ControlButton,
    ControlSelect,
    NavButton,
    DateDisplay
} from '../styles/calendarStyles';
import {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

// Configure moment.js to start weeks on Monday
moment.updateLocale('en', {
    week: {
        dow: 1, // Monday is the first day of the week
    },
});

const localizer = momentLocalizer(moment);

// mapping object for user-friendly labels
const reasonLabels = {
    vacation: "Vacation",
    sick_leave: "Sick Leave",
    training: "Training",
    holiday: "Holiday"
};

// color mapping for different absences
const colorMapping = {
    vacation: '#8FD5A6', // Celadon
    sick_leave: '#FE5F55', // Bittersweet
    training: '#686963', // Dim gray
    holiday: '#FCCA46' // Sunglow
};

// color mapping for fonts of absences
const fontColorMapping = {
    vacation: '#1C4A2B', // Cal Poly green
    sick_leave: '#650701', // Blood red
    training: '#343531', // Black olive
    holiday: '#644A02' // Field drab
};

const CalendarComponent = ({viewType}) => {       // added viewType to props
    const [events, setEvents] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [filter, setFilter] = useState('all');
    const [date, setDate] = useState(new Date());

    const accessToken = useSelector((state) => state.user.accessToken); // fetch accessToken
    const publicHolidays = useSelector((state) => state.company.publicHolidays); // fetch public holidays from store

    useEffect(() => {
        api.setAuthToken(accessToken);

        // determine the endpoint based on the viewType
        let endpoints = [];
        if (viewType === 'manager') {
            endpoints = ['/absences/manager/myteam/', '/absences/me/'];
        } else if (viewType === 'employee') {
            endpoints = ['/absences/employee/myteam/', '/absences/employee/mymanager/'];
        } else if (viewType === 'company') {
            endpoints = ['/absences/'];
        }

        // fetch absences (vacation, sick leave) from multiple endpoints and combine results
        Promise.all(endpoints.map(endpoint => api.get(endpoint)))
            .then(responses => {
                // combine data from all endpoints
                const absences = responses.flatMap(response =>
                    response.data.map(absence => ({
                        id: absence.id,
                        title: `${reasonLabels[absence.reason]}: ${absence.requester.customUser.first_name} ${absence.requester.customUser.last_name}`,
                        start: new Date(absence.startDt),
                        end: new Date(absence.endDt),
                        type: absence.reason.toLowerCase(),
                        allDay: false // absences are not all-day events by default
                    }))
                );

                // map public holidays to the events format
                const holidays = publicHolidays.map(holiday => {
                    const holidayEvent = {
                        id: `holiday-${holiday.id}`,
                        title: `Holiday: ${holiday.holidayName}`,
                        start: new Date(holiday.holidayDate),
                        end: new Date(holiday.holidayDate),
                        type: 'holiday',
                        allDay: true // holidays are all-day events
                    };
                    console.log('Holiday Event:', holidayEvent); // Verify holiday event data
                    return holidayEvent;
                });

                // console.log('Mapped absences data:', absences); // log the mapped response data

                // combine absences and holidays into one events array
                setEvents([...absences, ...holidays]);
            })
            .catch(error => {
                console.error('Error fetching absences:', error);
            });
    }, [accessToken, publicHolidays, viewType]);    // added viewType

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleNavigate = (direction) => {
        let newDate = new Date(date);
        if (view === Views.DAY) {
            newDate.setDate(date.getDate() + (direction === 'prev' ? -1 : 1));
        } else if (view === Views.WEEK) {
            newDate.setDate(date.getDate() + (direction === 'prev' ? -7 : 7));
        } else if (view === Views.MONTH) {
            newDate.setMonth(date.getMonth() + (direction === 'prev' ? -1 : 1));
        }
        setDate(newDate);
    };

    const filteredEvents = events.filter(event => filter === 'all' || event.type === filter);

    const formattedDate = moment(date).format(view === Views.MONTH ? 'MMMM YYYY' : 'dddd, MMMM Do YYYY');

    // event style getter function
    const eventStyleGetter = (event) => {
        const backgroundColor = colorMapping[event.type] || '#3174ad'; // default color
        const color = fontColorMapping[event.type] || 'white'; // default font color
        const style = {
            backgroundColor,
            color,
            borderRadius: '5px',
            opacity: 0.8,
            border: '0px',
            display: 'block'
        };
        return {
            style
        };
    };


    // define the start and end time for the calendar
    const minTime = new Date();
    minTime.setHours(7, 0, 0); // 07:00 AM
    const maxTime = new Date();
    maxTime.setHours(22, 0, 0); // 22:00 PM

    // custom formats for the calendar
    const customFormats = {
        timeGutterFormat: (date, culture, localizer) => localizer.format(date, 'HH:mm', culture),
        eventTimeRangeFormat: ({start, end}, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
    };

    return (
        <CalendarContainer>
            <DateDisplay>{formattedDate}</DateDisplay>
            <Controls>
                <ControlSelect onChange={handleFilterChange} value={filter}>
                    <option value="all">All Calendars</option>
                    <option value="vacation">Vacation</option>
                    <option value="sick_leave">Sick Leave</option>
                    <option value="training">Training</option>
                    <option value="holiday">Holiday</option>
                </ControlSelect>
                <div>
                    <ControlButton onClick={() => setView(Views.DAY)}>Day</ControlButton>
                    <ControlButton onClick={() => setView(Views.WEEK)}>Week</ControlButton>
                    <ControlButton onClick={() => setView(Views.MONTH)}>Month</ControlButton>
                </div>
                <div>
                    <NavButton onClick={() => handleNavigate('prev')}>Previous</NavButton>
                    <NavButton onClick={() => handleNavigate('next')}>Next</NavButton>
                </div>
            </Controls>
            <BigCalendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{height: '70vh', width: '100%'}}
                views={[Views.DAY, Views.WEEK, Views.MONTH]}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                toolbar={false} // Disable the default toolbar to remove duplicate buttons
                eventPropGetter={eventStyleGetter} // apply custom styles
                min={minTime} // start of the day
                max={maxTime} // end of the day
                formats={customFormats} // apply custom time formats (7am-9pm => 07:00-22:00)
            />
        </CalendarContainer>
    );
};

export default CalendarComponent;