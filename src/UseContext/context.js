import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useAsyncError } from "react-router-dom";


// let url = process.env.REACT_APP_BACKEND_URL;
let url = "http://localhost:5000/api/v1/";



export const AppContext = createContext();

export const AppContext_provider  = ({children})  => {
 
    const [ incomes, setIncome ] = useState([]);
    const [ GeIncome, setGetIncome ] = useState();
    const [ expend, setExpend ] = useState([]);
    const [ GeExpend, setGetExpend ] = useState();
    const [loadingIncome, setLoadingIncome] = useState(false);
    const [loadingExpend, setLoadingExpend] = useState(false);

    const [user, setUser] = useState({});
    const [id,setId] = useState();
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const[isLoggedIn,setLoggedIn] = useState(token ? true : false);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            // Check if token is expired
            if (decodedToken.exp * 1000 < Date.now()) {
                logout(); // Log out if the token is expired
            } else {
                const dt = decodedToken.data;
                setUser(decodedToken.data); // Set user if not expired
                setId(dt._id);
                // console.log(id)
            }
        }
    }, [token]);

    useEffect(() => {
        if (id) {
            // console.log("Updated id:", id); // This logs the updated id value after state change
            GetIncome();
            GetExpend();   
        }
    }, [id]);
    

    // Function to handle signup
    const signup = async (userData) => {
        try {
            const response = await axios.post(`${url}signup`, userData,);
            // console.log("Signup successful:", response.data.message);
            return response.data; // Return response to handle on frontend
        } catch (error) {
            // console.log("error here")
            console.error("Signup Error:", error.response?.data.message || error.message);
        }
    };

    // Function to handle login
    const login = async (credentials) => {
        try {
            const response = await axios.post(`${url}login`, credentials);
            const { token, data } = response.data;
            setLoggedIn(true);
            // Store token in localStorage and update state
            localStorage.setItem("token", token);
            setToken(token);
            setUser(data);
            setId(data._id);
            GetIncome();
            GetExpend();
            return response.data; // Return response to handle on frontend
        } catch (error) {
            // console.log("login failed")
            console.error("Login Error:", error.response?.data.message || error.message);
        }
    };

    // Function to logout
    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setToken(null);
        setUser(null);
        setIncome(null);
        setExpend(null);
        setGetExpend(null);
        setGetIncome(null);
    };
    
    const GetIncome = async () => {
        try {
            setLoadingIncome(false);
            const uid = user? user._id : id;
            const response = await axios.get(`${url}Get/Incomes?userId=${uid}`);
            // console.log("income data",response.data);
            setGetIncome(response.data); // Correctly set the data
        } catch (error) {
            console.error("Error fetching incomes:", error.message);
        } 
        finally {
            setLoadingIncome(true); // Correct loading state for incomes
        }
    };
    // console.log("income ->  ",GeIncome );

    const AddIncome = async(income) => {
        try{
            income.user = user._id;
            // console.log("income -> ", income);
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
            const uid = user? user._id : id;
            const response = await axios.get(`${url}Get/Expend?userId=${uid}`);
            setGetExpend(response.data);
            // console.log("expend data -> ",response.data);
        }catch(error){
            console.error(error.message);
            console.log(error.message);
        }finally{
            setLoadingExpend(false);
        }
    }

    const AddExpend = async(expend) => {
        try{
            expend.user = user._id;
            // console.log("expend -> ", expend,);
            
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
                                          loadingExpend, loadingIncome, Transaction, Total, signup, login, 
                                          logout, user, token, isLoggedIn, setLoggedIn} }
    >
                {children}
            </AppContext.Provider>;
}

export const useAppContext = () => {
    return useContext(AppContext);
}