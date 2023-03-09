import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../Context/UserContext.js';
import './SignUp.css';
import Nav from '../../Components/Nav/Nav';

const SignUp = () => {
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    
    //importing global state from context
    const [userData, setUserData] = useContext(UserContext);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //sending data to be registered in database
            await axios.post('http://localhost:4000/api/users', form);

            //once registered the login automatically so send the new user info to be logged in
            const loginRes = await axios.post('http://localhost:4000/api/users/login', {
                email: form.email,
                password: form.password
            });

            // set the global state with the new user info
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);

            //navigate to homepage once the user is signed up
            navigate("/");
        } catch (error) {
            console.log('problem ==>', error.response.data.msg);
        }
    }
    return (
        <div className="signup">
            <Nav btn='SIGN IN' link='/login'/>
            <div className="signup_container">
                <div className='signup_col signup_form' >
                    <div className="signup_title">
                        <div className='title'>Join the network</div>
                        <p>Already have an account? 
                            <Link to='/login'>Signin</Link>
                        </p>
                    </div>   
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='email'
                            //value={email}
                            placeholder='Email'
                            onChange={handleChange}
                            id='email'
                        />

                        <div className="full_name">
                            <input
                                type="text"
                                name="firstName"
                                placeholder='First Name'
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={handleChange}
                            />

                        </div>
                        
                        <input
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            onChange={handleChange}
                        />
        
                        
                        <input
                            type='password'
                            name='password'
                            //value={password}
                            placeholder='Password'
                            onChange={handleChange}
                            id='password'
                        />
                        <button className='button'>Agree and join</button>
                    </form>
                    
                    <p>I agree to the <Link>privacy policy</Link> and <Link>terms of serivice.</Link></p>
                    <Link to="/login">Already have an account?</Link>

                </div>
                <div className='signup_col'>
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
    );
};

export default SignUp;