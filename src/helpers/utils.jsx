export function beautify_key_names(key) {
  key = key.replace(/_/g, " ");
  // uppercase first letter of each word
  key = key.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  return key;
}

export function beautify_date(dateString) { 
  // date format is "2023-03-23T19:01:26.688000Z" beautify it
  const newDateString = `${dateString.split("T")[0]} at ${dateString.split("T")[1].split(".")[0]}`;
    return newDateString;
}


export function isDateString(str) {
  const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z/;
  if (dateFormat.test(str)) {
    return true;
  } else {
    return false;
  }
}