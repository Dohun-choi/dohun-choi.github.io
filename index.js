// 스크롤 버튼
window.addEventListener("scroll", function () {
  const topButton = document.getElementById("topButton");
  if (window.scrollY > 100) {
    topButton.style.display = "block";
    topButton.style.opacity = "1";
  } else {
    topButton.style.opacity = "0";
    setTimeout(() => {
      if (window.scrollY <= 100) {
        topButton.style.display = "none";
      }
    }, 300);
  }
});

document.getElementById("topButton").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 라이브러리 목록 호버
const hoverTargetElement = document.getElementById("library");
const infoBoxElement = document.getElementById("infoBox");

hoverTargetElement.addEventListener("mouseenter", function (event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // 마우스 위치에 정보 표시
  infoBoxElement.style.display = "block";
  infoBoxElement.style.left = mouseX;
  infoBoxElement.style.top = mouseY;
});

hoverTargetElement.addEventListener("mouseleave", function () {
  // 마우스가 벗어날 때 정보 숨기기
  infoBoxElement.style.display = "none";
});

// Web Component
const hiddenShadowDom = "open";

class skill extends HTMLElement {
  static get observedAttributes() {
    return ["name", "level", "period"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: hiddenShadowDom });
    this.render();
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }
    const name = this.getAttribute("name");
    const level = Math.min(parseInt(this.getAttribute("level")) || 0, 5);
    const period = this.getAttribute("period");

    // 레벨에 따른 사각형 요소를 생성
    let rectangles = "";
    for (let i = 0; i < 5; i++) {
      if (i < level) {
        rectangles += `<div class="skill-component-rectangle skill-component-rectangle-color"></div>`;
      } else {
        rectangles += `<div class="skill-component-rectangle skill-component-rectangle-border"></div>`;
      }
    }

    this.shadowRoot.innerHTML = `
    <style>
    .skill-component-row {
      display: flex;
      flex-direction: row;
    }
    .skill-component-bold-center {
      font-weight: bold;
      align-items: center;
    }
    .skill-component-period {
      font-weight: normal
    }
    .skill-component-left-margin {
      margin-left: 10px;
    }
    .skill-component-img {
      margin-right: 10px
    }
    .skill-component-rectangle {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
     .skill-component-rectangle-color {
      background-color: #1263CE;
     }
     .skill-component-rectangle-border {
      border: 1px black solid;
     }
    </style>

    <div class="skill-component-row skill-component-bold-center">
      <p>${name ?? "name 속성 없음"}</p>
      <p class="skill-component-left-margin skill-component-period">${
        period ? `${period} 경력` : ""
      }</p>
      <p class="skill-component-left-margin">${rectangles}</p>
    </div>
    <div class="skill-component-row">
      <img class="skill-component-img" src="./images/${name}.svg" height="50px"/>
      <slot></slot>
    </div>

    `;
  }
}

customElements.define("skill-component", skill);
