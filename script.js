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

const replaceDots = (source) => [...source]
  .reduce((result, c, i) => result + (isDotInLowerLetters(source, c, i) ? interpunkt : c),  "");

const updateResult = (source) => {
  resultElement.value = replaceDots(source);
};

const sourceElement = document.querySelector("#source");
const resultElement = document.querySelector("#result");

sourceElement.oninput = (e) => updateResult(e.target.value);

const randomTimeout = () => Math.floor(Math.random() * 42) + 4.2;

// inspiration from https://w3collective.com/animated-typing-text-effect/
const sourcePlaceholder = sourceElement.placeholder;
sourceElement.placeholder = "";

document.addEventListener("DOMContentLoaded", () => {
  let letter = 0;
  const typeText = () => {
    if (letter >= sourcePlaceholder.length) return;
    sourceElement.placeholder += sourcePlaceholder.charAt(letter);
    resultElement.placeholder = replaceDots(sourceElement.placeholder);
    letter++;
    setTimeout(typeText, randomTimeout());
  };
  typeText();
});

const copy = async (content) => {
  return await navigator.clipboard.writeText(content);
};

document.querySelector("#copy").onclick = () =>
  copy(document.querySelector("#result").value);
document.querySelector("#copyPoint").onclick = () => copy(interpunkt);
