/* eslint-disable linebreak-style */

export function convertToCelsius(kelvins) {
  return Math.round(kelvins - 272.15);
}
export function convertToFahrenheit(kelvins) {
  return Math.round((kelvins * 9) / 5 - 459.67);
}
