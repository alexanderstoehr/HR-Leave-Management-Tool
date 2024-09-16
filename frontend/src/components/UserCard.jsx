import { useDispatch, useSelector } from "react-redux";
import { FlexStartDivStyled, RowCard } from "../styles/cardStyles.js";
import { useEffect, useState } from "react";
import { BtnGreen, BtnRed } from "../styles/buttonStyles.js";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonRed from "./buttons/ButtonRed.jsx";
import { Link, useParams } from "react-router-dom";
import EmployeeSummaryCard from "./EmployeeSummaryCard.jsx";
import profile from "../../public/profile.png";
import EmployeeChartCard from "./EmployeeChartCard.jsx";

export default function UserCard({ oneUser }) {
  const { userIndex } = useParams();

  const userList = useSelector((state) => state.user.userList);
  const UserCard = userList.find((r) => r.id === parseInt(oneUser.id));
  let currentPageURLParam = location.pathname.startsWith("/company/employees")
    ? "/company/employees/"
    : "/manager/team/";

  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [avatar, setAvatar] = useState(profile);

  function handleMoreClick(UserCard) {
    setIsExpanded(!isExpanded);
  }

  function handleUpdate(UserCard) {
    console.log("update", UserCard);
  }

  function handleDelete(UserCard) {
    console.log("delete", UserCard);
  }

  useEffect(() => {
    if (UserCard && UserCard.customUser && UserCard.customUser.avatar) {
      setAvatar(UserCard.customUser.avatar);
    }
  }, [UserCard]);
  return (
    <>
      <Link to={`${currentPageURLParam}${UserCard.id}#${UserCard.id}`}>
        <RowCard id={UserCard.id} onClick={() => handleMoreClick(UserCard)}>
          <FlexStartDivStyled
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span>
              <img
                //src={UserCard.profile}
                src={avatar}
                alt="profile"
                height="35px"
                width="35px"
                style={{ borderRadius: "50%" }}
              />{" "}
            </span>
            <span>
              <b>
                {UserCard.customUser?.first_name}{" "}
                {UserCard.customUser?.last_name}
              </b>
            </span>
          </FlexStartDivStyled>
          <span>{UserCard.department?.nameDepartment}</span>
          {UserCard.customUser?.email}
          <span></span>
          <div
            style={{
              display: "flex",
              justifySelf: "end",
              height: "100%",
              alignItems: "center",
            }}
          >
            {Number(userIndex) !== UserCard.id ? (
              <img src="/MoreInfo.png" alt="..." height="3px" />
            ) : (
              <img src="/arrow-down.png" alt="..." height="8px" />
            )}
          </div>
        </RowCard>
      </Link>
      {Number(userIndex) === UserCard.id && isExpanded && (
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "10px",
              padding: "10px",
              width: "150%",
            }}
          >
            <EmployeeSummaryCard
              id={UserCard.id}
              managerId={UserCard.approver?.customUser?.id}
            />
            <EmployeeChartCard id={UserCard.id} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              padding: "10px",
              //width: "20%",
            }}
          >
            {/*<ButtonRed*/}
            {/*    iconURL={"/cross-deny.png"}*/}
            {/*    buttonText={"Delete"}*/}
            {/*    onClick={() => handleDelete(UserCard)}*/}
            {/*/>*/}
            {/*<ButtonGreen*/}
            {/*    iconURL={"/tick-circle.png"}*/}
            {/*    buttonText={"Update"}*/}
            {/*    onClick={() => handleUpdate(UserCard)}*/}
            {/*/>*/}
          </div>
        </div>
      )}
    </>
  );
}
