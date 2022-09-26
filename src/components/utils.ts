export const capitalizeFirstLetter = (srt: string): string =>
  `${srt.charAt(0).toUpperCase()}${srt.slice(1).toLowerCase()}`;
