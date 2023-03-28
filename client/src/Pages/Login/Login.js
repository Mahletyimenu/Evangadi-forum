import axios from 'axios';
import './Login.css';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer.js';

const Login = () => {
    const [userData, setUserData] = useContext(UserContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            //sending user data to database to be logged in
            const loginRes = await axios.post('http://localhost:4000/api/users/login',
                {
                    email: form.email,
                    password: form.password
                });
            
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);

            navigate('/');
        } catch (err) {
            console.log('problem', err.response.data.msg);
            alert(err.response.data.msg);
        }
    }

    useEffect(() => {
        if (userData.user) navigate('/');
    }, [userData.user, navigate]);

    return (
        <>
            <div className='login'>
                <Nav btn='SIGN IN' link='/signup'/>
                <div className='login_container'>
                    
                    <div className='login_col login_form' >
                        <div className="login_title">
                            <div className='title'>Login to your account</div>
                            <p>Don’t have an account? 
                                <Link to='/signup'>Create a new account</Link>
                            </p>
                        </div>            
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='email'
                                //value={email}
                                placeholder='Your Email'
                                onChange={handleChange}
                                id='email'
                            />
                            <br />
                            
                            <input
                                type='password'
                                name='password'
                                //value={password}
                                placeholder='Your Password'
                                onChange={handleChange}
                                id='password'
                            />
                            <br />
                            <button className='button'>submit</button>
                        </form>
                        <Link to="/signup">Create a new account?</Link>
                    </div>
                    <div className='login_col'>
                        <p className='about'>About</p>
                        <h2 className='Q_A'>Evangadi Networks Q&A</h2>
                        <div className='evangadi_desc'>
                            <p>
                                No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
                            </p>
                            <p>
                                Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
                            </p>
                        </div>
                        <button className='button'>HOW IT WORKS</button>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
        
    )
}

export default Login