import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const CompanyFieldsStyled = styled.div`
  display: grid;
  width: 100%;
  padding: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 8rem;

  h3 {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input[type="text"] {
    display: flex;
    width: 260px;
    height: 48px;
    padding: 16px 0px 16px 13px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--neutral-neutral-border-day, #e8edf2);
    background: var(--neutral-neutral-bg-day, #fff);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  }

  .saveArea {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
`;

export const WorkingHoursStyled = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;

    p {
      width: 50px;
    }

    input[type="time"] {
      display: flex;
      width: 100px;
      height: 48px;
      padding: 16px 0px 16px 13px;
      justify-content: flex-end;
      align-items: center;
      border-radius: 8px;
      border: 1px solid var(--neutral-neutral-border-day, #e8edf2);
      background: var(--neutral-neutral-bg-day, #fff);
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const StyledSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 110px;

  select {
    width: 110px;
    padding: 1rem 2.5rem 1rem 1.5rem;
    border-radius: var(--border-radius-medium);
    border: var(--border-style);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
    color: var(--mid-grey);
    display: flex;
    align-items: center;
    appearance: none;
    cursor: pointer;
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij48cGF0aCBkPSJNMyAxMEwgMTAgMCA3IDMtOC44NSAwIDEtMyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1vcGFjaXR5PSIwLjEwIiBzdHJva2UtbGluZWNhcC1kaXJlY3Rpb24tY2hhcmFjdGVyPSIjZmZmIiBzdHJva2UtbGluZWNhcC1kaXJlY3Rpb24tY2hhcmFjdGVyPSIjZmZmIiAvPjwvc3ZnPg==")
      no-repeat right 0.5rem center;
    background-size: 12px;
    background-color: white; /* Background color */
  }

  &::after {
    content: "";
    position: absolute;
    right: 1rem; /* Adjust positioning */
    top: 50%;
    transform: translateY(-50%);
    width: 1rem; /* Adjust size */
    height: 1rem; /* Adjust size */
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzhCOEI5MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjkyIDguOTVMMTMuNCAxNS40N0MxMi42MyAxNi4yNCAxMS4zNyAxNi4yNCAxMC42IDE1LjQ3TDQuMDggOC45NSIgc3Ryb2tlPSIjRjFGMUYxIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==")
      no-repeat center;
    background-size: contain; /* Adjust size to fit within the container */
    pointer-events: none; /* Ensure arrow doesn’t interfere with clicks */
  }
`;

export const PublicHolidayContainerStyled = styled.div`
  width: 100%;
  padding: 0 2rem;
`;
export const PublicHolidaysHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;
export const PublicHolidaysGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  column-gap: 4rem;
  row-gap: 1rem;
`;
