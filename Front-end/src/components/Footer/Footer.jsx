import React from 'react';
import githubLogo from '../../assets/icons/github.svg';

function Footer() {
    return (
        <footer>
            <div className="my-footer">
                <a
                    className="my-footer__link"
                    href="https://github.com/Roger-Takeshita/My-Full-Stack-Base"
                    target="blank"
                >
                    <span>Developed by</span>&nbsp;Roger Takeshita&nbsp; <img src={githubLogo} alt="logo" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
