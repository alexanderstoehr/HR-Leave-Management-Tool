import {
  RouteContentStyled,
  RouteHeadStyled,
} from "../styles/routeGeneralStyles.js";
import UserContainer from "../components/UserContainer.jsx";
import { api } from "../common/api.js";
import { setUserList } from "../store/slices/UserSlice.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ManagerTeamRoute() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const loggedInUser = useSelector((state) => state.user.userObject);

  console.log("loggedInUser", loggedInUser.id);

  const dispatch = useDispatch();

  const fetchUsers = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      let endpoint = "/users/mycompany/";
      api.get(endpoint, config).then((res) => {
        let response = res.data;
        dispatch(setUserList(response));
      });
    } catch (error) {
      console.log("nope");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  return (
    <RouteContentStyled>
      <RouteHeadStyled>
        <h2>My Team</h2>
      </RouteHeadStyled>
      <UserContainer managerId={loggedInUser.id} />
    </RouteContentStyled>
  );
}
