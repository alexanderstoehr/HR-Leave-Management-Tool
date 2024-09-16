import styled from "styled-components";

export const RowCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const RowCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.1fr;
    grid-template-rows: 1fr;
    height: 50px;
    padding: 20px;
    background-color: white;
    border-radius: var(--border-radius-large);
    border: solid 1px var(--light-grey);
    width: 100%;
    align-content: center;
    align-items: center;
    justify-items: start;
    align-self: center;

    img {
        margin-top: 5px;
    }
`;

export const HalfWidthCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: var(--border-radius-large);
    border: solid 1px var(--light-grey);
    width: 50%;
    margin-bottom: 10px;
    min-height: 200px;
`;

export const HalfWidthCardTitle = styled.h3`
    background-color: var(--light-grey);
    border: solid 1px var(--light-grey);
    border-top-left-radius: var(--border-radius-medium);
    border-top-right-radius: var(--border-radius-medium);
    width: 100%;
    padding: 10px;
`;

export const HalfWidthCardContent = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 7px;
`;

export const HalfWidthCardLabel = styled.span`
    color: var(--dark-grey);
`;

export const FlexStartDivStyled = styled.div`
    justify-self: start;
`;

export const MiniIconStyled = styled.img`
    width: 16px;
    background-color: rgba(255, 255, 255, 0.75);
`;
