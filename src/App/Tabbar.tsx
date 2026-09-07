import React from "react";
import { Link } from "react-router-dom";
import './Tabbar.scss'

// FaCamera を削除しました
import { FaList, FaHome,} from "react-icons/fa"
import { AiOutlineAppstore } from "react-icons/ai"

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><Link to="/"><div className="icon"><FaMap /></div><div className="text">Map</div></Link></li>
        <li><Link to="/list"><div className="icon"><FaList /></div><div className="text">List</div></Link></li>
        {/* カテゴリの行を削除しました */}
        {/* 写真から探すの行を削除しました */}
        <li><Link to="/about"><div className="icon"><AiOutlineAppstore /></div><div className="text">About</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
