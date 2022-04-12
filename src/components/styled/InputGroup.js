import styled from 'styled-components';

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;

  @media (max-width: 950px) {
    margin-bottom: 20px;

    ${(props) =>
      !props.flex &&
      `& > div:last-child {
        flex: 0 0 100%;
      }
    `}
  }

  & > div {
    margin-right: 15px;
    ${(props) => props.flex && 'flex: 0 0 calc((100% - (4 * 15px)) / 5);'}

    &:last-child {
      margin-right: 0;
    }

    @media (max-width: 1000px) {
      flex: 0 0 calc(50% - 7.5px);

      &:nth-child(2n) {
        margin-right: 0;
      }
    }

    @media (max-width: 480px) {
      flex: 0 0 100%;
      margin-right: 0;
    }
  }
`;

export default InputGroup;
