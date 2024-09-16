import {
    BtnRed
} from "../../styles/buttonStyles.js";

// eslint-disable-next-line react/prop-types
export default function ButtonRed({ iconURL, buttonText, ...props }) {

    return (
        <BtnRed {...props}>
            <img src={iconURL} alt="icon" /> {buttonText}
        </BtnRed>
    );
}



