import styled, { css } from "styled-components";

const texting = `text-align: right;`; // * bu cur yazsaq hec bir CSS ozelliklerini gore bilmiyecik sanki adi text yaziriq

// ! css`` daxilinde yazmaliyiqki normal CSS-daki kimi olsun ve JavaScriptdeki ternary ve short circuitingi qebul etsin
const styling = css`
  ${true && "letter-spacing: 20px;"}
`;

// * Props olaraq type gondermisdik indi ise burada onlarin yoxlayin uygun CSS geri qaytraciq
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 30px;
      font-weight: 600;
      background-color: ${true ? "blue" : "yellow"};
    `};
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 20px;
      font-weight: 600;
      background-color: ${false ? "limegreen" : "red"};
    `};
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 10px;
      font-weight: 600;
      background-color: ${10 > 7 ? "limegreen" : "yellow"};
    `};
  ${texting};
  ${styling};
`;

export default Heading;
