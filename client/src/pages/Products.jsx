/* eslint-disable react/prop-types */
// import axios from "axios";
import './Products.css'
import { useContext} from "react";
import  FoodItem from "../components/FoodItem";
import { storeContext } from "./redux/context/storeContext";

export const Products = ({category}) => {
  const {food_list} = useContext(storeContext)
  // const [loading, setLoading] = useState(true); // Add a loading state

  return (
    <div className="food-display" id="food-dsiplay">
    <h2>Top dishes near you</h2>
    <div className="food-display-list">
        {food_list.map((item,index)=>{
            if(category==='All'|| category===item.category){
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }})}
    </div>
</div>
  );
};