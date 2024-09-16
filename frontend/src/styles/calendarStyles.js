import styled from 'styled-components';

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: var(--white);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--inputs-shadow);
    margin: 0 auto;
    width: 80%;
    max-width: 1200px;
`;

export const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const ControlButton = styled.button`
    background: var(--brand-color);
    color: var(--white);
    padding: 10px 20px;
    border: none;
    border-radius: var(--border-radius-small);
    cursor: pointer;
    margin: 0 5px;

    &:hover {
        background: var(--light-brand-color);
    }
`;

export const ControlSelect = styled.select`
    padding: 10px;
    border: var(--border-style);
    border-radius: var(--border-radius-small);
    background: var(--white);
    cursor: pointer;
    margin: 0 5px;
`;

export const NavButton = styled.button`
    background: var(--brand-color);
    color: var(--white);
    padding: 10px 20px;
    border: none;
    border-radius: var(--border-radius-small);
    cursor: pointer;
    margin: 0 5px;

    &:hover {
        background: var(--light-brand-color);
    }
`;

export const DateDisplay = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
