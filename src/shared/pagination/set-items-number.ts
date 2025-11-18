export function setItemsNumber<T>(
  items: any[],
  page: number,
  limit: 30 | 50 | 100,
): T[] {
  // 게시물 번호 붙이기
  let no = page === 1 ? 0 : (page - 1) * limit;
  return items.map((item, index) => {
    no = no + 1;
    return { ...item, no: no };
  });
}
