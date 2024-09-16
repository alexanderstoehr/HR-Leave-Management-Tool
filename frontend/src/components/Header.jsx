import {useDispatch, useSelector} from 'react-redux';
import logo from '../../public/genie3.png';
import profile from '../../public/profile.png';
import bell from '../../public/bell.png';
import {
    HeaderContainer,
    Bell,
    CompanyLogo,
    DropdownView
} from '../styles/headerStyles';
import {changeView} from "../store/slices/ViewSlice.jsx";
import {useEffect, useState} from "react";
import {api} from "../common/api.js";
import {setIsManager, setUserObject} from "../store/slices/UserSlice.jsx";
import {useNavigate} from "react-router-dom";
import AccountMenu from "./AccountMenu.jsx";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const storageView = localStorage.getItem("selectedView");
    dispatch(changeView(storageView));

    const [selectedView, setSelectedView] = useState(storageView);
    const [accountMenuVisbility, setAccountMenuVisibility] = useState(false);
    const [avatar, setAvatar] = useState(profile);

    // const userAvatar = useSelector((state) => state.user.userObject.customUser.avatar);
    // console.log(userAvatar)

    const companyName = useSelector((state) => state.company.companyData.companyName);
    const user = useSelector((state) => state.user.userObject);
    const isManager = useSelector((state) => state.user.managers);

    useEffect(() => {
        if (user && user.customUser && user.customUser.avatar) {
            setAvatar(user.customUser.avatar);
        }
    }, [user]);

    const token = localStorage.getItem("accessToken");

    const handleChange = (event) => {
        dispatch(changeView(event.target.value));
        setSelectedView(event.target.value);
        localStorage.setItem("selectedView", event.target.value);

        switch (event.target.value) {
            case "company_admin":
                // console.log(event.target.value);
                navigate("/company")
                break;
            case "manager":
                // console.log(event.target.value);
                navigate("/manager")
                break;
            case "employee":
                // console.log(event.target.value);
                navigate("/employee")
                break;
            default:
                console.log("No View Selected")
        }
    };

    const handleProfileClick = () => {
        setAccountMenuVisibility(!accountMenuVisbility);

    }

    return (
        <HeaderContainer>
            <div>
                <CompanyLogo>
                    <img src={logo} alt="Constructor Academy Logo"/>
                </CompanyLogo>
                <h1>{companyName}</h1>
            </div>
            <div>
                <DropdownView>
                    <select onChange={handleChange} value={selectedView}>
                        <option value="company_admin">Company View</option>
                        <option value="manager">Manager View</option>
                        <option value="employee">Employee View</option>
                    </select>
                </DropdownView>
                <Bell>
                    <img className="bell" src={bell} alt="Bell"/>
                    <div className={"profile-container"}>
                        <img className="profile-pic" src={avatar} onClick={() => handleProfileClick()} alt="Profile"/>
                        {accountMenuVisbility && <AccountMenu/>}
                    </div>
                </Bell>
            </div>
        </HeaderContainer>
    );
};

export default Header;
