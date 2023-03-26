export const getHeader = (location: string) => {
  const locationMapping: { [key: string]: string } = {
    '/about': 'About',
    '/': 'Top G',
    '/profiles': 'Profiles'
  };

  if (locationMapping.hasOwnProperty(location)) {
    return locationMapping[location];
  }

  return '404';
};
