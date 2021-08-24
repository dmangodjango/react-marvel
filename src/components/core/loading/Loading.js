import React from 'react';

//css
import LoadingCSS from "./Loading.module.css";

const Loading = () => {
    return (
        <>
            <div className={LoadingCSS.wrapper}>
                <div className={LoadingCSS.shield}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Captain_America%27s_shield.svg/1200px-Captain_America%27s_shield.svg.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default Loading
