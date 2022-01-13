import styled from 'styled-components';

const StyledDiv = styled.div`
        @media (max-width: 600px) {

            .filtersBtns {
                display: flex;
                margin-left: auto;
                margin-right: auto;
                margin-top: 10px;
                align-items: center;
                justify-content: center;
                width: 300px;
                flex-wrap: wrap;

                button {
                    height: 55px;
                    width: 120px;
                    margin: auto;
                    margin-top: 10px;
                    border: none;
                    background-color: #C4C4C4;
                    font-weight: 400;
                    border-radius: 5%;
                }
            }

            .cardContainer {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                margin-top: 30px;
                margin-bottom: 50px;
                
                
                div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 150px;
                height: 160px;
                margin-top: 10px;
                margin-bottom: 30px;
                margin-right: 15px;
                margin-left: 15px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 6px;

                    img {
                        height: 150px;
                        width: 150px;
                        border-radius: 6px 6px 0px 0px;
                    }

                    P {
                        margin-top: 1px;
                        max-height: 30px;
                        color: black;
                        text-align: center;
                        font-size: 18px;
                        overflow: hidden

                    }
                }
            }
        }
`;

export default StyledDiv;
