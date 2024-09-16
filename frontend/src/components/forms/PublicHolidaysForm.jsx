import {useState} from "react";

import {
    Modal,
    ModalOverlay,
    ZeForm,
    BtnClose,
    FormInputBasic,
    FormLabel,
} from "../../styles/formStyles.js";

import ButtonBrand from "../buttons/ButtonBrand.jsx";
import {AddHoliday} from "../../store/slices/CompanySlice.jsx";
import {useDispatch} from "react-redux";

export default function PublicHolidaysForm({isModalOpen, closeModal}) {
    const [holidayName, setPublicHolidayName] = useState("");
    const [holidayDate, setPublicHolidayDate] = useState("");

    // console.log(publicHolidayName, publicHolidayDate)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formContent = {
            holidayName,
            holidayDate,

        };
        // console.log("Form Content: ", JSON.stringify(formContent));
        dispatch(AddHoliday(formContent));
        setPublicHolidayName("");
        setPublicHolidayDate("");
        closeModal();
    };

    const handleClose = () => {
        setPublicHolidayName("");
        setPublicHolidayDate("");
        closeModal();
    }

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
                        <h2>Add Holiday</h2>
                        <BtnClose
                            src="/close-cross.png"
                            alt="Close Button"
                            onClick={handleClose}
                            width="18px"
                            height="18px"
                        />
                    </div>
                    <ZeForm action="submit" onSubmit={handleSubmit}>
                        <div>
                            <FormLabel htmlFor="inputPublicHolidayName">Holiday Name</FormLabel>
                            <FormInputBasic
                                id="inputPublicHolidayName"
                                type="text"
                                value={holidayName}
                                onChange={(e) => setPublicHolidayName(e.target.value)}
                            />
                        </div>

                        <div>
                            <FormLabel htmlFor="inputPublicHolidayDate">Date</FormLabel>
                            <FormInputBasic
                                id="inputPublicHolidayDate"
                                type="date"
                                placeholder="dd-mm-yyyy"
                                value={holidayDate}
                                onChange={(e) => setPublicHolidayDate(e.target.value)}
                            />
                        </div>


                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "10px",
                            }}
                        >
                            <ButtonBrand
                                iconURL={"/tick-circle.png"}
                                buttonText="Add Holiday"
                                type="submit"
                                disabled={!holidayName || !holidayDate}
                            />
                        </div>
                    </ZeForm>
                </Modal>
            </ModalOverlay>
        </>
    );
}
