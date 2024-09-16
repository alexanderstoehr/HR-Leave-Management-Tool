import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const RouteContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 2rem 2rem 3.1rem;
`;

export const RouteHeadStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 2rem;

  p {
    color: var(--dark-grey);
  }
`;
