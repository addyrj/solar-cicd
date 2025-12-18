import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import $ from 'jquery'
// let $sidebar = $('body')
const Location = ({ id, title }) => {

    const navigate = useNavigate();
    return (
        <Wrapper>
            <div className="col">
                <div className="card h-p100" style={{ position: 'relative' }} onClick={() => navigate('/show_graph')}>
                    <div className="locationLayout">
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '40px', color: 'white' }} />
                    </div>
                    <h4 className="fw-500">{title}</h4>
                    {/* <p className='loctionTitle'>{title}</p> */}
                </div>
            </div>
        </Wrapper >
    )
}

const Wrapper = styled.section`
.card{
    height: 150px !important;
    margin: 30px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 10px;
    &:hover,
    &:active{
      background-color  : transparent;
      border: 1px solid white;
    }
}
.locationLayout{
width: 70px;
height: 70px;
position: absolute;
background-color: #0052cc;
left: 30%;
top: -30%;
display: flex;
align-items: center;
justify-content: center;

}
.loctionTitle{
    text-align: center;
    font-size: 20px;
    color: white;
    font-weight: bold;
    font-family: "Arvo", serif;
}
`;

export default Location