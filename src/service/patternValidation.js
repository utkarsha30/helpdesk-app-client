const passwordValidation = (value) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value)
    ? true
    : false;
};
const emailValidation = (value) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ? true
    : false;
};
export { passwordValidation, emailValidation };
