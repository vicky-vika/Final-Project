import React from "react";
import "./About.css"; // Importiere das CSS für die About-Sektion

const About = () => {
    return (
        <div className="about-container">
            <div className="about-text">
                <p>
                    Hi there! <br />
                    I'm Zoey M. Romeo, an adventurer at heart with an unquenchable thirst for exploring the wonders of our world. From the serene Alpine meadows of Austria to the rugged highlands of Scotland, I've always sought solace in the embrace of nature. Whether it's the majestic Rockies of Canada, the ethereal glaciers of Iceland, or the enchanting forests of Poland, every journey leaves me awestruck and longing for more. <br />
                    While bustling cities have their charm, my true love lies in the solitude of nature. The quiet rustle of leaves, the whisper of a mountain breeze, and the symphony of birdsong are the melodies that fuel my soul.<br />
                    Through this blog, I hope to share my adventures, inspire your own, and remind everyone of the profound beauty waiting just beyond the city lights. <br />
                    So, lace up your boots, grab your backpack, and join me as we explore this beautiful planet together! <br />
                    Let the journey begin.
                </p>
            </div>
            <div className="about-image">
                <img src="/about.jpg" alt="Zoey M. Romeo" />
            </div>
        </div>
    );
};

export default About;