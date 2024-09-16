import {
  RouteContentStyled,
  RouteHeadStyled,
} from "../styles/routeGeneralStyles.js";
import RequestContainer from "../components/RequestContainer.jsx";
import TrainingContainer from "../components/TrainingContainer.jsx";

export default function ManagerRequestsRoute() {
  return (
    <RouteContentStyled>
      <RouteHeadStyled>
        <div>
          <h2>Manager Items</h2>
          <p>Here you can manage the requests of your team members.</p>
        </div>
      </RouteHeadStyled>
      <h3 style={{ marginBottom: "5px" }}>Requests</h3>
      <RequestContainer />

      <h3 style={{ marginBottom: "5px", marginTop: "20px" }}>Trainings</h3>

      <TrainingContainer />
    </RouteContentStyled>
  );
}
