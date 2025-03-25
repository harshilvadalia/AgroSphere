import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
function ExploreMenu({category,setCategory}) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Explore Agricultural Categories</h2>
      <p className="explore-menu-description">
        Discover a wide range of agricultural products tailored to meet your
        needs. From premium seeds and fertilizers to advanced tools and fresh
        produce, our categories offer solutions to enhance productivity and
        sustainability in every step of your farming journey.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return(
                <div className="explore-menu-list-item" key={index}  onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}>
                    <img src={item.menu_image} alt="" className={category===item.menu_name?"active":""}></img>
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr></hr>

    </div>
  );
}

export default ExploreMenu;
