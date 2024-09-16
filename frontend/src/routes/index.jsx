import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import DefaultLayout from "../layouts/DefaultLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";

// routes
import CompanyRoute from "./company.jsx";
import CompanyEmployeesRoute from "./companyEmployees.jsx";
import CompanyCalendarRoute from "./companyCalendar.jsx";
import ManagerRoute from "./manager.jsx";
import ManagerTeamRoute from "./managerTeam.jsx";
import ManagerCalendarRoute from "./managerCalendar.jsx";
import EmployeeRoute from "./employee.jsx";
import EmployeeCalendarRoute from "./employeeCalendar.jsx";
import ManagerRequestsRoute from "./managerRequests.jsx";
import LoginRoute from "./login.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<LoginRoute />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<EmployeeRoute />} />
            <Route
              element={<ProtectedRoute allowedRoles={["company_admin"]} />}
            >
              <Route path="/company" element={<CompanyRoute />} />
              <Route
                path="/company/employees/:userIndex?"
                element={<CompanyEmployeesRoute />}
              />
              <Route
                path="/company/calendar"
                element={<CompanyCalendarRoute />}
              />
            </Route>
            <Route
              element={
                <ProtectedRoute allowedRoles={["company_admin", "manager"]} />
              }
            >
              <Route path="/manager" element={<ManagerRoute />} />
              <Route
                path="/manager/requests/:requestIndex?"
                element={<ManagerRequestsRoute />}
              />
              <Route
                path="/manager/team/:userIndex?"
                element={<ManagerTeamRoute />}
              />
              <Route
                path="/manager/calendar"
                element={<ManagerCalendarRoute />}
              />
            </Route>
            <Route path="/employee/" element={<EmployeeRoute />} />
            <Route
              path="/employee/requests/:requestIndex?"
              element={<EmployeeRoute />}
            />
            <Route
              path="/employee/calendar"
              element={<EmployeeCalendarRoute />}
            />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - This page does not exist</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
