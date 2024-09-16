import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ZeForm,
  BtnClose,
  FormInputBasic,
  FormInputSelect,
  FormInputTextArea,
  FormLabel,
} from "../../styles/formStyles.js";

import ButtonBrand from "../buttons/ButtonBrand.jsx";
import ButtonUpload from "../buttons/ButtonUpload.jsx";

export default function RequestForm({ isModalOpen, closeModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [canton, setCanton] = useState("");
  const [pensum, setPensum] = useState("");
  const [manager, setManager] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [employeeAvatar, setEmployeeAvatar] = useState("");

  //const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    let userId = "1";
    const formContent = {
      firstName,
      lastName,
      birthday,
      gender,
      phone,
      emailAddress,
      street,
      city,
      postalCode,
      canton,
      pensum,
      manager,
      activeUser,
      employeeAvatar,
    };
    console.log(JSON.stringify(formContent));
    //dispatch()
    closeModal();
  };

  const handleFileSelect = (file) => {
    // This currently only saves the filename
    console.log("Selected file:", file.name);
    //dispatch(AddCompanyLogo(file.name));
  };

  if (!isModalOpen) return null;

  return (
    <>
      <ModalOverlay>
        <Modal>
          <div
            style={{
              display: "flex",
              marginBottom: "6px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Request Form</h2>
            <BtnClose
              src="/close-cross.png"
              alt="Close Button"
              onClick={closeModal}
              width="18px"
              height="18px"
            />
          </div>
          <ZeForm
            action="submit"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            <div>
              <FormLabel htmlFor="inputFirstName">First Name</FormLabel>
              <FormInputBasic
                id="inputFirstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputLastName">Last Name</FormLabel>
              <FormInputBasic
                id="inputLastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputBirthday">Birthday</FormLabel>
              <FormInputBasic
                id="inputBirthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputRequestType">Gender</FormLabel>
              <FormInputSelect
                id="inputGender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select a value
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </FormInputSelect>
            </div>

            <div>
              <FormLabel htmlFor="inputPhone">Phone</FormLabel>
              <FormInputBasic
                id="inputPhone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputEmailAddress">Email</FormLabel>
              <FormInputBasic
                id="inputEmailAddress"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputStreet">Street</FormLabel>
              <FormInputBasic
                id="inputStreet"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputCity">City</FormLabel>
              <FormInputBasic
                id="inputCity"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputPostalCode">Postal Code</FormLabel>
              <FormInputBasic
                id="inputPostalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputCanton">Canton</FormLabel>
              <FormInputBasic
                id="inputCanton"
                type="text"
                value={canton}
                onChange={(e) => setCanton(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputManager">Manager</FormLabel>
              <FormInputBasic
                id="inputManager"
                type="text"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputPrice">Pensum</FormLabel>
              <FormInputBasic
                id="inputPensum"
                type="number"
                value={pensum}
                onChange={(e) => setPensum(e.target.value)}
              />
            </div>

            <div>
              <FormLabel htmlFor="inputActiveUser">Active</FormLabel>
              <FormInputBasic
                id="inputActiveUser"
                type="checkbox"
                value={activeUser}
                onChange={(e) => setActiveUser(e.target.value)}
                style={{
                  boxShadow: "none",
                }}
              />
            </div>

            <div>
              <FormLabel htmlFor="employeeAvatar">User Avatar :</FormLabel>
              <ButtonUpload
                id="employeeAvatar"
                name="employeeAvatar"
                iconURL={"/image-upload.svg"}
                buttonText={"Upload Image"}
                accept="image/png, image/jpeg"
                onFileSelect={handleFileSelect}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
                width: "100%",
              }}
            >
              <ButtonBrand
                iconURL={"/tick-circle.png"}
                buttonText="Send Request"
                type="submit"
              />
            </div>
          </ZeForm>
        </Modal>
      </ModalOverlay>
    </>
  );
}
