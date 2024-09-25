/* eslint-disable react/prop-types */
// import axios from "axios";
import './Products.css'
import { useContext} from "react";
import  FoodItem from "../components/FoodItem";
import { storeContext } from "./redux/context/storeContext";
import { useSelector } from 'react-redux';
import ExploreMenu from '../components/ExploreMenu';

export const Products = ({category,setCategory}) => {
  const {food_list,tool_list} = useContext(storeContext)
  const { currentUser } = useSelector((state) => state.user);

  // const [loading, setLoading] = useState(true); // Add a loading state

  return (
    <div>
      <div>
      <ExploreMenu category={category} setCategory={setCategory}/>
      </div>
    <div className="food-display" id="food-dsiplay">
    <h2>Top dishes near you</h2>
    <div className="food-display-list">

    {currentUser==null && <p>login to see the products</p>}


    {currentUser && currentUser.role === 'Customer'
  && food_list.map((item, index) => {
      if (category === 'All' || category === item.category) {
        return (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        );
      }
      return null; // Ensure null is returned if condition is not met
    })}
    {currentUser && currentUser.role === 'Farmer'
    &&tool_list.map((item, index) => {
      if (category === 'All' || category === item.category) {
        return (
          <FoodItem // Assuming you mean ToolItem here for tools
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        );
      }
      return null; // Ensure null is returned if condition is not met
    })
}

      
        {/* {currentUser?currentUser.role=='Customer'?food_list.map((item,index)=>{
            if(category==='All'|| category===item.category){
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }}):tool_list.map((item,index)=>{
              if(category==='All'|| category===item.category){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              }}:<></>} */}
    </div>
</div>
    </div>
  );
};
