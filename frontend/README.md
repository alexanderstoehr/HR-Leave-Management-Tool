# HR Project

Main Front-End Packages:
- React/Vite
- React Router Dom
- Redux Toolkit
- Axios
- Styled Components


## Stylings
### Colors
- Brand - 7747CA
- Light Brand - B2A7FF
- Transparent Brand - 7747CA**BF**
- Light Grey (900) - D0D0DA
- Dark Grey (500) - 8B8B93 ( + Greyed Font)
- Black - 07070C ( + Dark Font)
- White - F1F1F1 ( + White Font)
- Red Button Color - E23738
- Green Button Color - 50D1B2
- Orange Calendar Item - EC8C56
- Green Calendar Item - 50D1B2
- Blue Calendar Item - 2775FF

### Border
- Border Radius - 4 / 8 / 12
- 1px solid C6CBD9

### Font
- Font  Family - Poppins (Google Fonts)
- Body Text - Regular 14
- H1 - Company Name - Extra Bold 32
- H2 - Screen Title / Popup Title - Bold 28
- H3 - Card Title - Semibold 16
- Labels - Medium 16
- Placeholder - {Text} Dark Grey
- Button Text / Navigation - Semibold 14

### Buttons
- General Button Padding - 18 24
- Narrow Button Padding - 8 24


## How to use button Components
You must import the component and pass buttonText and iconURL props.
```
import React from "react";
import ButtonBrand from "../components/buttons/ButtonBrand.jsx"
import ButtonGreen from "../components/buttons/ButtonGreen.jsx"
import ButtonRed from "../components/buttons/ButtonRed.jsx"

export default function YourComponentOrRoute() {

    return (
        <div>
            <ButtonBrand buttonText={'New Request'} iconURL={'/plus.png'}/>
            <ButtonGreen buttonText={'Approve'} iconURL={'/tick-circle.png'}/>
            <ButtonRed buttonText={'Deny'} iconURL={'/cross-deny.png'}/>
        </div>
    )
}
```