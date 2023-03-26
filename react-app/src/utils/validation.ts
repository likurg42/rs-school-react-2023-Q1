export const getAge = (date: string) => {
  const birthDate = new Date(date);
  const today = new Date();
  const currentAge = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) return currentAge - 1;
  return currentAge;
};

export const isAgeUnder18 = (birthDate: string) => {
  const currentAge = getAge(birthDate);
  return currentAge < 18;
};

export const startsWithCapital = (name: string) => {
  return name === name[0].toUpperCase() + name.slice(1);
};

export const isValidUrl = (url: string) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return urlPattern.test(url);
};
