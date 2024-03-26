import styled from "styled-components";
import GlobalStyles from "./styles/Global/GlobalStyles";
import Button from "./styles/Button";
import Input from "./styles/Input";
import Heading from "./styles/Heading";
import Row from "./styles/Row";

// Todo: Buradada yazmaq olar ama REUSE etmek ucun her birini oz component daxilindeki folderlere gonderib import etmeliyik
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

// ! Componentin ozunu style etmek ucun StyledComponentName yazib orda butun CSS kodlarini yazmaq olar
const StyledApp = styled.div`
  background-color: deepskyblue;
  padding: 20px;
`;

// Todo: Button ve Input REUSE componentler olduqu ucun onlari ayri yerde yazib bura import edecik
// const Button = styled.button`
//   font-size: 1.4rem;
//   padding: 1.2rem 1.6rem;
//   font-weight: 500;
//   border: none;
//   cursor: pointer;
//   background-color: var(--color-brand-600); // ! GlobalStyles daxilinde :root-dan gelen rengdir hansiki onu global edib burada el catan etdik
//   border-radius: var(--border-radius-sm);
//   color: var(--color-brand-50);
//   box-shadow: var(--shadow-sm);
//   &:hover{
//     background-color: var(--color-brand-700);  // ! SCSS ve SASS-daki kimi hover, active ... kimi seyler & bundan sonra yazilir
//   }
// `;

// const Input = styled.input`
//   padding: 0.8rem 1.2rem;
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-sm);
//   box-shadow: var(--shadow-sm);
// `;

function App() {
  return (
    <>
      <GlobalStyles />      {/* // ! GlobalStyles chilren qebul etmediyi ucun bunu en yuxarida yazdiqki asagidakilar her biri tanisin (sibling to StyledApp) */}
      <StyledApp>
      <Row>
        <Row type="horizontal">          
          <H1>The Wild Oasis</H1>
          <div>
            <Heading /*type="h1"*/ as="h1">Heading №1</Heading>   {/* // Todo: Same as before */}
            <Heading /*type="h2"*/ as="h2">Heading №2</Heading>   {/* // Todo: Type prop gonderirikki buna esasen ozu CSS teyin etsin */}
            <Heading /*type="h3"*/ as="h3">Heading №3</Heading>   {/* // Todo: As prop gonderirik ve ona uygun element olsun gondermesek hamisi h1 element olacaq */}
            <Button onClick={() => alert("Checked In")}>Check in</Button>  {/* // ! Styled Components also are able to receive props as normal Components  */}
            <Button variation="danger" size="large" onClick={() => alert("Checked Out")}>Check out</Button>
          </div>
        </Row>
        <Row /* type="vertical" */>               {/* Artiq burada yazilmalasarda olar cunki default olaraq bildirdik */}
          <Input type="number" placeholder="Number of Guests" />
          <Input type="number" placeholder="Number of Guests" />
        </Row>
      </Row>
      </StyledApp>
    </>
  );
}

export default App;
