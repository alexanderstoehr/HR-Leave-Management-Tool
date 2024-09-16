import styled from "styled-components";


export const PublicHolidayCardStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;
    border-radius: var(--border-radius-medium);
    background-color: var(--white);
    color: var(--black);
    margin-bottom: 10px;
    box-shadow: var(--inputs-shadow);
    

    img {
        cursor: pointer;
        margin-left: 2rem;
    }
`;