


export const checkValidateData = (name, email, password) => {

  const isNameValid = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(name);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  if (!isNameValid) {
    return "Please enter a valid name.";
  }

  if (!isEmailValid) {
    return "Please enter a valid email address.";
  }

  if (!isPasswordValid) {
    return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
  }

  return null;
};