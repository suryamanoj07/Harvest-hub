import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Sidebar } from "./Sidebar";
import "./List.css";

const List = () => {
  const url = "http://localhost:3000/api/product/list";
  const [list, setList] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [newStock, setNewStock] = useState({});

  const fetchList = async () => {
    const response = await axios.get(url);
    if (response.data.success) {
      setList(response.data.message);
      toast.success("Product list fetched successfully");
    } else {
      toast.error("Error fetching product list");
    }
  };

  const removeFood = async (id) => {
    const response = await axios.post(
      `http://localhost:3000/api/product/delete/${id}`
    );
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const updateStock = async (id) => {
    const response = await axios.put(
      `http://localhost:3000/api/product/update/${id}`,
      { stockQuantity: newStock[id] }
    );
    await fetchList();
    if (response.data.success) {
      toast.success("Stock updated successfully");
    } else {
      toast.error("Error updating stock");
    }
    setEditingStock(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex items-start">
      <Sidebar />
      <div className="mr-10">
        <div className="list add flex-col p-10">
          <p className="flex justify-center font-bold text-red-600 text-xl m-4">
            All Product List
          </p>
          <div className="list-table mx-16">
            <div className="list-table-format title">
              <b className="mx-16 text-2xl">Product</b>
              <b className="mx-16 text-2xl">Name</b>
              <b className="mx-4 text-2xl">Category</b>
              <b className="-mx-4 text-2xl">Price</b>
              <b className="-mx-4 text-2xl">Stock</b>
              <b className="-mx-12 text-2xl">Action</b>
            </div>
            {list.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="list-table-format transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-4 hover:border-blue-400 hover:bg-blue-200"
                >
                  <img
                    src={`http://localhost:3000/images/${item.image}`}
                    alt=""
                  />
                  <p className="mx-20">{item.name}</p>
                  <p className="mx-12">{item.category}</p>
                  <p>{item.price}</p>
                  {editingStock === item._id ? (
                    <input
                      type="number"
                      value={newStock[item._id] || item.stockQuantity}
                      onChange={(e) =>
                        setNewStock({ ...newStock, [item._id]: e.target.value })
                      }
                    />
                  ) : (
                    <p>{item.stockQuantity}</p>
                  )}
                  <div className="actions">
                    {editingStock === item._id ? (
                      <button
                        className="edit-button"
                        onClick={() => updateStock(item._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() => setEditingStock(item._id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="remove-button"
                      onClick={() => removeFood(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
