import React from "react";
import Map from "./Map";
import Select from 'react-select';
import { selectStyles } from '../styles/selectStyles';
import { filterShops } from '../utils/filterShops';

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {
  // 4項目のステート
  const [category, setCategory] = React.useState<any>(null);
  const [level, setLevel] = React.useState<any>(null);
  const [style, setStyle] = React.useState<any>(null);
  const [option, setOption] = React.useState<any>(null);

  // 共通フィルター関数（英語カラム判定対応）
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
  // ▼ 英語選択肢の生成
  // =============================

  // K列: Category（カンマ分割）
  const getCategoryOptions = () => {
    const all = new Set<string>();
    props.data.forEach((item: any) => {
      const raw = (item['Category'] || '').trim();
      if (raw) {
        raw.split(/[,、]/).forEach((c: string) => {
          const trimmed = c.trim();
          if (trimmed) all.add(trimmed);
        });
      }
    });
    return Array.from(all).map(v => ({ value: v, label: v }));
  };

  // L列: Vegan Level（単一値）
  const getLevelOptions = () => {
    const uniqueValues = Array.from(
      new Set(props.data.map((item: any) => (item['Vegan Level'] || '').trim()).filter(Boolean))
    );
    return uniqueValues.map(v => ({ value: v, label: v }));
  };

  // M列: Style（カンマ分割）
  const getStyleOptions = () => {
    const all = new Set<string>();
    props.data.forEach((item: any) => {
      const raw = (item['Style'] || '').trim();
      if (raw) {
        raw.split(/[,、]/).forEach((s: string) => {
          const trimmed = s.trim();
          if (trimmed) all.add(trimmed);
        });
      }
    });
    return Array.from(all).map(v => ({ value: v, label: v }));
  };

  // N列: Options（カンマ分割）
  const getOptionOptions = () => {
    const all = new Set<string>();
    props.data.forEach((item: any) => {
      const raw = (item['Options'] || '').trim();
      if (raw) {
        raw.split(/[,、]/).forEach((o: string) => {
          const trimmed = o.trim();
          if (trimmed) all.add(trimmed);
        });
      }
    });
    return Array.from(all).map(v => ({ value: v, label: v }));
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

        {/* ① Category + Vegan Level */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <Select
              placeholder="Category"
              isClearable
              options={getCategoryOptions()}
              onChange={setCategory}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Select
              placeholder="Vegan Level"
              isClearable
              options={getLevelOptions()}
              onChange={setLevel}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>
        </div>

        {/* ② Style + Options */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <Select
              placeholder="Style"
              isClearable
              options={getStyleOptions()}
              onChange={setStyle}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Select
              placeholder="Options"
              isClearable
              options={getOptionOptions()}
              onChange={setOption}
              styles={selectStyles}
              isSearchable={false}
            />
          </div>
        </div>

      </div>

      {/* マップ描画 */}
      <Map data={filteredData} />
    </div>
  );
};

export default Content;
