import React, {useState} from 'react'
import marvelLogo from "../../../assets/marvel-logo.jpg";
import FooterCSS from "./Footer.module.css";

const Footer = () => {
    const footerData = {
        copyright: "© 2021 MARVEL",
        text: "Data provided by Marvel. © 2021 MARVEL",
        url: "http://marvel.com"
    }

    const [footer, setFooter] = useState(footerData);
    return (
        <>
            <footer className={FooterCSS.footerContainer}>
                <div className={FooterCSS.imgContainer}>
                    <img src={marvelLogo} alt="marvel logo"/>
                </div>
                <div className={FooterCSS.textContainer}>
                    <h3>{footerData.copyright}</h3>
                    <a href={footer.url} target="_blank" className="no-link-style">{footer.text}</a>
                </div>
            </footer>
        </>
    )
}

export default Footer
