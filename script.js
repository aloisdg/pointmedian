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
  .map((c, i) =>
    isDotInLowerLetters(source, c, i) ? interpunkt : c
  )
  .join("");

const updateResult = (source) => {
  document.querySelector("#result").value = replaceDots(source);
};

const sourceElement = document.querySelector("#source");

sourceElement.oninput = (e) => updateResult(e.target.value);

// inspiration from https://w3collective.com/animated-typing-text-effect/
// const text = sourceElement.value;
// sourceElement.value = "";
const sourcePlaceholder = sourceElement.placeholder;
sourceElement.placeholder = "";

document.addEventListener("DOMContentLoaded", () => {
  let letter = 0;
  const typeText = () => {
    if (letter >= sourcePlaceholder.length) return;
    sourceElement.placeholder += sourcePlaceholder.charAt(letter);
    document.querySelector("#result").placeholder = replaceDots(sourceElement.placeholder);
    letter++;
    setTimeout(typeText, Math.floor(Math.random() * 42) + 4.2);
  };
  typeText();
});

const copy = async (content) => {
  return await navigator.clipboard.writeText(content);
};

document.querySelector("#copy").onclick = () =>
  copy(document.querySelector("#result").value);
document.querySelector("#copyPoint").onclick = () => copy(interpunkt);
