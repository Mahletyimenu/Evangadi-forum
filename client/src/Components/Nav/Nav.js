import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => { 
    return (
        <div className='navbar'>
            
            <div class="navbar_content">
                
                <Link href='/' class="navbar-brand" ><img src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png' alt="" /></Link>
            
                <div>
                    
                    <Link className='nav_link'>Home</Link>
                    <Link className='nav_link'>How it works</Link>
                    <Link to={props.link}>
                    <button className='nav_button'>{props.btn}</button>
                    </Link>

                </div>

            </div>
            
           

        </div>
    );
  
}

export default Nav;
