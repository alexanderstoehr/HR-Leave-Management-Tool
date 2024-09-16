import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initialLoadLocalStorage } from "../store/slices/UserSlice";
import { RowCardContainer } from "../styles/cardStyles.js";
import UserCard from "./UserCard.jsx";
import { Route, useLocation } from "react-router-dom";

export default function UserContainer({ managerId }) {
  const dispatch = useDispatch();
  const location = useLocation();

  //while there is no data
  const fullUserList = useSelector((state) => state.user.userList);

  //const managerId = managerId; //should be the id of logged in user if he is a manager.

  const usersOfManagerTeam = fullUserList.filter(
    (user) => user.approver?.customUser?.id === managerId,
  );

  const userList = location.pathname.startsWith("/company/employees")
    ? fullUserList
    : usersOfManagerTeam;

  useEffect(() => {
    const storedUserList = JSON.parse(localStorage.getItem("userList"));
    if (storedUserList && storedUserList.length > 0) {
      dispatch(initialLoadLocalStorage(storedUserList));
    } else {
      localStorage.setItem("userList", JSON.stringify(userList));
    }
  }, [dispatch]);

  //const userList = useSelector((state) => state.user.userList);

  return (
    <>
      <RowCardContainer>
        {userList.map((oneUser) => (
          <UserCard key={oneUser.id} oneUser={oneUser} />
        ))}
      </RowCardContainer>
    </>
  );
}
