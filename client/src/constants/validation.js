export const validateFirstName = (firstName) => {
  // Regex to enforce proper capitalization and no invalid characters (only letters and spaces)
  const regex = /^[A-Z][a-z]*([ ]([A-Z][a-z]*))*$/;
  const invalidCharsRegex = /[^A-Za-z\s]/; // Checks for any special characters or numbers
  const repeatedCharRegex = /(.)\1{2,}/;
  const maxLength = 20;

  // Check if the first name is empty
  if (!firstName) return "First name is required.";

  // Check for invalid characters like numbers or special characters
  if (invalidCharsRegex.test(firstName.trim()))
    return "First name must not contain special characters or numbers.";

  // Validate capitalization rule (only first letters are capitalized properly)
  if (!regex.test(firstName.trim()))
    return "Capitalization is allowed only at the start of each word in name";

  if (firstName.trim().length < 2)
    return "First name must be at least 2 characters long.";
  if (firstName.trim().length > maxLength)
    return `First name must be at most ${maxLength} characters long.`;

  // Check for repeated characters made it stronger
  const lowerCaseName = firstName.trim().toLowerCase();
  if (repeatedCharRegex.test(lowerCaseName))
    return "First name must not contain repeated characters.";

  return "";
};

export const validateMiddleName = (middleName) => {
  const regex = /^[A-Z][a-z]*([ ]([A-Z][a-z]*))*$/;
  const invalidCharsRegex = /[^A-Za-z\s]/;
  const repeatedCharRegex = /(.)\1{2,}/;
  const maxLength = 20;

  if (!middleName) return "Middle name is required.";

  if (invalidCharsRegex.test(middleName.trim()))
    return "Middle name must not contain special characters or numbers.";

  if (!regex.test(middleName.trim()))
    return "Capitalization is allowed only at the start of each word in name";

  if (middleName.trim().length < 2)
    return "Middle name must be at least 2 characters long.";
  if (middleName.trim().length > maxLength)
    return `Middle name must be at most ${maxLength} characters long.`;

  const lowerCaseName = middleName.trim().toLowerCase();
  if (repeatedCharRegex.test(lowerCaseName))
    return "Middle name must not contain repeated characters.";

  return "";
};

export const validateLastName = (lastName) => {
  const regex = /^[A-Z][a-z]*([ ]([A-Z][a-z]*))*$/;
  const invalidCharsRegex = /[^A-Za-z\s]/;
  const repeatedCharRegex = /(.)\1{2,}/;
  const maxLength = 30;

  if (!lastName) return "Last name is required.";

  if (invalidCharsRegex.test(lastName.trim()))
    return "Last name must not contain special characters or numbers.";

  if (!regex.test(lastName.trim()))
    return "Capitalization is allowed only at the start of each word in name";

  if (lastName.trim().length < 2)
    return "Last name must be at least 2 characters long.";
  if (lastName.trim().length > maxLength)
    return `Last name must be at most ${maxLength} characters long.`;

  const lowerCaseName = lastName.trim().toLowerCase();
  if (repeatedCharRegex.test(lowerCaseName))
    return "Last name must not contain repeated characters.";

  return "";
};

export const validateBirthday = (birthday, age) => {
  if (!birthday) return "Birthday is required.";

  const birthdayDate = new Date(birthday);

  const currentDate = new Date();

  // Minimum age for validation: 60 years
  const sixtyYearsAgo = new Date("1964-01-01");

  if (birthdayDate > currentDate) return "Birthday cannot be a future date.";

  // Check if the birthday makes the person at least 60 years old
  if (birthdayDate < sixtyYearsAgo)
    return "The birthdate must not be earlier than January 1, 1964, based on app standards.";

  if (isNaN(birthdayDate.getTime())) return "Invalid date format.";

  const calculatedAge = currentDate.getFullYear() - birthdayDate.getFullYear();

  // Check if the birthday has already passed this year
  const isBirthdayPastThisYear =
    currentDate.getMonth() > birthdayDate.getMonth() ||
    (currentDate.getMonth() === birthdayDate.getMonth() &&
      currentDate.getDate() >= birthdayDate.getDate());

  const finalCalculatedAge = isBirthdayPastThisYear
    ? calculatedAge
    : calculatedAge - 1;

  console.log(`Calculated Age: ${finalCalculatedAge}, Provided Age: ${age}`);

  if (Number(finalCalculatedAge) !== Number(age)) {
    return `The age (${age}) does not match the birthday.`;
  }

  return "";
};

export const validateAge = (age) => {
  if (!age) return "Age is required.";
  if (age < 18) return "Age must be at least 18.";
  if (age > 60) return "Age must be less than or equal to 60.";
  return "";
};

export const validateContactNumber = (contactNumber) => {
  const regex = /^09\d{9}$/;

  if (!contactNumber) return "Contact number is required.";

  const trimmedContactNumber = contactNumber.trim();

  if (/[^0-9]/.test(trimmedContactNumber)) {
    return "Contact number must not contain letters or special characters.";
  }

  if (!regex.test(trimmedContactNumber)) {
    return "Contact number must be a valid Philippine mobile number.";
  }

  if (/(\d)\1{3,}/.test(trimmedContactNumber)) {
    return "Contact number must not contain 4 or more repeating digits.";
  }

  return "";
};

export const validateEmail = (email) => {
  const validProviders = [
    "gmail.com",
    "yahoo.com",
    "yahoo.com.ph",
    "outlook.com",
    "hotmail.com",
    "aol.com",
    "icloud.com",
    "gov.ph",
    "dfa.gov.ph",
    "dip.gov.ph",
    "deped.gov.ph",
    "neda.gov.ph",
    "doh.gov.ph",
    "dti.gov.ph",
    "dswd.gov.ph",
    "dbm.gov.ph",
    "pcso.gov.ph",
    "pnp.gov.ph",
    "bsp.gov.ph",
    "prc.gov.ph",
    "psa.gov.ph",
    "dpwh.gov.ph",
    "lto.gov.ph",
    "boi.gov.ph",
    "hotmail.co.uk",
    "hotmail.fr",
    "msn.com",
    "yahoo.fr",
    "wanadoo.fr",
    "orange.fr",
    "comcast.net",
    "yahoo.co.uk",
    "yahoo.com.br",
    "yahoo.com.in",
    "live.com",
    "rediffmail.com",
    "free.fr",
    "gmx.de",
    "web.de",
    "yandex.ru",
    "ymail.com",
    "libero.it",
    "uol.com.br",
    "bol.com.br",
    "mail.ru",
    "cox.net",
    "hotmail.it",
    "sbcglobal.net",
    "sfr.fr",
    "live.fr",
    "verizon.net",
    "live.co.uk",
    "googlemail.com",
    "yahoo.es",
    "ig.com.br",
    "live.nl",
    "bigpond.com",
    "terra.com.br",
    "yahoo.it",
    "neuf.fr",
    "yahoo.de",
    "alice.it",
    "rocketmail.com",
    "att.net",
    "laposte.net",
    "facebook.com",
    "bellsouth.net",
    "yahoo.in",
    "hotmail.es",
    "charter.net",
    "yahoo.ca",
    "yahoo.com.au",
    "rambler.ru",
    "hotmail.de",
    "tiscali.it",
    "shaw.ca",
    "yahoo.co.jp",
    "sky.com",
    "earthlink.net",
    "optonline.net",
    "freenet.de",
    "t-online.de",
    "aliceadsl.fr",
    "virgilio.it",
    "home.nl",
    "qq.com",
    "telenet.be",
    "me.com",
    "yahoo.com.ar",
    "tiscali.co.uk",
    "yahoo.com.mx",
    "voila.fr",
    "gmx.net",
    "mail.com",
    "planet.nl",
    "tin.it",
    "live.it",
    "ntlworld.com",
    "arcor.de",
    "yahoo.co.id",
    "frontiernet.net",
    "hetnet.nl",
    "live.com.au",
    "yahoo.com.sg",
    "zonnet.nl",
    "club-internet.fr",
    "juno.com",
    "optusnet.com.au",
    "blueyonder.co.uk",
    "bluewin.ch",
    "skynet.be",
    "sympatico.ca",
    "windstream.net",
    "mac.com",
    "centurytel.net",
    "chello.nl",
    "live.ca",
    "aim.com",
    "bigpond.net.au",
    "up.edu.ph",
    "addu.edu.ph",
    "ateneo.edu.ph",
    "dlsu.edu.ph",
    "ust.edu.ph",
    "lu.edu.ph",
  ];
  const domain = email.split("@")[1];
  const localPart = email.split("@")[0];
  const isStrictGovPh = validProviders.some((provider) =>
    new RegExp(`^${provider}$`).test(domain)
  );

  email = email.trim();

  if (!email) return "Email is required.";

  if (localPart.length > 64) {
    return "The local part (before the '@') of the email address cannot exceed 64 characters.";
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}(\.[a-z]{2,})?$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format. Please enter a valid email address.";
  }

  if (!isStrictGovPh) {
    return `Invalid email domain. ${domain} is not a recognized email provider.`;
  }

  return "";
};
