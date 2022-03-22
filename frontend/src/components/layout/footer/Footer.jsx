import React from 'react'
import playStore from "../../../images/playstore.png"
import "./footer.css"
import ios from "../../../images/Appstore.png"
const Footer = () => {
      return (
            <footer id="footer">
                  <div className="leftFooter">
                        <h4>DOWNLOAD OUR APP</h4>
                        <p>Download App for Android and IOS mobile</p>
                        <img src={playStore} alt="playstore" />
                        <img src={ios} alt="Appstore" />
                  </div>
                  <div className="midFooter">
                        <h1>Mern App</h1>
                        <p>High Quality is Our First Priority</p>
                        <p>Copyrights 2021 &copy;Mern Developer</p>
                  </div>
                  <div className="rightFooter">
                        <h4>Follow Us</h4>
                        <a href="https://www.instagram.com/iammanishvyas/">Instagram</a>
                        <a href="https://www.instagram.com/iammanishvyas/">Facebook</a>
                        <a href="https://www.instagram.com/iammanishvyas/">linkedIn</a>
                  </div>

            </footer>
      )
}

export default Footer
