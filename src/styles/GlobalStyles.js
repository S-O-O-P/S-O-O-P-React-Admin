import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle
`
:root{
--main-color: #FFb755;
    --text-color: #282A29;
    --point-color: #EB844A;
    
    // font-weight
    --regular : 500;
    --medium : 600;
    --semiBold : 700;
    --bold : 800;
}
* { margin: 0; padding:0; box-sizing: border-box; font-family: 'SUIT', sans-serif;}
header, main, section, article, aside, div {margin:0; padding:0;}
a, p, h1, h2, h3, h4, h5, h6, li {margin: 0; padding:0; text-decoration: none; color: #282A29;}
ul, ol, li {list-style: none; margin:0; padding:0;}
button {outline: none;}
input {outline: none;}
body {margin: 0 auto;}
`


export default GlobalStyle;