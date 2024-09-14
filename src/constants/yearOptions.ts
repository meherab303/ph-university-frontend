const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4].map((item) => {
  return {
    value: String(currentYear + item),
    label: String(currentYear + item),
  };
});
