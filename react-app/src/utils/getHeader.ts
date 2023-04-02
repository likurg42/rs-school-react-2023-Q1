export const getHeader = (location: string) => {
  const locationMapping: { [key: string]: string } = {
    '/about': 'About',
    '/': 'Top G',
    '/profiles': 'Profiles',
  };

  if (Object.prototype.hasOwnProperty.call(locationMapping, location)) {
    return locationMapping[location];
  }

  return '404';
};
