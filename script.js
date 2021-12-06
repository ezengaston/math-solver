const input = document.querySelector("[data-input]");
const btn = document.querySelector("[data-btn]");
const resultText = document.querySelector("#results");

function brackets(str, operator) {
  const result = [];
  let brackets = 0;
  let currentChunk = "";
  for (let i = 0; i < str.length; i++) {
    let currentItem = str[i];
    if (currentItem == "(") {
      brackets++;
    } else if (currentItem == ")") {
      brackets--;
    }
    if (brackets == 0 && currentItem == operator) {
      result.push(currentChunk);
      currentChunk = "";
    } else {
      currentChunk += currentItem;
    }
  }
  if (currentChunk != "") {
    result.push(currentChunk);
  }
  return result;
}

function square(str) {
  const split = brackets(str, "^");
  const numbers = split.map((noStr) => {
    if (noStr[0] == "(") {
      const value = noStr.substr(1, noStr.length);
      return plus(value);
    }
    return parseFloat(noStr);
  });

  const result = numbers.reduce((acc, val) => {
    let i = 1;
    let value = acc;
    while (i < val) {
      acc = acc * value;
      i++;
    }
    return acc;
  });
  return result;
}

function multiplication(str) {
  const split = brackets(str, "*");
  const numbers = split.map((noStr) => square(noStr));
  const initialValue = 1;

  const result = numbers.reduce((acc, val) => {
    return acc * val;
  }, initialValue);
  return result;
}

function division(str) {
  const split = brackets(str, "/");
  const numbers = split.map((noStr) => multiplication(noStr));

  const result = numbers.reduce((acc, val) => {
    return acc / val;
  });
  return result;
}

function plus(str) {
  const split = brackets(str, "+");
  const numbers = split.map((noStr) => {
    if (noStr.match(/[a-zA-Z]/g)) {
      resultText.innerHTML = "NaN";
    } else {
      return minus(noStr);
    }
  });
  const initialValue = 0;

  const result = numbers.reduce((acc, val) => {
    return acc + val;
  }, initialValue);
  return result;
}

function minus(str) {
  const split = brackets(str, "-");
  const numbers = split.map((noStr) => division(noStr));

  const result = numbers.reduce((acc, val) => {
    return acc - val;
  });
  return result;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const str = input.value;
  const solution = plus(str);
  resultText.innerText = solution;
});
