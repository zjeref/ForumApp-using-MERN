import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserContext } from './User-state'



const SemiProtected = ({ Component }) => {
    const {dispatch} = useContext(UserContext);
    let headers
    const token = Cookies.get('authToken')
    useEffect(()=> {
        headers = { 'Authorization': `Bearer ${token}`}
        async function fetchData () {      
            await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, {headers})
            .then(res => {
                dispatch({type:'set_user', payload: res.data})
                dispatch({type:'login_status', payload:true})
            })
            .catch(err => {
                console.log(err);
            })    
        }
        fetchData();
        
    }, [token]);
    

    return (
        <Component />
    )
}

export default SemiProtected
