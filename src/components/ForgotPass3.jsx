import React,{useState} from 'react';
import { Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./login.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ForgotPass2 = () => {

    const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    const {otp} = useParams();
    const {email} = useParams();

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const hideMessage = ()=>{
        setMessage('');
      }

    const handleResetPassword = async (e) => {

        setLoading(true);
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formToJson = (formData) => {
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            return jsonData;
        }

        const passwordData = formToJson(formData);

        try {
            const response = await axios.post(`${baseURL}/api/auth/changepassword/${otp}/${email}`, passwordData);
            if (response.status == 200) {
                setMessage("");
                window.location.href = "/registersuccess";
            }
        }
        catch (error) {
            console.error(error);
            if(error.response.status===408){
                setMessage("Otp expired");
              }
              if(error.response.status===400){
                setMessage("Passwords do not match");
              }
              if(error.response.status===500){
                setMessage("Invalid request");
              }
        }
        finally {
            setLoading(false);
          }

    }
    return (
        <>
            <div className='divregister'>
                <img src={logosb} />
                <h3 className='registertitle'>Reset Your Password</h3>
                <form className='registerForm' onSubmit={handleResetPassword}>
                    <p>Enter new password for your account</p>
                    <br /><br />
                    <label htmlFor="password">Password: </label>
                    <input className='registerinput-style' type='password' id='password' name='password' onFocus={hideMessage} required />

                    <label htmlFor="repeatPassword">Confirm Password: </label>
                    <input className='registerinput-style' type='password' id='repeatPassword' name='repeatPassword' onFocus={hideMessage} required />
                    <button className='loginbtn' type='submit' disabled={loading}>{loading ? '...' : 'change password'}</button>
                    <div className='regErrorMsg'>{message}</div>
                </form>
                <div className='logintext' onClick={(e) => { window.location.href = '/login';}}>Cancel</div>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPass2