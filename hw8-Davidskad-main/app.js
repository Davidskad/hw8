const GALACTIC_MAP = getGalaticMap();

/**
 * This function is already written for you!
 * Called whenever the "Navigate!" button is pressed.
 * First, it checks if the given galatic code is valid.
 * If it is valid, it alerts the user of the corresponding galatic address.
 * Otherwise, it informs the user that the given galatic code is invalid. 
 */
function navigate() {
    console.log("Navigate function called");
    setErrorText(); // Reset error text
    const code = document.getElementById("galatic-code").value;
    console.log("Input code:", code);

    if (isValidGalaticCode(code)) {
        console.log("Code is valid");
        let sector = lookupSectorName(code);
        console.log("Sector:", sector);
        let unit = lookupDwellingUnit(code);
        console.log("Unit:", unit);
        let division = lookupDivisionName(code);
        console.log("Division:", division);
        alert(`${unit} ${division} of ${sector}`);
    } else {
        console.log("Code is invalid");
        setErrorText("The specified galatic address is invalid.");
    }
}

/**
 * This function should lookup the name of the sector from the
 * given galatic code in a case-insensitive manner using GALATIC_MAP.
 * @param {string} galaticCode Some galatic code, e.g. C.360@2
 * @returns {string} The given sector name, e.g. "Charlie"
 */
function lookupSectorName(galaticCode) {
    console.log("Looking up sector for code:", galaticCode);
    const sectorCode = galaticCode[0].toLowerCase();
    console.log("Sector code:", sectorCode);
    return GALACTIC_MAP[sectorCode].name;
}

/**
 * This function should lookup the dwelling unit from the
 * given galatic code. You MUST use a loop to accomplish this.
 * You may NOT use the string `split` function NOR may you use
 * regex functions like `matches`, `matchAll`, `exec`, etc.
 * @param {string} galaticCode Some galatic code, e.g. C.360@2
 * @returns {string} The given dwelling unit, e.g. "360"
 */
function lookupDwellingUnit(galaticCode) {
    console.log("Looking up dwelling unit for code:", galaticCode);
    let dwellingUnit = "";
    let i = 2; // Start after sector code and period

    while (i < galaticCode.length && galaticCode[i] !== '@') {
        dwellingUnit += galaticCode[i];
        i++;
    }

    console.log("Found dwelling unit:", dwellingUnit);
    return dwellingUnit;
}

/**
 * This function should lookup the division name from the
 * given galatic code according to the specified sector
 * in a case-insensitive manner using GALATIC_MAP.
 * @param {string} galaticCode Some galatic code, e.g. C.360@2
 * @returns {string} The given division name, e.g. "Solar Pulsarium Ln"
 */
function lookupDivisionName(galaticCode) {
    console.log("Looking up division for code:", galaticCode);
    const sectorCode = galaticCode[0].toLowerCase();
    const divisionIndex = parseInt(galaticCode[galaticCode.length - 1]);
    console.log("Sector code:", sectorCode, "Division index:", divisionIndex);
    return GALACTIC_MAP[sectorCode].divisions[divisionIndex];
}

/**
 * This function should first check if msg is a truthy value.
 * If it is, it should add `is-invalid` to the className of the
 * `galatic-code` form control and set the error text. Otherwise,
 * it should reset any error text and invalid form control state.
 * @param {string || null || undefined} msg The given error message, if any.
 */
function setErrorText(msg) {
    const formControl = document.getElementById("galatic-code");
    const errorText = document.getElementById("galatic-code-error-text");

    if (msg) {
        formControl.className += " is-invalid";
        errorText.textContent = msg;
    } else {
        formControl.className = formControl.className.replace(" is-invalid", "");
        errorText.textContent = "";
    }
}

/**
 * This function is already written for you!
 * Using regular expressions (regex), it checks whether the given
 * galatic code is in a valid format.
 * @param {string} galaticCode Some galatic code, e.g. C.360@2
 * @returns {boolean} Whether the given code is valid.
 */
function isValidGalaticCode(galaticCode) {
    const isValid = /^[a-zA-Z]\.[0-9]+@[0-9]$/.test(galaticCode);
    console.log("Code validity:", isValid);
    return isValid;
}