/* eslint-disable react/prop-types */
// import React from 'react'
import './ExploreMenu.css'
import { menu_list,menu_list2 } from './../../frontend_assets/assets'
import { useSelector } from 'react-redux';

const ExploreMenu = ({category,setCategory}) => {
  const { currentUser } = useSelector((state) => state.user);

  let list = menu_list
   if(currentUser){
    list = currentUser.role=="Customer"?menu_list:menu_list2
   }

  return (
    <div className='explore-menu' id='explore-menu'>
        {/* <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a dlecatable array of dishes.Our misson is to statisfy your cravings and elevate your dining experience,one delicious meal at a time</p> */}
        <div className="explore-menu-list">
            {list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>         
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu