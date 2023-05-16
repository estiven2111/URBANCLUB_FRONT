import React from 'react';
import axios from 'axios';
import { loginSuccess } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import {URLS} from "../../env"

const LoginButton = () => {

  const dispatch = useDispatch();
    //! Codigo para autorizar acceso
  const fetchAuthUser = async() => {
    console.log("entre a fetchaurh");
    // const response = await axios.get('https://pruebaback-production-0050.up.railway.app/artist/auth/user', {withCredentials:true}).catch((err) => {
    try {
      let response = await axios.get('/artist/auth/user', {withCredentials:true})
      // fetch('https://pruebaback-production-0050.up.railway.app/artist/auth/user',{withCredentials:true})
      // .then(res =>{
      //   console.log(res);
      // })
     
      if (response && response.data) {
        const token = response.data
        dispatch(loginSuccess({ token }))
        //console.log("ahi esta el bendito token amigo!!!!!----->>>> ", response.data)
      }
    } catch (error) {
      console.log(error);
    }
   
  
  }

  const handleLogin = async () => {
    let timer = null;
    const googleLoginURL = `${URLS}/artist/auth/google`
    // const googleLoginURL = "https://pruebaback-production-0050.up.railway.app/artist/auth/google"
    const newWindow = window.open(googleLoginURL,"_blank","width=350,height=450")

    if(newWindow) {
        timer = setInterval(() => {
            if(newWindow.closed) {
                console.log("We are authenticated");
                fetchAuthUser() //! activar con la funcion de arriba
                if(timer) clearInterval(timer)
            } 
        }, 500)
    }
  };

  return (
    <button onClick={handleLogin}>Iniciar sesión con Google</button>
  );
};

export default LoginButton;
