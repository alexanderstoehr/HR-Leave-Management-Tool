import RequestMinitableItem from "./RequestMinitableItem.jsx";
import {RequestsMinitableStyled} from "../styles/miniTableStyles.js";
import ButtonBrand from "./buttons/ButtonBrand.jsx";
import {Link} from "react-router-dom";

export default function RequestMiniTable({name, type, requests}) {
    let isTrainingRequestlist = false; // Declare outside the if block

    if (requests[0] !== undefined && "trainingUrl" in requests[0]) {
        isTrainingRequestlist = true; // Assign within the if block
    }

    // console.log(type, "minitable comp: ", requests)

    let filteredRequests

    if (isTrainingRequestlist) {
        filteredRequests = requests.filter(request => request.trainingUrl);
        // console.log(filteredRequests)
    } else {
        filteredRequests = requests.filter(request => request.reason === type);
    }


    return (
        <RequestsMinitableStyled>
            <div><h3>{name}</h3>
                {filteredRequests.map((request, i) => <RequestMinitableItem key={i} isTraining={isTrainingRequestlist} request={request}/>)}
            </div>
            <Link to={"/manager/requests"}>
                <ButtonBrand buttonText={'View all'} iconURL={''}/>
            </Link>
        </RequestsMinitableStyled>
    );
}


