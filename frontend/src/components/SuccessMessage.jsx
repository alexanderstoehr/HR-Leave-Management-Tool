import {SuccessMessageStyled} from "../styles/messageStyles.js";

export default function SuccessMessage({message}) {
    return (
        <SuccessMessageStyled>
            <p>{message}</p>
        </SuccessMessageStyled>
    )
}