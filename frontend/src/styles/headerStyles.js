import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: --light-grey: #D0D0DA;
    border-bottom: 2px solid var(--light-grey);
    margin-bottom: 1rem;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem;
    }
`;

export const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  width: 216px;

  img {
    height: 70px;
    width: 250px;
    object-fit: contain;
    border-radius: var(--border-radius-large);
  }
`;

export const CompanyName = styled.span`
  font-size: 36px;
  font-weight: 700;
  margin-left: 10px;
  color: var(--black);
`;

export const DropdownView = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  select {
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

export const Bell = styled.div`
  display: flex;

  .bell {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: var(--black);

    &:hover,
    &:focus {
      animation: ring 4s 0.1s ease-in-out infinite;
    }
  }

  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      transform: scale(0.97);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      color: var(--brand-color);
    }
  }
`;

export const AccountMenuContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 50px;
  background-color: var(--white);
  border-radius: var(--border-radius-small);
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
  box-shadow: var(--inputs-shadow);

  div {
    cursor: pointer;

    &:hover {
      transform: scale(0.97);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      color: var(--brand-color);
    }
  }
`;
