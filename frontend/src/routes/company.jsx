import {
  RouteContentStyled,
  RouteHeadStyled,
} from "../styles/routeGeneralStyles.js";
import {
  CompanyFieldsStyled,
  PublicHolidayContainerStyled,
  PublicHolidaysGridStyled,
  PublicHolidaysHeaderStyled,
  WorkingHoursStyled,
  StyledSelectWrapper,
} from "../styles/companySettingsStyles.js";
import ButtonUpload from "../components/buttons/ButtonUpload.jsx";
import ButtonBrand from "../components/buttons/ButtonBrand.jsx";
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import PublicHolidaysForm from "../components/forms/PublicHolidaysForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import PublicHolidayCard from "../components/PublicHolidayCard.jsx";
import {
  AddCompanyID,
  AddCompanyLogo,
  ChangeCompanyName,
  ChangeEndHours,
  ChangeStartHours,
} from "../store/slices/CompanySlice.jsx";
import { api } from "../common/api.js";
import SuccessMessage from "../components/SuccessMessage.jsx";

PublicHolidaysForm.propTypes = {
  isModalOpen: PropTypes.any,
  closeModal: PropTypes.func,
};
export default function CompanyRoute() {
  const dispatch = useDispatch();

  const companyData = useSelector((state) => state.company.companyData);
  const publicHolidays = useSelector((state) => state.company.publicHolidays);
  const companyStartWorkingHours = useSelector(
    (state) => state.company.companyData.companyWorkingHours.start,
  );
  const companyEndWorkingHours = useSelector(
    (state) => state.company.companyData.companyWorkingHours.end,
  );
  const companyId = useSelector((state) => state.company.companyData.companyId);

  // const companyLogo = useSelector((state) => state.company.companyData.companyLogo);

  const [showAlert, setShowAlert] = useState(false);

  const saveMessage = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    api.setAuthToken(token);
    // console.log(token);
    api("/companies/me/").then((res) => {
      // console.log(res.data.id);
      dispatch(ChangeCompanyName(res.data.companyName));
      dispatch(AddCompanyID(res.data.id));
    });
  }, []);

  const handleFileSelect = (file) => {
    // This currently only saves the filename
    console.log("Selected file:", file.name);
    dispatch(AddCompanyLogo(file.name));
  };

  const handleStartHourChange = (event) => {
    let newStartHour = event.target.value;
    console.log(newStartHour);
    dispatch(ChangeStartHours(newStartHour));
  };

  const handleEndHourChange = (event) => {
    let newEndHour = event.target.value;
    console.log(event.target.value);
    dispatch(ChangeEndHours(newEndHour));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalData = (data) => {
    console.log(data);
  };

  const saveSettings = () => {
    const dataToSend = {
      companyName: companyData.companyName,
    };
    // console.log("patching company data: ", companyData.companyId)
    api
      .patch(`/companies/${companyId}/`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("then: ", res.data);
      })
      .catch((error) => {
        console.error("Error saving settings:", error);
      });
  };

  return (
    <RouteContentStyled>
      <RouteHeadStyled>
        <div>
          <h2>Company Settings</h2>
          <p>Here you can handle essential information about the company.</p>
        </div>
      </RouteHeadStyled>

      <CompanyFieldsStyled>
        <div>
          <h3>Company Name</h3>
          <input
            value={companyData.companyName}
            type="text"
            placeholder={companyData.companyName}
            onChange={(e) => dispatch(ChangeCompanyName(e.target.value))}
          />
        </div>
        <div>
          <h3>Company Logo</h3>
          <ButtonUpload
            iconURL={"/image-upload.svg"}
            buttonText={"Upload Image"}
            onFileSelect={handleFileSelect}
          />
        </div>

        <WorkingHoursStyled>
          <h3>Working Hours</h3>
          <div>
            <p style={{ marginBottom: "10px", color: "var(--dark-grey)" }}>
              Start:
            </p>
            <StyledSelectWrapper
              value={companyStartWorkingHours}
              onChange={handleStartHourChange}
            >
              <select>
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                  </option>
                ))}
              </select>
            </StyledSelectWrapper>
          </div>
          <div>
            <p style={{ marginBottom: "10px", color: "var(--dark-grey)" }}>
              End:
            </p>
            <StyledSelectWrapper
              value={companyEndWorkingHours}
              onChange={handleEndHourChange}
            >
              {" "}
              <select>
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                  </option>
                ))}
              </select>
            </StyledSelectWrapper>
          </div>
        </WorkingHoursStyled>

        <div className={"saveArea"}>
          {showAlert && <SuccessMessage message={"Settings saved!"} />}
          <ButtonBrand
            buttonText={"Save Settings"}
            iconURL={""}
            onClick={() => {
              saveSettings();
              saveMessage();
            }}
          />
        </div>
      </CompanyFieldsStyled>
      <PublicHolidayContainerStyled>
        <PublicHolidaysHeaderStyled>
          <h3>Public Holidays</h3>
          <ButtonBrand
            buttonText={"Add Holiday"}
            iconURL={"/plus-add.svg"}
            onClick={() => toggleModal()}
          />
        </PublicHolidaysHeaderStyled>
        <PublicHolidaysGridStyled>
          {publicHolidays.map((holiday, i) => (
            <PublicHolidayCard key={i} publicHoliday={holiday} />
          ))}
        </PublicHolidaysGridStyled>
      </PublicHolidayContainerStyled>

      <PublicHolidaysForm
        isModalOpen={isModalOpen}
        closeModal={toggleModal}
        onModalSave={handleModalData}
      />
    </RouteContentStyled>
  );
}
