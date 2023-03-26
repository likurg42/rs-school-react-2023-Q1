const getAge = (date: string) => {
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
