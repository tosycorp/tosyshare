type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';

const colors: Variant[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
  'light',
];

const colorMap: { [key: string]: Variant } = {};

export default (id: string): Variant => {
  if (colorMap[id]) {
    return colorMap[id];
  }

  // Return last color if there is no more available color
  if (colors.length === 1) {
    return colors[0];
  }

  const selectedColor = colors.shift();
  colorMap[id] = selectedColor;

  return selectedColor;
};
