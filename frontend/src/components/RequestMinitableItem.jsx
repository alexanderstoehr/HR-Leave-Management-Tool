import {MiniTableItemStyled} from "../styles/miniTableStyles.js";
import {Link} from "react-router-dom";

export default function RequestMinitableItem({request, isTraining}) {

    const formatDateTime = (dt) => {
        const date = new Date(dt);
        const dayMonth = date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short'});
        const time = date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        return `${dayMonth}, ${time}`

    }
    // console.log(request)

    const requestList = (
        <>
            <Link to={`/manager/requests/${request.id}#${request.id}`}>
                <MiniTableItemStyled id={request.id}>
                    <img
                        src={request.requester.customUser.avatar}
                        //src={requestCard.profile}
                        alt="profile"
                        height="35px"
                        width="35px"
                        style={{borderRadius: "50%"}}
                    />
                    <div className="item-data">
                        <div className="row">
                            <div
                                className="requester">{request.requester.customUser.first_name} {request.requester.customUser.last_name}</div>
                            <div className="date"><p>{formatDateTime(request.startDt)} - {formatDateTime(request.endDt)}</p></div>
                        </div>
                        <div className="depstat">
                            <p>{request.requester.department.nameDepartment}</p>
                            <p>{request.status}</p>
                        </div>
                    </div>

                </MiniTableItemStyled>
            </Link>
        </>
    )

    const trainingList = (
        <>
            <Link to={`/manager/requests/t${request.id}#t${request.id}`}>
                <MiniTableItemStyled id={request.id}>

                    <img
                        src={request.requester.customUser.avatar}
                        //src={requestCard.profile}
                        alt="profile"
                        height="35px"
                        width="35px"
                        style={{borderRadius: "50%"}}
                    />
                    <div className="item-data">
                        <div className="row">
                            <div
                                className="requester">{request.requester.customUser.first_name} {request.requester.customUser.last_name} </div>
                            <div className="date">{request.title}</div>
                        </div>

                        <div className="depstat">
                            <p>{request.requester.department.nameDepartment}</p>
                            <p>{request.trainingUrl}</p>
                        </div>
                    </div>

                </MiniTableItemStyled>
            </Link>
        </>
    )

    const content = isTraining ? trainingList : requestList;

    return (
        <>
            {content}
        </>
    );
}