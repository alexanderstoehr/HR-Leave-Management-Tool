import styled from "styled-components";


export const BtnPrimary = styled.button`
    display: flex;
    gap: 7px;
    height: 50px;
    background-color: var(--brand-color);
    color: white;
    border-radius: var(--border-radius-large);
    border: none;
    width: max-content;
    align-items: center;

`

export const BtnBrand = styled(BtnPrimary)`
    background-color: var(--brand-color);

    &:disabled {
        background-color: var(--dark-grey);
        cursor: default;
        transform: none;
    }
`

export const BtnGreen = styled(BtnPrimary)`
    background-color: var(--green-button-color);
`

export const BtnRed = styled(BtnPrimary)`
    background-color: var(--red-button-color);
`
export const BtnUpload = styled(BtnPrimary)`
    padding: 10px 86px 10px 15px;

`
export const BtnLogin = styled(BtnPrimary)`
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: var(--border-radius-medium);`;