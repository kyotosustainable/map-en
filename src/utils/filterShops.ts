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
    const targetStl = style ? style.value : queryStyle;
    const targetOpt = option ? option.value : null;

    // K列: Category（カンマ区切り対応）
    const rawCat = (item['Category'] || '').trim();
    const shopCategories = rawCat.split(/[,、]/).map((c: string) => c.trim()).filter(Boolean);
    const matchCat = !targetCat || shopCategories.includes(targetCat);

    // L列: Vegan Level（完全一致）
    const itemLvl = (item['Vegan Level'] || '').trim();
    const matchLvl = !targetLvl || itemLvl === targetLvl;

    // M列: Style（カンマ区切り対応）
    const rawStyle = (item['Style'] || '').trim();
    const shopStyles = rawStyle.split(/[,、]/).map((s: string) => s.trim()).filter(Boolean);
    const matchStl = !targetStl || shopStyles.includes(targetStl);

    // N列: Options（カンマ区切り対応）
    const rawOpt = (item['Options'] || '').trim();
    const shopOptions = rawOpt.split(/[,、]/).map((o: string) => o.trim()).filter(Boolean);
    const matchOpt = !targetOpt || shopOptions.includes(targetOpt);

    return matchCat && matchLvl && matchStl && matchOpt;
  });
};
