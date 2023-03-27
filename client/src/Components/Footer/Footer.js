import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

function Footer() {
  return (
    <div className="footer">
      <div>
        <div className="footer_logo">
          <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt="" />
        </div>
        <div className="footer_socialMedias">  
          <Link to="https://www.facebook.com/EthiopiansNetwork">
            <FacebookIcon/>
          </Link>
        
          <Link to="https://www.instagram.com/evangaditech/">
            <InstagramIcon/>
          </Link>
      
          <Link to="https://www.youtube.com/c/weareethiopians">
            <YouTubeIcon/>            
          </Link>
        </div>
      </div>
      <div >
        <div className="footer_info">Useful Link</div>
        <div className="footer_infoText">
          <div  >How it works</div>
          <div  >Terms of Service</div>
          <div  >Privecy Policy</div>
        </div>
      </div>
      <div>
        <div className="footer_info">Contact Info</div>
        <div className="footer_infoText">
          <div  >Evangadi Network</div>
          <div  >support@evangadi.com</div>
          <div  >+!-202-386-2702</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;