export default function debounce(func: () => any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: () => ReturnType<typeof func>, ...args: []) {
    window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
