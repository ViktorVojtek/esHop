export function getSlidesPerView(width: number) {
  if (width > 1200) {
    return 4;
  }
  if (width > 768) {
    return 3;
  }
  if (width > 576) {
    return 2;
  }
  return 1;
}
