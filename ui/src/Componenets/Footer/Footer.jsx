import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className='footer-content-left'>
                <img src={assets.logo} className='logo' alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum consequuntur reiciendis autem velit libero sapiente beatae ut voluptatibus omnis numquam porro cumque vel eos quibusdam, praesentium a obcaecati cum molestiae.</p>
                <div className="footer-social-icons">
                <img src={assets.facebook_icon}alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            
            
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 9586541476</li>
                    <li>Contact@agroshere.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 AgroSphere.com-All Right Reserved</p>
       
    </div>
  )
}

export default Footer
