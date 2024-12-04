import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

// Import components
import { LoginPopup } from "../components/LoginPopup";
import FoodItem from "../components/FoodItem";
import Feedback from "../components/Feedback"; // Ensure this import is correct
import background from "./../../assets/website-home.jpg";

// Import icons from lucide-react
import { 
  ShoppingCart, 
  Truck, 
  Leaf, 
  ArrowRight, 
  ArrowLeft 
} from "lucide-react";

// Parallax Component for Background
const ParallaxBackground = ({ children }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="parallax-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPositionY: offset * 0.5 + 'px'
      }}
    >
      {children}
    </div>
  );
};

// Scroll Container with Enhanced Navigation
const EnhancedScrollContainer = ({ items, title, role, viewAllLink }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <motion.div 
      className="enhanced-scroll-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header">
        <h2>{title}</h2>
        <Link to={viewAllLink} className="view-all-btn">
          View All <ArrowRight className="inline-block ml-2" />
        </Link>
      </div>

      <div className="scroll-navigation">
        <motion.button 
          className="nav-button left" 
          onClick={() => scroll('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft />
        </motion.button>

        <div 
          ref={scrollRef} 
          className="enhanced-scroll-container"
        >
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div 
                key={item._id} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5 
                }}
                className="scroll-item"
              >
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  stock={item.stockQuantity}
                  role={role}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button 
          className="nav-button right" 
          onClick={() => scroll('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
};

export const Home = ({ category, setCategory }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [fastSellingItems, setFastSellingItems] = useState([]);
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const [fastSellingTools, setFastSellingTools] = useState([]);
  const [newlyAddedTools, setNewlyAddedTools] = useState([]);

  // Navigation effect
  useEffect(() => {
    if (currentUser && currentUser.role === "Admin") {
      navigate("/orders");
    } else if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Fetch data effect
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "Customer") {
        fetchFastSellingItems();
        fetchNewlyAddedProducts();
      } else if (currentUser.role === "Farmer") {
        fetchFastSellingTools();
        fetchNewlyAddedTools();
      }
    }
  }, [currentUser]);

  // Fetch functions
  const fetchFastSellingItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/topselling"
      );
      setFastSellingItems(response.data.message);
    } catch (error) {
      console.error("Error fetching fast-selling items:", error);
    }
  };

  const fetchNewlyAddedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/recentadded"
      );
      setNewlyAddedProducts(response.data.message);
    } catch (error) {
      console.error("Error fetching newly added products:", error);
    }
  };

  const fetchFastSellingTools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tool/topselling"
      );
      setFastSellingTools(response.data.message);
    } catch (error) {
      console.error("Error fetching fast-selling tools:", error);
    }
  };

  const fetchNewlyAddedTools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/tool/recentadded"
      );
      setNewlyAddedTools(response.data.message);
    } catch (error) {
      console.error("Error fetching newly added tools:", error);
    }
  };

  return (
    <ParallaxBackground>
      <motion.div 
        className="home-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="hero-section"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Bridging Local Farms 
            <span className="highlight">Directly to Your Doorstep</span>
          </h1>
          <p>No Middlemen, Pure Freshness</p>

          {!currentUser && <LoginPopup />}
        </motion.div>

        {/* Conditional Rendering for Customer and Farmer */}
        {currentUser && (
          <div className="product-sections">
            {currentUser.role === "Customer" && (
              <>
                <EnhancedScrollContainer 
                  items={fastSellingItems}
                  title="Fast Selling Products"
                  role="Customer"
                  viewAllLink="/Market"
                />
                <EnhancedScrollContainer 
                  items={newlyAddedProducts}
                  title="Recently Added Products"
                  role="Customer"
                  viewAllLink="/Market"
                />
                <Feedback />
              </>
            )}

            {currentUser.role === "Farmer" && (
              <>
                <EnhancedScrollContainer 
                  items={fastSellingTools}
                  title="Fast Selling Tools"
                  role="Farmer"
                  viewAllLink="/Market"
                />
                <EnhancedScrollContainer 
                  items={newlyAddedTools}
                  title="Recently Added Tools"
                  role="Farmer"
                  viewAllLink="/Market"
                />
                <Feedback />
              </>
            )}
          </div>
        )}
      </motion.div>
    </ParallaxBackground>
  );
};