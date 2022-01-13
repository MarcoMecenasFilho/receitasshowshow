import styled from 'styled-components';

const StyledFooter = styled.div`
        @media (max-width: 600px) {
        display: flex;
        position: fixed;
        justify-content: space-around;
        align-items: center;
        background: #C4C4C4;
        width: 100%;
        height: 58px;
        bottom: 0;

        a {
        width: 40px;
        height: 40px;
        }
        }
`;

export default StyledFooter;
