import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext.js';
import Nav from '../../Components/Nav/Nav.js';
import Footer from '../../Components/Footer/Footer.js';
import { Link } from 'react-router-dom';
import profile from '../../Images/profile.png'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Home.css'
import axios from 'axios';

const Home = ({ logout }) => {
    const [userData, setUserData] = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!userData.user) navigate("/login");
        const fetch = async () => {
        //gets all info from question table.
        const response = await axios.get("http://localhost:4000/api/questions");

        setUserData({
            ...userData,
            questions: response.data.questions,
        });
        };
        fetch();
    }, [userData.user, navigate]);
    console.log(userData);

    const handleClick = (item) => {
        setUserData({
        ...userData,
        singleQuestion: {
            post_id: item.post_id,
            question_id: item.question_id,
        },
        });
        console.log(userData);
        navigate("/answer");
    };
    return (
        <div className='home'>
            <Nav btn='LogOut' link='/login' onClick={logout}/>
            <div className='home_container'>
                <div className='home_welcome'>
                    <Link to='/question'>
                        <button className='ask_button'>Ask Question</button>
                    </Link>
                    <h3>WelCome: {userData.user?.display_name}</h3>
                </div>

                <h2>Questions</h2>

                {userData.questions &&userData.questions?.map((item) => (
                    <>
                        <hr/>
                        
                        <div className="question" onClick={() => handleClick(item)} >
                            <div className='profile'>
                                <img className='profile_img' src={profile} />
                                <div >
                                    {item.user_name}
                                </div>
                            </div>
                            <div className='question_title'>
                                {item.question}
                            </div>
                            <ArrowForwardIosIcon className='arrow' />
                        </div>
                    </>       
                ))} 
            </div>
            <Footer/>
        </div>
    )
}

export default Home