function convertToArray(string) {
  // Takes a string formatted as an array. Returns an actual array
  return string.replace(/['"[\]\ ]/g, "").split(",")
}

export { convertToArray }
