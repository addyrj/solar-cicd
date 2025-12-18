import React from 'react'
import Lottie from "lottie-react";
import loader from "../../Assets/Animation/loader.json"
import styled from 'styled-components';

const Loader = () => {
    return (
        <Wrapper>
            <div className='loading_layout'>
                <div className='childView'>
                    <Lottie className='lottieStyle' animationData={loader} loop={true} />
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.childView{
    width: 250px;
    height : 250px;
    margin-top: 200px;
    position: relative;
    z-index: 999;
    
}
.loading_layout{
   width : 100%;
   height: 100%;
   position: absolute;
   z-index: 9999;
   background-color: black;
   opacity: 0.8;
   display: flex;
   justify-content: center;
}
`;

export default Loader