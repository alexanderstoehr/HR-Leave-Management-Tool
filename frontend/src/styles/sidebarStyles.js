import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarStyles = styled.aside`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const NavStyled = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const NavLinkButtonStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 17px 20px;
  gap: 10px;
  width: 215px;
  color: var(--dark-grey);
  border-radius: var(--border-radius-medium);
  text-decoration: none;

  svg {
    stroke: currentColor; /* Use currentColor for SVG stroke */
  }

  &:hover {
    background-color: var(--light-brand-color);
    color: var(--white);

    svg {
      stroke: currentColor;
    }
  }

  &.active {
    background-color: var(--brand-color);
    color: var(--white);
  }
`;
