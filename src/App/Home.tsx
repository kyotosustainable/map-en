import React from "react";
import Map from "./Map";
import Select from 'react-select';
import { selectStyles } from '../styles/selectStyles';
import { filterShops } from '../utils/filterShops';

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {
  // ✅ 4項目に統一
  const [category, setCategory] = React.useState<any>(null);
  const [level, setLevel] = React.useState<any>(null);
  const [style, setStyle] = React.useState<any>(null);
  const [option, setOption] = React.useState<any>(null);

  // ✅ 共通フィルター関数
  const filteredData = filterShops(props.data, {
    category,
    level,
    style,
    option,
    queryCategory: null,
    queryLevel: null,
    queryStyle: null
  });

  // =============================
  // ▼ 選択肢生成
  // =============================

  // スタイル（カンマ分割）
  const getStyleOptions = () => {
    const all = new Set<string>();
    props.data.forEach((item: any) => {
      if (item['スタイル']) {
        item['スタイル'].split(',').forEach((s: string) => all.add(s.trim()));
      }
    });
    return Array.from(all).map(v => ({ value: v, label: v }));
  };

  // オプション（カンマ分割）
  const getOptionOptions = () => {
    const all = new Set<string>();
    props.data.forEach((item: any) => {
      if (item['オプション']) {
        item['オプション'].split(',').forEach((o: string) => all.add(o.trim()));
      }
    });
    return Array.from(all).map(v => ({ value: v, label: v }));
  };

  // 単一値系
  const getOptions = (key: string) => {
    const uniqueValues = Array.from(
      new Set(props.data.map((item: any) => item[key]).filter(Boolean))
    );
    return uniqueValues.map(v => ({ value: v, label: v }));
  };

  // =============================
  // ▼ UI
  // =============================

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      
      {/* フィルターUI */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        right: '15px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>

        {/* ① カテゴリ + レベル */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <Select
              placeholder="カテゴリ"
              isClearable
              options={getOptions('カテゴリ')}
              onChange={setCategory}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Select
              placeholder="ヴィーガンレベル"
              isClearable
              options={getOptions('ヴィーガンレベル')}
              onChange={setLevel}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>
        </div>

        {/* ② スタイル + オプション */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <Select
              placeholder="スタイル"
              isClearable
              options={getStyleOptions()}
              onChange={setStyle}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Select
              placeholder="オプション"
              isClearable
              options={getOptionOptions()}
              onChange={setOption}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>
        </div>

      </div>

      {/* マップ */}
      <Map data={filteredData} />
    </div>
  );
};

export default Content;
