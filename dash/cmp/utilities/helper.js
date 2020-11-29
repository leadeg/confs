
export const getDate = ({date, yearOffset=0, monthOffset=0, dayOffset=0}) => {
  date = date ? new Date(date) : new Date(); // Or your date here
  return (date.getFullYear() + yearOffset) + '-' + (date.getMonth() + 1 + monthOffset) + '-' + (date.getDate() + dayOffset)
};