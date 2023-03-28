import React, { useContext, useEffect, useState } from 'react';
import Nav from "../../Components/Nav/Nav";
import Footer from '../../Components/Footer/Footer';
import './Answer.css';
import profile from '../../Images/profile.png';
import axios from "axios";
import { Link ,useNavigate} from 'react-router-dom';
import { UserContext } from "../../Context/UserContext.js";

const Answer = ({logout}) => {
    const [userData, setUserData] = useContext(UserContext);
    const [post, setPost] = useState({});
    const [form, setForm] = useState({});
    const [answer, setAnswer] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(userData.singleQuestion);
    useEffect(() => {
        if (!userData.user) {
        navigate("/login")
        }
        const fetch = async () => {
        const response = await axios.post(
            'http://localhost:4000/api/questions/id',
            {
            post_id: userData.singleQuestion.post_id,
            }
        );
        setPost(response.data.data);
        };
        fetch();
    }, [userData.user]);

    useEffect(() => {
        const get = async () => {
        const res = await axios.post('http://localhost:4000/api/answers/all', {
            question_id: userData.singleQuestion.question_id,
        });
        setAnswer(res.data.data);
        };
        get();
    }, [answer.length]);

    const handleChange = (e) => {
        setForm({ ...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/answers', {
        answer: form.answer,
        user_id: userData.user.id,
        question_id: post.question_id,
        });
        if(answer.length == 0) {
        setAnswer(['']);
        console.log(answer)
        }
        else {
        setAnswer([]);
        }
        setForm({ answer: "" });
    };

    console.log(answer);
    console.log(post);

    return (
        <div>
            <Nav btn='LogOut' link='/login'onClick={logout}/>
            <div className='answer_container'>
                <h2>Question</h2>
                <h4>{post?.question}</h4>
                <p>{post?.question_description}</p>
                <hr/>
                <h1>Answer From The Community</h1>
                
                <div className="answer_form_container">
                    <div className="answer_form_title">
                        <h2>Answer The Top Question</h2>
                        <Link to="/">go to question page</Link>
                    </div>
                    {answer && answer?.map((item) => (
                        <>
                            <hr/>
                            
                            <div className="answer">
                                <div className='profile'>
                                    <img className='profile_img' src={profile} />
                                    <div >
                                        {item.user_name}
                                    </div>
                                </div>
                                <div className='answer_title'>
                                    {item.answer}
                                </div>  
                            </div>
                        </>  
                    ))}
                    <form onSubmit={handleSubmit}> 
                        <textarea
                            name='answer'
                            cols="106"
                            rows="10"
                            value={form.answer}
                            placeholder="Your Answer ..."
                            onChange={handleChange}
                        ></textarea>
                        <br/>
                        <button className="answer_button" >
                            Post Your Answer
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>          
        </div>
    );
}

export default Answer;
