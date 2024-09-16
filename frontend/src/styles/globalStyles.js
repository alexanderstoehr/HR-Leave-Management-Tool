import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :root {
        height: 100vh;
        width: 100vw;

        --brand-color: #7747CA;
        --light-brand-color: #B2A7FF;
        --transparent-brand-color: #7747CABF;
        --light-grey: #D0D0DA;
        --dark-grey: #8B8B93;
        --black: #07070C;
        --white: #F1F1F1;
        --background-color: #EAEAF4;
        --red-button-color: #E23738;
        --green-button-color: #50D1B2;
        --orange-calendar-item: #EC8C56;
        --green-calendar-item: #50D1B2;
        --blue-calendar-item: #2775FF;
        --border-radius-small: 4px;
        --border-radius-medium: 8px;
        --border-radius-large: 12px;
        --border-style: 1px solid #C6CBD9;
        --font-family: 'Poppins', sans-serif;
        --inputs-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

        //div {
        //    border: 1px solid green;
        //}
    }

    body {
        font-family: var(--font-family);
        font-size: 14px; /* Body Text Regular 14 */
        background-color: var(--background-color);

    }

    a {
        text-decoration: none;
        color: var(--black);
    }

    h1 {
        font-size: 32px; /* Company Name - Extra Bold 32 */
        font-weight: 800;
    }

    h2 {
        font-size: 28px; /* Screen Title / Popup Title - Bold 28 */
        font-weight: 700;
    }

    h3 {
        font-size: 16px; /* Card Title - Semibold 16 */
        font-weight: 600;
    }

    label {
        font-size: 16px; /* Labels - Medium 16 */
        font-weight: 500;
    }

    button {
        font-size: 14px; /* Button Text / Navigation - Semibold 14 */
        font-weight: 600;
        padding: 18px 24px; /* General Button Padding */

        &:hover {
            transform: scale(0.97);
            transition: all 0.1s ease-in-out;
            cursor: pointer;

        }
    }

    .narrow-button {
        padding: 8px 24px; /* Narrow Button Padding */
    }

    input::placeholder {
        color: var(--dark-grey); /* Placeholder - Dark Grey */
    }

    input, select, .dropdown {
        box-shadow: var(--inputs-shadow);
    }

    @keyframes ring {
        0% {
            transform: rotate(0);
        }
        1% {
            transform: rotate(30deg);
        }
        3% {
            transform: rotate(-28deg);
        }
        5% {
            transform: rotate(34deg);
        }
        7% {
            transform: rotate(-32deg);
        }
        9% {
            transform: rotate(30deg);
        }
        11% {
            transform: rotate(-28deg);
        }
        13% {
            transform: rotate(26deg);
        }
        15% {
            transform: rotate(-24deg);
        }
        17% {
            transform: rotate(22deg);
        }
        19% {
            transform: rotate(-20deg);
        }
        21% {
            transform: rotate(18deg);
        }
        23% {
            transform: rotate(-16deg);
        }
        25% {
            transform: rotate(14deg);
        }
        27% {
            transform: rotate(-12deg);
        }
        29% {
            transform: rotate(10deg);
        }
        31% {
            transform: rotate(-8deg);
        }
        33% {
            transform: rotate(6deg);
        }
        35% {
            transform: rotate(-4deg);
        }
        37% {
            transform: rotate(2deg);
        }
        39% {
            transform: rotate(-1deg);
        }
        41% {
            transform: rotate(1deg);
        }

        43% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(0);
        }
    }
`;
