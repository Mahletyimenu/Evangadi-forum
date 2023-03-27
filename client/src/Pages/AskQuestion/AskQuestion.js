import React, {useContext,useState } from 'react';
import Nav from "../../Components/Nav/Nav";
import Footer from '../../Components/Footer/Footer';
import axios from "axios";
import "./AskQuestion.css";
import {Link,useNavigate} from 'react-router-dom';
import {UserContext}from "../../Context/UserContext.js"

function AskQuestion({ logout }) {
    const [userData,setUserData]= useContext(UserContext);
    const [form, setForm]=useState({});
    const postId = Math.floor(Math.random()*100000);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setForm({ ...form,[e.target.name]:e.target.value});
    };

    const askQuestion =async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post("http://localhost:4000/api/questions",{
            user_id: userData.user.id,
            question: form.question,
            question_description: form.description,
            post_id:`questionPost${postId}`,
        });
        console.log("asked");
        navigate("/");
        }catch (error) {
            console.log('problem ==>', error.response.data.msg);
        }
    };
    return (
        <div >
            <Nav btn='LogOut' link='/login'onClick={logout}/>
            <div className="ask_question_contaner">
                <div className="instruction">
                    <div className="instruvtion_title">
                        <h2>Steps To write a good Question</h2>
                    </div>

                    <div className="instruction_desc">
                        <ul>
                            <li>Summarize your problem in a one-line title.</li>
                            <li>Describe your problem in more detail.</li>
                            <li>Describe what you tried and what you expected to happen.</li>
                            <li> Review your question and post it to the site.</li>
                        </ul>
                    </div>
                </div>
                <div className="ask_form_container">
                    <div className="ask_form_title">
                        <h2>Ask a public question</h2>
                        <Link to="/">go to question page</Link>
                    </div>
                    <form onSubmit={askQuestion}>
                        <input
                            name='question'
                            type="text"
                            placeholder="Title"
                            onChange={handleChange}
                        />
                        <textarea
                            name='description'
                            cols="106"
                            rows="10"
                            placeholder="Question Description..."
                            onChange={handleChange}
                        ></textarea>
                        <button type='submit' className="button" >
                            Post Your Question
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default AskQuestion;
