import {useDispatch, useSelector} from "react-redux";
import TrainingCard from "./TrainingCard";
import {useEffect, useState} from "react";
import {loadTrainings} from "../store/slices/RequestSlice";
import {RowCardContainer} from "../styles/cardStyles.js";
import {api} from "../common/api.js";
import {addMyTrainings} from "../store/slices/UserSlice.jsx";

export default function TrainingContainer({refresh}) {
    const dispatch = useDispatch();
    const view = useSelector((state) => state.view.view);
    let trainingList
    const teamTrainingList = useSelector((state) => state.request.trainingList);
    const myTrainingList = useSelector((state) => state.user.myTrainingList);
    const accessToken = useSelector((state) => state.user.accessToken);

    if (view === "manager") {
        trainingList = teamTrainingList
    } else {
        trainingList = myTrainingList
    }

    // console.log("Trains: ", trainingList)
    // console.log("training re-render")
    const fetchTrainings = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            // Is the user in Manager or Employee View
            let endpointForTrainings =
                view === "manager" ? "/trainings/manager/myteam" : "/trainings/me/";
            // console.log("yep i am here");
            api.get(endpointForTrainings, config).then((res) => {
                // console.log("TrainingContainer Response: ", res.data);
                let trainingData = res.data;
                if (view === "manager") {
                    dispatch(loadTrainings(trainingData))
                } else {
                    dispatch(addMyTrainings(trainingData));
                }


            });
        } catch (error) {
            console.error("FetchTrainings Error: ", error);
        }
    };
    const updateRequests = () => {
        fetchTrainings();
    };
    // created to refresh the requests

    useEffect(() => {
        fetchTrainings();
    }, [dispatch, refresh]);

    return (
        <>
            <RowCardContainer>
                {trainingList.map((oneTraining) => (
                    <TrainingCard
                        key={oneTraining.id}
                        oneTraining={oneTraining}
                        updateRequests={updateRequests}
                    />
                ))}
            </RowCardContainer>
        </>
    );
}
