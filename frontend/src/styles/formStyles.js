import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    background-color: var(--transparent-brand-color);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 90;
`;

export const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 150px;
    color: black;
    background-color: var(--light-grey);
    transform: translate(-50%);
    width: 500px;
    z-index: 100;
    border-radius: var(--border-radius-small);
    padding: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

export const ZeForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`;
export const FormLabel = styled.label`
    border-radius: var(--border-radius-small);
    padding: 3px;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 2px;
    display: block;
`;

export const FormInputBasic = styled.input`
    border-radius: var(--border-radius-small);
    padding: 5px;
    border: none;
    width: 226px;
`;

export const FormInputSelect = styled.select`
    border-radius: var(--border-radius-small);
    padding: 5px;
    border: none;
    width: 226px;
`;

export const FormInputTextArea = styled.textarea`
    border-radius: var(--border-radius-small);
    padding: 5px;
    border: none;
    width: 460px;
    height: 80px;
`;

export const BtnClose = styled.img`
    background: none;
    cursor: pointer;
    border: none;
    pointer: cursor;

    &:hover {
        border-radius: 10px;
        padding: 2px;
        background-color: white;
    }
`;
