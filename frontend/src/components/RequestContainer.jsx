import {useDispatch, useSelector} from "react-redux";
import RequestCard from "./RequestCard";
import {useEffect, useState} from "react";
import {loadRequests} from "../store/slices/RequestSlice";
import {RowCardContainer} from "../styles/cardStyles.js";
import {api} from "../common/api.js";
import {addMyRequests} from "../store/slices/UserSlice.jsx";

export default function RequestContainer({refresh}) {
    const dispatch = useDispatch();
    const view = useSelector((state) => state.view.view);
    let requestList;
    const teamRequestList = useSelector((state) => state.request.requestList);
    let myRequestList = useSelector((state) => state.user.myRequestList);
    const accessToken = useSelector((state) => state.user.accessToken);

    //Sorting function for later use; startDt being used
    let sortByDate = (a, b) => {
        let da = new Date(a.startDt),
            db = new Date(b.startDt);
        return da - db;
    };

    if (view === "manager") {
        requestList = teamRequestList;
    } else {
        requestList = myRequestList;
    }
    // console.log("Reqs: ", requestList)

    const fetchRequests = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            // Is the user in Manager or Employee View
            let endpointForAbsences =
                view === "manager" ? "/absences/manager/myteam" : "/absences/me/";
            api.get(endpointForAbsences, config).then((res) => {
                // console.log("RequestContainer API response: ", res.data);
                let requestData = res.data;
                requestData.sort(sortByDate); // Data is being sorted here
                if (view === "manager") {
                    dispatch(loadRequests(requestData));
                } else {
                    dispatch(addMyRequests(requestData));
                }
            });
        } catch (error) {
            console.error("FetchRequests Error: ", error);
        }
    };

    const updateRequests = () => {
        fetchRequests(); // Assuming fetchRequests fetches the updated list and updates state
    };
    // created to refresh the requests

    useEffect(() => {
        fetchRequests();
    }, [dispatch, refresh]);

    return (
        <>
            <RowCardContainer>
                {requestList.map((oneRequest) => (
                    <RequestCard
                        key={oneRequest.id}
                        oneRequest={oneRequest}
                        updateRequests={updateRequests}
                    />
                ))}
            </RowCardContainer>
        </>
    );
}
