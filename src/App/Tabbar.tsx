import React from "react";
import { Link } from "react-router-dom";
import './Tabbar.scss'

// 確実に存在する FaMap に変更
import { FaList, FaMap } from "react-icons/fa"
import { AiOutlineAppstore } from "react-icons/ai"

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><Link to="/"><div className="icon"><FaMap /></div><div className="text">Map</div></Link></li>
        <li><Link to="/list"><div className="icon"><FaList /></div><div className="text">List</div></Link></li>
        <li><Link to="/about"><div className="icon"><AiOutlineAppstore /></div><div className="text">About</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
