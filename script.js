const dot = ".";
const interpunkt = "·";

const isLetter = (c) => c.toLowerCase() !== c.toUpperCase();

const isLowerLetter = (c) => isLetter(c) && c === c.toLowerCase();

// match [a-zà-öø-ÿ](\.)[a-zà-öø-ÿ], maybe
const isDotInLowerLetters = (source, c, i) =>
  c === dot &&
  i > 0 &&
  i + 1 < source.length &&
  isLowerLetter(source[i - 1]) &&
  isLowerLetter(source[i + 1]);

const replaceDot = (source, c, i) => isDotInLowerLetters(source, c, i) ? interpunkt : c;

const replaceDots = (source) => [...source]
  .reduce((result, c, i) => result + replaceDot(source, c, i), "");

const randomTimeout = () => Math.floor(Math.random() * 42) + 4.2;

const copy = async (content) => await navigator.clipboard.writeText(content);

const sourceElement = document.querySelector("#source");
const resultElement = document.querySelector("#result");

sourceElement.oninput = (e) => resultElement.value = replaceDots(e.target.value);

const sourcePlaceholder = sourceElement.placeholder;
sourceElement.placeholder = "";

document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const typeText = () => {
    if (index >= sourcePlaceholder.length) return;
    const char = sourcePlaceholder.charAt(index);
    sourceElement.placeholder += char;
    resultElement.placeholder += replaceDot(sourcePlaceholder, char, index);
    index++;
    setTimeout(typeText, randomTimeout());
  };
  typeText();
});

document.querySelector("#copy").onclick = () => copy(resultElement.value);
document.querySelector("#copyPoint").onclick = () => copy(interpunkt);
