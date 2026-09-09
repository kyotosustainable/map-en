import React from "react";

type Props = {
  data: Pwamap.ShopData;
  popupHandler: (shop: Pwamap.ShopData) => void;
  queryCategory: string | null;
};

const ShopListItem = (props: Props) => {
  const { data, popupHandler } = props;
  const item = data as Record<string, any>;

  // ✅ 英語カラム（Spot Name / Category）を最優先で取得
  const title = (item['Spot Name'] || item['スポット名'] || item['name'] || '').trim();
  const category = (item['Category'] || item['カテゴリ'] || '').trim();
  const imageUrl = item['画像'] || item['image'] || '';
  const timestamp = item['タイムスタンプ'] || item['timestamp'] || '';
  const dateStr = typeof timestamp === 'string' ? timestamp.split(' ')[0] : '';

  return (
    <div className="shop-list-item" onClick={() => popupHandler(data)}>
      {/* 左側：正方形の画像エリア */}
      <div className="item-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      {/* 右側：コンテンツエリア */}
      <div className="item-content">
        {category && <div className="item-category-tag">{category}</div>}
        {/* ✅ ここに英語店名が入ります */}
        <h3 className="item-title">{title}</h3>
        {dateStr && <p className="item-date">{dateStr}</p>}
      </div>
    </div>
  );
};

export default ShopListItem;
