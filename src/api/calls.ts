export function getTodos() {
  return new Promise<any>((resolve, reject) => {
    return setTimeout(() => {
      resolve([
        {
          id: 12,
          title: 'make bed',
          isDone: true,
        },
        {
          id: 12,
          title: 'do dished',
          isDone: false,
        },
      ]);
    }, 2000);
  });
}
