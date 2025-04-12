
const DateFormatter = (data, dateFields) => {
  return data.map(item => {
    const formattedItem = { ...item };
    dateFields.forEach(field => {
      if (formattedItem[field]) {
        const date = new Date(formattedItem[field]);
        formattedItem[field] = isNaN(date) ? formattedItem[field] : date.toLocaleDateString('en-GB');
      }
    });
    return formattedItem;
  });
};

export default DateFormatter;