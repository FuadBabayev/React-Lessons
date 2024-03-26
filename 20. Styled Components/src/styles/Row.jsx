import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;
    ${(props) => props.type = `horizontal` && css`
        align-items: center;
        justify-content: space-between;
        background-color: antiquewhite;
    `};

    ${(props) => props.type = `vertical` && css`
        /* flex-direction: column; */
        gap: 30px;
    `};
`;

// ! Bu onu gosterirki eger component daxilindeki ROW elementinde her hansisa type daxil edilmese avtomatik olaraq vertical kimi qebul edecek
Row.defaultProps = {
    type : "vertical",
}

export default Row;
