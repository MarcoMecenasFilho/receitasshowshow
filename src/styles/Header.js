import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    background: #C4C4C4;
    align-items: center;
    justify-content: space-around;
    height: 50px;

    button {
        height: 30px;
        width: 30px;
        background: #C4C4C4;
        border: none;
        
        img {
            height: 30px;
            width: 30px;
        }
    }

    h1 {
        margin-top: 10px;
        font-size: 30px;
    }

    a {
        height: 30px;
        width: 30px;
    }

    .searchBar {
    display: flex;
    align-items: center;
    justify-content:space-around;
    flex-direction: column;
       form {
           display: flex;
           align-items: center;
           justify-content: center;
           flex-direction: column;
           margin-top: 360px;
           position: absolute;
           width: 100%;
           right: 0px;
           background-color: #fff;

            label {
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-top: 10px;
            }

            input[type=radio] {
                height: 15px;
                width: 15px;
            }

            button {
                margin-top: 10px;
                margin-bottom: 20px;
                height: 40px;
                width: 220px;
                background-color: #6CE34F;
                border-radius: 5px;
            }
       }
    }
   
`;

export default StyledHeader;
