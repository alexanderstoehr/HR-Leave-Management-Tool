import {
    BtnBrand
} from "../../styles/buttonStyles.js";

// eslint-disable-next-line react/prop-types
export default function ButtonBrand({iconURL, buttonText, ...props}) {

    return (
        <BtnBrand {...props}>
            {iconURL && <img src={iconURL} alt="icon"/>} {buttonText}
        </BtnBrand>
    );
}



