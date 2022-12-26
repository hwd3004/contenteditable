// https://dev-bak.tistory.com/16
// [HTML/JS/CSS] contenteditable을 이용한 editor 만들기

/** @type {HTMLDivElement} */
const editor = document.getElementById("editor");

/** @type {HTMLButtonElement} */
const btnBold = document.getElementById("btn-bold");

/** @type {HTMLButtonElement} */
const btnItalic = document.getElementById("btn-italic");

/** @type {HTMLButtonElement} */
const btnUnderline = document.getElementById("btn-underline");

/** @type {HTMLButtonElement} */
const btnStrike = document.getElementById("btn-strike");

/** @type {HTMLButtonElement} */
const btnOrderedList = document.getElementById("btn-ordered-list");

/** @type {HTMLButtonElement} */
const btnUnorderedList = document.getElementById("btn-unordered-list");

/** @type {HTMLButtonElement} */
const btnImage = document.getElementById("btn-image");

btnBold.addEventListener("click", function () {
  setStyle("bold");
});

btnItalic.addEventListener("click", function () {
  setStyle("italic");
});

btnUnderline.addEventListener("click", function () {
  setStyle("underline");
});

btnStrike.addEventListener("click", function () {
  setStyle("strikeThrough");
});

btnOrderedList.addEventListener("click", function () {
  setStyle("insertOrderedList");
});

btnUnorderedList.addEventListener("click", function () {
  setStyle("insertUnorderedList");
});

editor.addEventListener("keydown", function () {
  checkStyle();
});

editor.addEventListener("mousedown", function () {
  checkStyle();
});

/**
 * mutable ai가 작성한 코드
 */
// btnImage.addEventListener("click", function () {
//   const inputImageSelector = document.createElement("input");
//   inputImageSelector.setAttribute("type", "file");
//   inputImageSelector.setAttribute("accept", "image/*");
//   inputImageSelector.click();
//   inputImageSelector.addEventListener("change", function () {
//     const file = inputImageSelector.files[0];

//     const reader = new FileReader();

//     reader.addEventListener("load", function () {
//       const img = document.createElement("img");
//       img.setAttribute("src", reader.result);
//       editor.appendChild(img);
//     });

//     reader.readAsDataURL(file);
//   });

//   inputImageSelector.removeEventListener("change", function () {});
//   inputImageSelector.remove();
// });

btnImage.addEventListener("click", function () {
  const inputImageSelector = document.createElement("input");
  inputImageSelector.setAttribute("type", "file");
  inputImageSelector.setAttribute("accept", "image/*");
  inputImageSelector.click();

  inputImageSelector.addEventListener("change", function (event) {
    const files = event.target.files;

    if (!!files) {
      insertImage(files[0]);
    }
  });

  function insertImage(file) {
    const reader = new FileReader();
    reader.addEventListener("load", function (event) {
      focusEditor();
      document.execCommand("insertImage", false, `${reader.result}`);
    });

    reader.readAsDataURL(file);
  }
});

/**
 * @param {string} style
 */
function setStyle(style) {
  document.execCommand(style);
  focusEditor();
  checkStyle();
}

// 버튼 클릭 시 에디터가 포커스를 잃기 때문에 다시 에디터에 포커스를 해줌
function focusEditor() {
  editor.focus({ preventScroll: true });
}

function checkStyle() {
  if (isStyle("bold")) {
    btnBold.classList.add("active");
  } else {
    btnBold.classList.remove("active");
  }

  if (isStyle("italic")) {
    btnItalic.classList.add("active");
  } else {
    btnItalic.classList.remove("active");
  }

  if (isStyle("underline")) {
    btnUnderline.classList.add("active");
  } else {
    btnUnderline.classList.remove("active");
  }

  if (isStyle("strikeThrough")) {
    btnStrike.classList.add("active");
  } else {
    btnStrike.classList.remove("active");
  }

  if (isStyle("insertOrderedList")) {
    btnOrderedList.classList.add("active");
  } else {
    btnOrderedList.classList.remove("active");
  }

  if (isStyle("insertUnorderedList")) {
    btnUnorderedList.classList.add("active");
  } else {
    btnUnorderedList.classList.remove("active");
  }
}

function isStyle(style) {
  return document.queryCommandState(style);
}
