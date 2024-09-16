import {
    BtnGreen,
} from "../../styles/buttonStyles.js";

// eslint-disable-next-line react/prop-types
export default function ButtonGreen({ iconURL, buttonText, ...props }) {

    return (
        <BtnGreen {...props}>
            <img src={iconURL} alt="icon" /> {buttonText}
        </BtnGreen>
    );
}



