import { BtnUpload } from "../../styles/buttonStyles.js";
import { useRef } from "react";

// eslint-disable-next-line react/prop-types
export default function ButtonUpload({
  iconURL,
  buttonText,
  onFileSelect,
  ...props
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file, e.g., update state, display file name, upload to server, etc.
    // console.log(file.name);
    onFileSelect(file);
  };

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <BtnUpload {...props} onClick={handleButtonClick}>
        <img src={iconURL} alt="icon" /> {buttonText}
      </BtnUpload>
    </>
  );
}
