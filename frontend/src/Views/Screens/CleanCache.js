import { file } from 'jszip';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const CleanCache = () => {
    const [cacheData, setCacheData] = useState(0)
    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        setCacheData(1);
    };

    useEffect(() => {
        clearCacheData();
    }, [])

    return (
        <Wrapper>
            <div className="content-wrapper">
                <div className="container-full">
                    <section className="content">
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <div className="main_layout"></div>
                        </div>
                    </section>
                </div>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
.main_layout{
    width: 500px;
    height: 300px;
    background: #0052cc;
    color: #ffffff !important;
    align-self: center;
    margin-top: 50px;
}
`;

export default CleanCache