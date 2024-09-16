import {useSelector} from "react-redux";
import {NavLinkButtonStyled, NavStyled, SidebarStyles} from "../styles/sidebarStyles.js";

export default function Sidebar() {
    const view = useSelector((state) => state.view.view);

    // console.log("view: ", view);

    function renderNav() {
        if (view === "company_admin") {
            return (
                <NavStyled>
                    <NavLinkButtonStyled end to="/company">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.75 2.45001C11.44 1.86001 12.57 1.86001 13.27 2.45001L14.85 3.81001C15.15 4.07001 15.71 4.28001 16.11 4.28001H17.81C18.87 4.28001 19.74 5.15001 19.74 6.21001V7.91001C19.74 8.30001 19.95 8.87001 20.21 9.17001L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.81C19.74 18.87 18.87 19.74 17.81 19.74H16.11C15.72 19.74 15.15 19.95 14.85 20.21L13.27 21.57C12.58 22.16 11.45 22.16 10.75 21.57L9.17 20.21C8.87 19.95 8.31 19.74 7.91 19.74H6.18C5.12 19.74 4.25 18.87 4.25 17.81V16.1C4.25 15.71 4.04 15.15 3.79 14.85L2.44 13.26C1.86 12.57 1.86 11.45 2.44 10.76L3.79 9.17001C4.04 8.87001 4.25 8.31001 4.25 7.92001V6.20001C4.25 5.14001 5.12 4.27001 6.18 4.27001H7.91C8.3 4.27001 8.87 4.06001 9.17 3.80001L10.75 2.45001Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M10.75 2.45001C11.44 1.86001 12.57 1.86001 13.27 2.45001L14.85 3.81001C15.15 4.07001 15.71 4.28001 16.11 4.28001H17.81C18.87 4.28001 19.74 5.15001 19.74 6.21001V7.91001C19.74 8.30001 19.95 8.87001 20.21 9.17001L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.81C19.74 18.87 18.87 19.74 17.81 19.74H16.11C15.72 19.74 15.15 19.95 14.85 20.21L13.27 21.57C12.58 22.16 11.45 22.16 10.75 21.57L9.17 20.21C8.87 19.95 8.31 19.74 7.91 19.74H6.18C5.12 19.74 4.25 18.87 4.25 17.81V16.1C4.25 15.71 4.04 15.15 3.79 14.85L2.44 13.26C1.86 12.57 1.86 11.45 2.44 10.76L3.79 9.17001C4.04 8.87001 4.25 8.31001 4.25 7.92001V6.20001C4.25 5.14001 5.12 4.27001 6.18 4.27001H7.91C8.3 4.27001 8.87 4.06001 9.17 3.80001L10.75 2.45001Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Company Settings </NavLinkButtonStyled>
                    <NavLinkButtonStyled to="/company/employees">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.39666 9.96415C8.30499 9.95498 8.19499 9.95498 8.09416 9.96415C5.91249 9.89081 4.17999 8.10331 4.17999 5.90331C4.17999 3.65748 5.99499 1.83331 8.24999 1.83331C10.4958 1.83331 12.32 3.65748 12.32 5.90331C12.3108 8.10331 10.5783 9.89081 8.39666 9.96415Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M15.0425 3.66669C16.8208 3.66669 18.2508 5.10585 18.2508 6.87502C18.2508 8.60752 16.8758 10.0192 15.1617 10.0834C15.0883 10.0742 15.0058 10.0742 14.9233 10.0834"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M3.81335 13.3467C1.59501 14.8317 1.59501 17.2517 3.81335 18.7275C6.33418 20.4142 10.4683 20.4142 12.9892 18.7275C15.2075 17.2425 15.2075 14.8225 12.9892 13.3467C10.4775 11.6692 6.34335 11.6692 3.81335 13.3467Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M16.8116 18.3333C17.4716 18.1958 18.095 17.93 18.6083 17.5358C20.0383 16.4633 20.0383 14.6941 18.6083 13.6216C18.1041 13.2366 17.49 12.98 16.8391 12.8333"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Employees</NavLinkButtonStyled>
                    <NavLinkButtonStyled to="/company/calendar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3.5 9.08997H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        Calendar</NavLinkButtonStyled>
                </NavStyled>
            )
        } else if (view === "manager") {
            return (
                <NavStyled>
                    <NavLinkButtonStyled end to="/manager">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M15.5 18.5C16.6 18.5 17.5 17.6 17.5 16.5V7.5C17.5 6.4 16.6 5.5 15.5 5.5C14.4 5.5 13.5 6.4 13.5 7.5V16.5C13.5 17.6 14.39 18.5 15.5 18.5Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M8.5 18.5C9.6 18.5 10.5 17.6 10.5 16.5V13C10.5 11.9 9.6 11 8.5 11C7.4 11 6.5 11.9 6.5 13V16.5C6.5 17.6 7.39 18.5 8.5 18.5Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Dashboard</NavLinkButtonStyled>
                    <NavLinkButtonStyled to="/manager/requests">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="currentColor" strokeWidth="1.5"
                                  strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Requests</NavLinkButtonStyled>
                    <NavLinkButtonStyled to="/manager/team">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M16.97 14.44C18.34 14.67 19.85 14.43 20.91 13.72C22.32 12.78 22.32 11.24 20.91 10.3C19.84 9.59004 18.31 9.35003 16.94 9.59003"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M7 14.44C5.63 14.67 4.12 14.43 3.06 13.72C1.65 12.78 1.65 11.24 3.06 10.3C4.13 9.59004 5.66 9.35003 7.03 9.59003"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Team</NavLinkButtonStyled>
                    <NavLinkButtonStyled to="/manager/calendar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3.5 9.08997H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        Calendar</NavLinkButtonStyled>
                </NavStyled>
            )
        } else if (view === "employee") {
            return (
                <NavStyled>

                    <NavLinkButtonStyled end to="/employee">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M15.5 18.5C16.6 18.5 17.5 17.6 17.5 16.5V7.5C17.5 6.4 16.6 5.5 15.5 5.5C14.4 5.5 13.5 6.4 13.5 7.5V16.5C13.5 17.6 14.39 18.5 15.5 18.5Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M8.5 18.5C9.6 18.5 10.5 17.6 10.5 16.5V13C10.5 11.9 9.6 11 8.5 11C7.4 11 6.5 11.9 6.5 13V16.5C6.5 17.6 7.39 18.5 8.5 18.5Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Dashboard</NavLinkButtonStyled>
                    <NavLinkButtonStyled to="/employee/calendar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3.5 9.08997H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        Calendar</NavLinkButtonStyled>
                </NavStyled>
            )
        }
    }

    return (
        <SidebarStyles>{renderNav()}</SidebarStyles>
    )
}