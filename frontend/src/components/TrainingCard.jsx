import {useDispatch, useSelector} from "react-redux";
import {
    loadTrainings,
    logRequestInfo,
} from "../store/slices/RequestSlice.jsx";
import {FlexStartDivStyled, RowCard} from "../styles/cardStyles.js";
import {useEffect, useState} from "react";
import {BtnGreen, BtnRed} from "../styles/buttonStyles.js";
import ButtonGreen from "./buttons/ButtonGreen.jsx";
import ButtonRed from "./buttons/ButtonRed.jsx";
import {Link, useParams} from "react-router-dom";
import {cleanUpIncomingDate, cleanUpIncomingText} from "../common/utils.js";
import {api} from "../common/api.js";

export default function TrainingCard({oneTraining, updateRequests}) {
    const {trainingIndex} = useParams();

    const view = useSelector((state) => state.view.view);
    const accessToken = useSelector((state) => state.user.accessToken);
    const isManagerView = useSelector((state) => state.view.view) === "manager";

    const dispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(false);

    const patchRequestStatus = (requestId, status) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const requestBody = {
            statusApproval: status,
        };
        try {
            api
                .patch(`/trainings/manager/myteam/${requestId}`, requestBody, config)
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

    function handleUpdate(trainingCard) {
        console.log("update", trainingCard);
    }

    function handleDelete(trainingCard) {
        console.log("delete", trainingCard);
    }

    let {
        id,
        requester,
        trainingUrl,
        title,
        description,
        price,
        statusApproval,
        statusAdvancement,
    } = oneTraining;

    //Format Request Data
    statusApproval = cleanUpIncomingText(statusApproval);
    statusAdvancement = cleanUpIncomingText(statusAdvancement);

    return (
        <>
            <RowCard id={id} onClick={() => handleMoreClick(oneTraining)}>
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
              {requester.customUser.first_name} {requester.customUser.last_name}
            </b>
          </span>
                </FlexStartDivStyled>
                <span>{title}</span>
                <span>{trainingUrl}</span>
                <span>CHF {price}</span>
                <span>{statusApproval}</span>
                <div
                    style={{
                        display: "flex",
                        justifySelf: "end",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    {!isExpanded ? (
                        <img src="/MoreInfo.png" alt="..." height="3px"/>
                    ) : (
                        <img src="/arrow-down.png" alt="..." height="8px"/>
                    )}
                </div>
            </RowCard>
            {isExpanded && (
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
              <b>Training Request No.:</b> #{id}
            </span>
                        <span>
              <b>Description:</b> {description}
            </span>
                        <span>
              <b>URL:</b> {trainingUrl}
            </span>
                        <span>
              <b>Status Approval:</b> {statusApproval}
            </span>
                        <span>
              <b>Status Advancement:</b> {statusAdvancement}
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
                        {/*{statusApproval === "Pending" && !isManagerView && (*/}
                        {/*    <ButtonRed*/}
                        {/*        iconURL={"/cross-deny.png"}*/}
                        {/*        buttonText={"Delete"}*/}
                        {/*        onClick={() => handleDelete(oneTraining)}*/}
                        {/*    />*/}
                        {/*)}*/}
                        {/*{statusApproval === "Pending" && !isManagerView && (*/}
                        {/*    <ButtonGreen*/}
                        {/*        iconURL={"/tick-circle.png"}*/}
                        {/*        buttonText={"Update"}*/}
                        {/*        onClick={() => handleUpdate(oneTraining)}*/}
                        {/*    />*/}
                        {/*)}*/}

                        {statusApproval === "Pending" && isManagerView && (
                            <ButtonRed
                                iconURL={"/cross-deny.png"}
                                buttonText={"Deny"}
                                onClick={() => handleDeny(oneTraining)}
                            />
                        )}
                        {statusApproval === "Pending" && isManagerView && (
                            <ButtonGreen
                                iconURL={"/tick-circle.png"}
                                buttonText={"Approve"}
                                onClick={() => handleApprove(oneTraining)}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
