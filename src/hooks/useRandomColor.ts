// @ts-ignore
import randomColor from 'randomcolor';

export const useRandomColor = () => {
  const color = randomColor({
    format: 'rgb', // e.g. 'rgb(225,200,20)'
    luminosity: 'bright'
  }) as string;

  return color;
};
