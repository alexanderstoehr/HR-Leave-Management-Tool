function cleanUpIncomingDate(inputDate) {
  inputDate = new Date(inputDate);

  return `${inputDate.getDate()}.${inputDate.getMonth() + 1}.${inputDate.getFullYear()}`;
}

function cleanUpIncomingText(inputText) {
  return inputText[0].toUpperCase() + inputText.slice(1).replace("_", " ");
}

function cleanUpOutgoingDateTime(inputDateTime) {
  return inputDateTime + ":00Z";
}

export { cleanUpIncomingDate, cleanUpIncomingText, cleanUpOutgoingDateTime };
