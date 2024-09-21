import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Sidebar } from './Sidebar'
import "./List.css"

const List = () => {
  const url = "http://localhost:3000/api/product/list"
  const [list,setList]=useState([])

  const fetchList = async()=>{
    const response=await axios.get(url)
    if (response.data.success){
      setList(response.data.message)
    }
    else{toast.error("Error")}
  }

  const removeFood=async(id)=>{
    console.log(id)
    const respone = await axios.post(`http://localhost:3000/api/product/delete/${id}`)
    console.log(respone);
    await fetchList()
    if(respone.data.success){
      toast.success(respone.data.message)
    }
    else{
      toast.error(respone.data.message)
    }
  }

  useEffect(()=>{fetchList()},[])
  return (
    <div className="flex items-start gap-12">
      <Sidebar />
    <div className='list add flex-col'>
      <p className='flex justify-center font-bold text-red-600 text-xl m-4'>All Foods List</p>
      <div className='list-table mx-16'>
        <div className="list-table-format title">
          <b className='mx-16 text-2xl'>Product</b>
          <b className='mx-16 text-2xl'>Name</b>
          <b className='mx-4 text-2xl'>Category</b>
          <b className='-mx-4 text-2xl'>Price</b>
          <b className='-mx-12 text-2xl'>Action</b>
        </div>
        {list.map((item,idx)=>{
          return(
            <div key={idx} className='list-table-format'>
              <img src={`http://localhost:3000/images/${item.image}`} alt="" style={{height:"120px",width:"180px",marginLeft:"20px"}} />
              <p className='mx-20'>{item.name}</p>
              <p className='mx-12'>{item.category}</p>
              <p>{item.price}</p>
              <p className="-mx-12 cursor-pointer bg-red-500 p-1 rounded-lg border-2 border-black w-24 text-center" onClick={()=>removeFood(item._id)}>remove</p>
            </div>
          )
        })}
      </div>
    </div>
    </div>
    
  )
}

export default List