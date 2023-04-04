function convertToArray(string) {
  // Takes a string formatted as an array. Returns an actual array
  return string ? string.replace(/['"[\]\ ]/g, "").split(",") : null
}

function convertToBoolean(string) {
  // Takes a string and transforms it to a Boolean
  return string === "true"
}

export { convertToArray, convertToBoolean }
