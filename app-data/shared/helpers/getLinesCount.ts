export const getLinesCount = (text: string) => {
  return text.split(/\r\n|\r|\n/).length;
};
