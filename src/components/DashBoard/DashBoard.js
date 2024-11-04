import React from 'react';
import { useAppContext } from '../../UseContext/context';
import { FaDollarSign } from "react-icons/fa6";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { ColorRing } from 'react-loader-spinner';
import Graph from '../graph/graph';

function DashBoard() {
  const { TotalExpend, TotalIncome, Total, Transaction, GeIncome, GeExpend, loadingIncome, loadingExpend } = useAppContext();
  const data = Transaction();
  const income = GeIncome && GeIncome.data ? GeIncome.data : [];
  const expend = GeExpend && GeExpend.data ? GeExpend.data : [];

  return (
    <div className='flex flex-col h-screen gap-[5rem] w-[100%]'>
      <div className='m-[1rem] flex bg-gray-100 border-4 h-[100%] border-white text-stone-700 p-[1.5rem] rounded-[2rem] '>
        <div className='border-2 w-[60%] flex flex-col '>
          <div className='h-[60%]'><Graph expense={expend} incomeData={income}/></div>
          <div className='h-[20%] flex justify-center items-center justify-around'>
            <span className='border-2 border-blue-800 p-[0.5rem] font-bold bg-teal-200 rounded-[1rem] text-[1.5rem] pl-[1rem] pr-[1rem]'>Income : {TotalIncome()}</span>
            <span className='border-2 border-blue-800 p-[0.5rem] font-bold bg-teal-200 rounded-[1rem] text-[1.5rem] pl-[1rem] pr-[1rem]'>Expend : {TotalExpend()}</span>
          </div>
          <div className='h-[15%] flex justify-center items-center'>
            <div className='border-2 border-blue-800 p-[0.5rem] w-[50%] font-bold bg-teal-200 rounded-[1rem] text-[2rem] flex justify-center items-center'>Total : {Total()}</div>
          </div>
        </div>
        <div className='flex flex-col gap-[1rem] w-[50%] font-bold text-[1.2rem] pl-[1.5rem] align-baseline items-center'>
          <div className='flex justify-items-start w-[100%] font-extrabold text-[1.5rem]'>Recently Transaction</div>
          <div className='w-[100%]'>
          { ! loadingIncome || loadingExpend ? (
              <div className='flex justify-center items-center h-[12rem]'>
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
              ) : (
              // Render your combined data here
                <>
                {data.slice(0,2).map((datas, index) => (
                  <div key={index} className='w-[100%]'>
                      <div className='flex bg-white m-[0.6rem] justify-between pl-[2rem] pr-[2rem] items-center p-[0.5rem] font-semibold rounded-[1rem] '>
                          <div className='flex flex-col justify-around'>
                            <div className='flex items-center p-[0.2rem] font-bold text-[1.2rem]'>
                                <GoDotFill
                                  className={`flex ${
                                    income.some((incomeData) => incomeData._id === datas._id)
                                      ? 'text-green-500'
                                      : 'text-red-400'
                                  } text-[1.8rem] mr-[0.4rem]`}
                                />
                                {datas.types}
                            </div>
                            <div className='flex justify-between] p-[0.2rem] w-[100%] gap-[1rem] text-[1rem]'>
                              <span className='flex items-center'><FaDollarSign/>{datas.amount}</span>
                              <span className='flex items-center gap-2'><LuCalendarDays/>{datas.date.split('T')[0]}</span>
                              <span className='flex items-center gap-2'><BiMessageRoundedDetail/>{datas.description}</span>
                            </div>
                          </div>                          
                      </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className='flex flex-col w-[100%] border-t-2 border-gray-500 pt-[2rem] justify-center items-center p-[0.5rem]'>
            <div className='flex justify-between w-[80%]'><span>Min</span><span>Max</span></div>
            <div className='w-[75%] h-[0.25rem] bg-green-600'></div>
            <div className='flex justify-between w-[80%]'>
              <span>
                {(income.length > 0) ? Math.min(...income.map(item => item.amount)) : 0}
              </span>
              <span>
                {(income.length > 0) ? Math.max(...income.map(item => item.amount)) : 0}
              </span>
            </div>
          </div>
          <div className='flex flex-col mt-[0.5rem] w-[100%] justify-center items-center p-[0.5rem]'>
            <div className='flex justify-between w-[80%] text-[1.3rem]'><span>Min</span><span>Max</span></div>
            <div className='w-[75%] h-[0.25rem] bg-red-600'></div>
            <div className='flex justify-between w-[80%]'>
              <span>
                {(expend.length > 0) ? Math.min(...expend.map(item => item.amount)) : 0}
              </span>
              <span>
                {(expend.length > 0) ? Math.max(...expend.map(item => item.amount)) : 0}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashBoard;
