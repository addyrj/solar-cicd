import React from "react";
import Lottie from "lottie-react";
import styled from "styled-components";
import noDataJson from "../../Assets/Animation/no_data.json"

const NoData = () => {
    return (
        <Wrapper>
            <div className="noDataStyle">
                <Lottie
                    className="lottieStyle"
                    animationData={noDataJson}
                    loop={true}
                />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
.noDataStyle{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 10px 0;
}
.lottieStyle{
    width: 300px;
    height: 300px;
}`;

export default NoData;
