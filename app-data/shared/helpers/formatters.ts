export const formatPrice = (number: number) => {
  let numberToFormat = number.toFixed(2).toString();
  return numberToFormat.replace('.', ',');
};

export const bytesToSize: (bytes: number) => string = (bytes) => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) {
    return '0 Byte';
  }

  const bite: number = 1024;
  const c: number = Math.floor(Math.log(bytes) / Math.log(bite));

  return `${Math.round(bytes / 1024 ** c)} ${sizes[c]}`;
};

const status = {
  0: 'Nová',
  1: 'Odoslaná',
  2: 'Vybavená',
  3: 'Zrušená',
};

const statusColor = {
  0: 'primary',
  1: 'warning',
  2: 'success',
  3: 'danger',
};

const paymentStatus = {
  0: 'Neuhradená',
  1: 'Uhradená',
};

const paymentStatusColor = {
  0: 'danger',
  1: 'success',
};

export const translateStatus: (value: number) => string = (value) => {
  return status[value];
};

export const translateStatusColor: (value: number) => string = (value) => {
  return statusColor[value];
};

export const translatePaymentStatus: (value: number) => string = (value) => {
  return paymentStatus[value];
};

export const translatePaymentStatusColor: (value: number) => string = (
  value
) => {
  return paymentStatusColor[value];
};
