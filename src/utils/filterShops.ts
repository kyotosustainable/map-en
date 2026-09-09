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

    // 【修正】カンマ区切りの中に targetCat が含まれているかを判定
    const rawCat = item['カテゴリ'] || item['Category'] || '';
    const shopCategories = rawCat.split(/[,、]/).map((c: string) => c.trim());
    const matchCat = !targetCat || shopCategories.includes(targetCat);

    const matchLvl = !targetLvl || item['ヴィーガンレベル'] === targetLvl;

    const matchStl = !style ||
      (item['スタイル'] || '').includes(style.value);

    const matchOpt = !option ||
      (item['オプション'] || '').includes(option.value);

    return matchCat && matchLvl && matchStl && matchOpt;
  });
};
