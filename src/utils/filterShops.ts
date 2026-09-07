export const filterShops = (
  data: any[],
  {
    category,
    level,
    style,
    option,
    queryCategory,
    queryLevel,
    queryStyle
  }: any
) => {
  return data.filter((item: any) => {
    const targetCat = category ? category.value : queryCategory;
    const targetLvl = level ? level.value : queryLevel;

    const matchCat = !targetCat || item['カテゴリ'] === targetCat;
    const matchLvl = !targetLvl || item['ヴィーガンレベル'] === targetLvl;

    const matchStl = !style ||
      (item['スタイル'] || '').includes(style.value);

    const matchOpt = !option ||
      (item['オプション'] || '').includes(option.value);

    return matchCat && matchLvl && matchStl && matchOpt;
  });
};
