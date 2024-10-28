import { useEffect, useState } from "react";
import { useAppContext } from "../../UseContext/context";
import { FaPlus } from "react-icons/fa";


function Form({Add, formData, SetFormData}) {

    const handleChange = (e) => {
        SetFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        Add(formData)
        SetFormData({incomeName: '', amount: '', date: '', description: '', types: ''})
    }  

    return (
      <div className='flex flex-col  gap-[5rem] w-[100%] items-center'>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                    <input type="text" 
                        className="text-[1.2rem] h-[3rem] border-4 outline-none border-gray-300 pl-[0.5rem] mt-[1rem] rounded-[0.5rem] w-[20rem]"
                        placeholder="Income Title" required
                        name="incomeName" id="incomeName"
                        value={formData.incomeName} onChange={handleChange}
                    />
                    <input type="number" 
                        className="text-[1.2rem] h-[3rem] border-4 outline-none border-gray-300 pl-[0.5rem] mt-[1rem] rounded-[0.5rem] w-[20rem]"
                        placeholder="Amount" required
                        name="amount" id="amount"
                        value={formData.amount} onChange={handleChange}
                    />
                    <input type="date" 
                        className="text-[1.2rem] h-[3rem] border-4 outline-none border-gray-300 pl-[0.5rem] mt-[1rem] rounded-[0.5rem] w-[20rem]"
                        placeholder="Enter date" required
                        name="date" id="date"
                        value={formData.date} onChange={handleChange}
                    />
                    <select id="types" required name="types" value={formData.types} 
                        className="text-[1.2rem] h-[3rem] border-4 outline-none border-gray-300 pl-[0.5rem] mt-[1rem] rounded-[0.5rem] w-[20rem]"
                        onChange={handleChange}
                    >
                        <option value="">Select Option</option>
                        <option value="FreeLancer">FreeLancer</option>
                        <option value="Investment">Investment</option>
                        <option value="Education">Education</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Health">Health</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Travelling">Travelling</option>
                        <option value="Takeaways">Takeaways</option>
                        <option value="Other">Other</option>
                    </select>
                    
                    <textarea name="description" required id="description" 
                        className="text-[1.2rem]  border-4 outline-none border-gray-300 pl-[0.5rem] mt-[1rem] rounded-[0.5rem] w-[20rem]"
                        value={formData.description} 
                        placeholder="Add a reference" rows={3}
                        onChange={handleChange}
                    />

                    <button type="submit"
                        className="bg-green-500 pr-[2rem] pl-[1rem] flex items-center gap-2 text-[1.1rem] font-bold mt-[1rem] text-white border-4 border-gray-200 rounded-[1rem] p-[0.5rem]"
                    ><FaPlus/> Add </button>
                </form>
            </div>
      </div>
    );
  }
  
  export default Form;