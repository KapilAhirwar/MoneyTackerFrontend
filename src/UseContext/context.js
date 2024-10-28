import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

let url = process.env.REACT_APP_BACKEND_URL;

export const AppContext = createContext();

export const AppContext_provider  = ({children})  => {
 
    const [ incomes, setIncome ] = useState([]);
    const [ GeIncome, setGetIncome ] = useState();
    const [ expend, setExpend ] = useState([]);
    const [ GeExpend, setGetExpend ] = useState();
    const [loadingIncome, setLoadingIncome] = useState(false);
    const [loadingExpend, setLoadingExpend] = useState(false);
    
    const GetIncome = async() => {
        try{
            setLoadingIncome(true);
            const response = await axios.get(`${url}Get/Incomes`);
            setGetIncome(response.data);
        }catch(error){
            console.error(error.message);
            console.log(error.message);
        }finally{
            setLoadingExpend(false);
        }
    }

    const AddIncome = async(income) => {
        try{
            const response = await axios.post(`${url}AddIncome`,income);
            setIncome(response.message);
            GetIncome()
        }catch(error){
            console.log(error.message);
            console.error(error.message);
        }
    }
    
    const DeleteData = async(id) => {
        try{
            const remove = await axios.delete(`${url}DeleteIncome/${id}`)
            GetIncome()
        }catch(error){
            console.log(error.message);
        }
    }
    
    const TotalIncome = () => {
        const incomeData = GeIncome && GeIncome.data ? GeIncome.data : [];
        let sum = 0
        incomeData.forEach(data => {
            sum = sum + data.amount;
        });
        return sum;
    }
    
    const GetExpend = async() => {
        try{
            setLoadingExpend(true);
            const response = await axios.get(`${url}Get/Expend`);
            setGetExpend(response.data);
        }catch(error){
            console.error(error.message);
            console.log(error.message);
        }finally{
            setLoadingExpend(false);
        }
    }

    const AddExpend = async(expend) => {
        try{
            const response = await axios.post(`${url}Add/Expend`,expend);
            setExpend(response.message);
            GetExpend()
        }catch(error){
            console.log(error.message);
            console.error(error.message);
        }
    }

    const DeleteExpend = async(id) => {
        try{
            const remove = await axios.delete(`${url}Delete/Expend/${id}`)
            GetExpend()
        }catch(error){
            console.log(error.message);
        }
    }

    const TotalExpend = () => {
        const incomeData = GeExpend && GeExpend.data ? GeExpend.data : [];
        let sum = 0
        incomeData.forEach(data => {
            sum = sum + data.amount;
        });
        return sum;
    }

    const Transaction = () => {
        useEffect( ()=>{
            GetIncome()
            GetExpend()
        },[])
        const incomeData = GeIncome && GeIncome.data ? GeIncome.data : [];
        const expendData = GeExpend && GeExpend.data ? GeExpend.data : [];

        const total = [ ...incomeData, ...expendData ];
        // console.log('data = : ',total.reverse())
        return total.reverse()
    }

    const Total = () => {
        const trans = Transaction()
        let su = 0
        trans.forEach(data => {
            su = su + data.amount;
        });
        return su;
    }
    
    
    return <AppContext.Provider value={ { AddIncome , incomes, GetIncome, GeIncome, DeleteData, TotalIncome, 
                                          GetExpend, AddExpend, DeleteExpend, TotalExpend, expend, GeExpend,
                                          loadingExpend, loadingIncome, Transaction, Total} }
    >
                {children}
            </AppContext.Provider>;
}

export const useAppContext = () => {
    return useContext(AppContext);
}