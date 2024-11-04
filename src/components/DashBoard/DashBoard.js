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
    <div className='flex flex-col h-screen gap-8 w-full p-4 md:p-8'>
      <div className='flex flex-col md:flex-row bg-gray-100 border-4 h-full border-white text-stone-700 p-4 md:p-6 rounded-2xl'>
        
        {/* Left Side - Graph and Totals */}
        <div className='w-full md:w-3/5 flex flex-col gap-4'>
          <div className='h-60 md:h-[60%]'><Graph expense={expend} incomeData={income}/></div>
          <div className='flex justify-around items-center'>
            <span className='border-2 border-blue-800 px-4 py-2 font-bold bg-teal-200 rounded-xl text-lg md:text-xl'>
              Income: {TotalIncome()}
            </span>
            <span className='border-2 border-blue-800 px-4 py-2 font-bold bg-teal-200 rounded-xl text-lg md:text-xl'>
              Expend: {TotalExpend()}
            </span>
          </div>
          <div className='flex justify-center items-center'>
            <div className='border-2 border-blue-800 px-4 py-2 w-3/4 md:w-1/2 font-bold bg-teal-200 rounded-xl text-xl md:text-2xl flex justify-center items-center'>
              Total: {Total()}
            </div>
          </div>
        </div>
        
        {/* Right Side - Recent Transactions and Min/Max Values */}
        <div className='flex flex-col gap-4 w-full md:w-2/5 mt-4 md:mt-0 font-bold text-sm md:text-lg'>
          <div className='font-extrabold text-xl'>Recently Transactions</div>
          <div>
            { !loadingIncome || loadingExpend ? (
              <div className='flex justify-center items-center h-32'>
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="color-ring-loading"
                  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
              </div>
            ) : (
              data.slice(0, 2).map((datas, index) => (
                <div key={index} className='flex flex-col bg-white m-2 p-2 rounded-lg'>
                  <div className='flex items-center'>
                    <GoDotFill
                      className={`mr-2 text-lg ${
                        income.some((incomeData) => incomeData._id === datas._id) ? 'text-green-500' : 'text-red-400'
                      }`}
                    />
                    {datas.types}
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='flex items-center gap-1'><FaDollarSign/>{datas.amount}</span>
                    <span className='flex items-center gap-1'><LuCalendarDays/>{datas.date.split('T')[0]}</span>
                    <span className='flex items-center gap-1'><BiMessageRoundedDetail/>{datas.description}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Income Min/Max */}
          <div className='w-full border-t-2 pt-4'>
            <div className='flex justify-between text-base'><span>Min</span><span>Max</span></div>
            <div className='w-full h-1 bg-green-600'></div>
            <div className='flex justify-between'>
              <span>{income.length > 0 ? Math.min(...income.map(item => item.amount)) : 0}</span>
              <span>{income.length > 0 ? Math.max(...income.map(item => item.amount)) : 0}</span>
            </div>
          </div>

          {/* Expenditure Min/Max */}
          <div className='w-full mt-2'>
            <div className='flex justify-between text-base'><span>Min</span><span>Max</span></div>
            <div className='w-full h-1 bg-red-600'></div>
            <div className='flex justify-between'>
              <span>{expend.length > 0 ? Math.min(...expend.map(item => item.amount)) : 0}</span>
              <span>{expend.length > 0 ? Math.max(...expend.map(item => item.amount)) : 0}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashBoard;
