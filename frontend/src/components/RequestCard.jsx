import {useDispatch, useSelector} from "react-redux";
import {loadRequests, logRequestInfo} from "../store/slices/RequestSlice.jsx";
import {FlexStartDivStyled, RowCard} from "../styles/cardStyles.js";
import {useEffect, useState} from "react";
import {BtnGreen, BtnRed} from "../styles/buttonStyles.js";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonRed from "./buttons/ButtonRed.jsx";
import {Link, useParams} from "react-router-dom";
import {cleanUpIncomingDate, cleanUpIncomingText} from "../common/utils.js";
import {api} from "../common/api.js";

export default function RequestCard({oneRequest, updateRequests}) {
    const {requestIndex} = useParams();
    const view = useSelector((state) => state.view.view);
    let currentRoleURLParam = view === "manager" ? "manager" : "employee";

    const dispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(false);

    const isManagerView = useSelector((state) => state.view.view) === "manager";
    const accessToken = useSelector((state) => state.user.accessToken);

    // console.log("isManagerView", isManagerView);
    useEffect(() => {
        if (Number(requestIndex) === oneRequest.id) {
            setIsExpanded(true);
        }
    }, [requestIndex, oneRequest.id]);
    
    const patchRequestStatus = (requestId, status) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const requestBody = {
            status: status,
        };
        try {
            api
                .patch(`/absences/manager/myteam/${requestId}`, requestBody, config)
                .then((res) => {
                    console.log("API call successful", res.data);
                    updateRequests();
                });
        } catch (error) {
            console.error(error);
        }
    };

    function handleMoreClick(requestCard) {
        dispatch(logRequestInfo(requestCard));
        setIsExpanded(!isExpanded);
    }

    function handleDeny(requestCard) {
        console.log("set to rejected", requestCard);
        patchRequestStatus(requestCard.id, "rejected");
    }

    function handleApprove(requestCard) {
        console.log("set to approved", requestCard);
        patchRequestStatus(requestCard.id, "approved");
    }

    function handleUpdate(requestCard) {
        console.log("update", requestCard);
    }

    function handleDelete(requestCard) {
        console.log("delete", requestCard);
    }

    let {
        id,
        requester,
        startDt,
        endDt,
        dtCreated,
        reason,
        status,
        durationWorkHours,
    } = oneRequest;

    //Format Request Data
    startDt = cleanUpIncomingDate(startDt);
    endDt = cleanUpIncomingDate(endDt);
    dtCreated = cleanUpIncomingDate(dtCreated);
    reason = cleanUpIncomingText(reason);
    status = cleanUpIncomingText(status);

    return (
        <>
            <Link to={`/${currentRoleURLParam}/requests/${id}#${id}`}>
                <RowCard id={id} onClick={() => handleMoreClick(oneRequest)}>
                    <FlexStartDivStyled style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <span>
              <img
                  src={requester.customUser.avatar}
                  //src={requestCard.profile}
                  alt="profile"
                  height="35px"
                  width="35px"
                  style={{borderRadius: "50%"}}
              />{" "}
            </span>
                        <span>
              <b>
                {requester.customUser.first_name}{" "}
                  {requester.customUser.last_name}
              </b>
            </span>
                    </FlexStartDivStyled>
                    {reason}
                    <span>
            {startDt} - {endDt}
          </span>
                    <span>{parseFloat(durationWorkHours.toFixed(2))} hours</span>
                    <span>{status}</span>
                    <div
                        style={{
                            display: "flex",
                            justifySelf: "end",
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        {Number(requestIndex) !== id ? (
                            <img src="/MoreInfo.png" alt="..." height="3px"/>
                        ) : (
                            <img src="/arrow-down.png" alt="..." height="8px"/>
                        )}
                    </div>
                </RowCard>
            </Link>
            {(Number(requestIndex) === id && isExpanded) && (
                <div style={{display: "flex", gap: "10px"}}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "10px",
                            padding: "10px",
                            width: "20%",
                        }}
                    >
            <span>
              <b>Request No.:</b> {id}
            </span>
                        <span>
              <b>Created on:</b> {dtCreated}
            </span>
                        <span>
              <b>Status:</b> {status}
            </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            gap: "10px",
                            padding: "10px",
                            width: "80%",
                        }}
                    >
                        {status === "Pending" && !isManagerView && (
                            <ButtonRed
                                iconURL={"/cross-deny.png"}
                                buttonText={"Delete"}
                                onClick={() => handleDelete(oneRequest)}
                            />
                        )}
                        {status === "Pending" && !isManagerView && (
                            <ButtonGreen
                                iconURL={"/tick-circle.png"}
                                buttonText={"Update"}
                                onClick={() => handleUpdate(oneRequest)}
                            />
                        )}

                        {status === "Pending" && isManagerView && (
                            <ButtonRed
                                iconURL={"/cross-deny.png"}
                                buttonText={"Deny"}
                                onClick={() => handleDeny(oneRequest)}
                            />
                        )}
                        {status === "Pending" && isManagerView && (
                            <ButtonGreen
                                iconURL={"/tick-circle.png"}
                                buttonText={"Approve"}
                                onClick={() => handleApprove(oneRequest)}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
