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

    const matchCat = !targetCat || item['Category'] === targetCat;
    const matchLvl = !targetLvl || item['Vegan Level'] === targetLvl;

    const matchStl = !style ||
      (item['Style'] || '').includes(style.value);

    const matchOpt = !option ||
      (item['Option'] || '').includes(option.value);

    return matchCat && matchLvl && matchStl && matchOpt;
  });
};
