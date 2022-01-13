import styled from 'styled-components';

const StyledDiv = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 300px;

      .btn-flat {
        background-color: #6CE34F;
      }
      
      button {
        width: 100%;
        height: 50px;
      }
      

      @media (max-width: 600px) {
        margin-top: 50%;
        input {
          margin-top: 20px;
        }
         button {
           margin-top: 30px;
         }
      }
`;

export default StyledDiv;
