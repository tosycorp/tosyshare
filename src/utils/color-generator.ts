import { AlertProps } from 'react-bootstrap';

const colors: AlertProps['variant'][] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
];

let availableColors: AlertProps['variant'][];
export default () => {
  if (!availableColors || !availableColors.length) {
    availableColors = [...colors];
  }
  const randomColorIndex = Math.floor(Math.random() * availableColors.length);
  const randomColor = availableColors.splice(randomColorIndex, 1);

  return randomColor[0];
};
