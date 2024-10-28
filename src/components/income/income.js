import React, { useEffect, useState } from 'react';
import Form from '../form/form';
import { FaDollarSign } from "react-icons/fa6";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useAppContext } from '../../UseContext/context';
import { ColorRing } from 'react-loader-spinner'

function Income() {
  const { GetIncome, GeIncome, DeleteData, TotalIncome, AddIncome, loadingIncome } = useAppContext();
  const [ formData, SetFormData ] = useState({
        incomeName: '',
        amount: '',
        date: '',
        description: '',
        types: ''
  })

  useEffect( () => {
    GetIncome();
  }, [])

  function handleDelete(id){
    DeleteData(id);
  }

  const incomeData = GeIncome && GeIncome.data ? GeIncome.data : [];
  return (
    <div className='flex flex-col h-screen gap-[5rem] w-[100%]'>
        <div className='m-[1rem] flex flex-col bg-slate-100 border-4 h-[100%] border-white text-stone-700 p-[1rem] rounded-[2rem] '>
          <div className='flex text-[1.5rem] font-bold ml-[1rem] text-gray-600'>INCOME</div>
          <div className='flex text-[1.8rem] justify-center items-center border-4 ml-[1rem] mr-[1rem] border-green-300 rounded-[1rem] p-[0.5rem] mt-[0.5rem] font-bold text-gray-600'>Total Income : {TotalIncome()}</div>
          <div className='flex w-[100%] text-stone-700 pt-[1rem] rounded-[2rem] '>
            <div className='w-[40%]'>
              <Form Add={AddIncome} formData={formData} SetFormData={SetFormData} />
            </div>          
            <div className='w-[60%] flex flex-col items-center justify-start h-[30rem] overflow-y-scroll'>
                {
                  loadingIncome? 
                  incomeData.map( (data,index) => (
                    <div key={index} className='w-[80%] max-w-[80%]'>
                        <div className='flex bg-white m-[0.6rem] justify-between pl-[2rem] pr-[2rem] items-center p-[0.5rem] font-semibold rounded-[1rem] '>
                          <div className='flex flex-col justify-around'>
                            <div className='flex items-center p-[0.2rem] font-bold text-[1.2rem]'><GoDotFill className='flex text-green-500 text-[1.6rem] mr-[0.4rem]' />{data.types}</div>
                            <div className='flex justify-between] p-[0.2rem] w-[100%] gap-[1rem] text-[1rem]'>
                              <span className='flex items-center'><FaDollarSign/>{data.amount}</span>
                              <span className='flex items-center gap-2'><LuCalendarDays/>{data.date.split('T')[0]}</span>
                              <span className='flex items-center gap-2'><BiMessageRoundedDetail/>{data.description}</span>
                            </div>
                          </div>
                          <button onClick={() => handleDelete(data._id)}
                            className='text-[1.5rem] bg-red-400 hover:bg-red-500 rounded-[50%] w-[40px] h-[40px] flex justify-center items-center'
                          ><MdDelete/></button>

                        </div>
                    </div>
                  )):(<div className='flex h-full justify-center items-center'>
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                      />
                    </div>
                  )
                }
            </div>
          </div>
        </div>
    </div>
  );
}

export default Income;
