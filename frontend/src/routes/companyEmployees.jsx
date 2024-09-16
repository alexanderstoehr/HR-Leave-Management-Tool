import { useEffect, useState } from "react";

import ButtonBrand from "../components/buttons/ButtonBrand.jsx";
import EmployeeForm from "../components/forms/EmployeeForm.jsx";
import {
  RouteContentStyled,
  RouteHeadStyled,
} from "../styles/routeGeneralStyles.js";
import UserContainer from "../components/UserContainer.jsx";
import { api } from "../common/api.js";
import { loadTrainings } from "../store/slices/RequestSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../store/slices/UserSlice.jsx";
import useGenieAPI from "../hooks/useGenieAPI.js";

export default function CompanyEmployeesRoute() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const accessToken = useSelector((state) => state.user.accessToken);

  const { fetchUserKPIs, fetchAllEmployeesKPIs } = useGenieAPI();

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
    fetchUserKPIs();
    fetchAllEmployeesKPIs();
  }, [dispatch]);

  return (
    <RouteContentStyled>
      <RouteHeadStyled>
        <div>
          <h2>Employees</h2>
          <p>Here is the list of employees at the company.</p>
        </div>
        <ButtonBrand
          iconURL={"/plus-add.svg"}
          buttonText={"Add Employee"}
          onClick={openModal}
        />
        <EmployeeForm isModalOpen={isModalOpen} closeModal={closeModal} />
      </RouteHeadStyled>
      <UserContainer />
    </RouteContentStyled>
  );
}
