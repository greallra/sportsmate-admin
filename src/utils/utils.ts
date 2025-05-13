export const sum = (num1: number, num2: number): number => {
  if (!num1 || !num2 || !Number(num1) || !Number(num2)) {
    throw 'invalid params sum';
  }
  return num1 + num2;
};

export function fbTimeObjectToDateObject(fbTimeObject) {
  if (!fbTimeObject) {
    return 'N/A';
  }
  if (isNaN(fbTimeObject.seconds) || isNaN(fbTimeObject.nanoseconds)) {
    return 'N/A';
  }
  return new Date(fbTimeObject.seconds * 1000 + fbTimeObject.nanoseconds / 1000000);
}
