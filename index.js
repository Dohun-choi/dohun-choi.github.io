import { latestPostEventListener } from "./api/rss";
import { hoverAndShow } from "./component/hoverAndShow";
import { Project } from "./component/project";
import { skill } from "./component/skill";

// 컴포넌트 등록
customElements.define("project-component", Project);
customElements.define("skill-component", skill);

window.addEventListener("load", latestPostEventListener);

// 스크롤 버튼 Start
window.addEventListener("scroll", function () {
  toTop();
  navHighlight();
});

// 스크롤이 가장 위가 아니면 화면 최상단으로 가는 버튼 보이게 하기
function toTop() {
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
}

// 현재 보고 있는 화면에 따라 네브바 강조하기
function navHighlight() {
  // 스크롤 위치가 소수점일 경우 때문에 스크롤 위치를 1 추가
  // Math.ceil이나 Math.floor는 id로 이동할 경우 올바르게 현재 위치를 파악 못함
  const scrollPosition = window.scrollY + 1;

  const sectionPositions = {
    home: document.getElementById("home"),
    skills: document.getElementById("skills"),
    project: document.getElementById("project"),
    contact: document.getElementById("contact"),
  };

  let currentSectionId = null;
  for (let sectionId in sectionPositions) {
    if (
      scrollPosition >= sectionPositions[sectionId].offsetTop &&
      scrollPosition <
        sectionPositions[sectionId].offsetTop +
          // 아래에서 위로 올라 갈 때 현재 보는 Nav를 너무 빨리 바꾸지 않도록 함
          sectionPositions[sectionId].offsetHeight / 3
    ) {
      currentSectionId = sectionId;
      break;
    }
  }

  if (!currentSectionId) return;

  const navLinks = document.querySelectorAll(".nav-ul li a");
  navLinks.forEach(function (link) {
    const sectionId = link.getAttribute("href").substring(1);
    if (sectionId === currentSectionId) {
      console.log(sectionId);
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.getElementById("topButton").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// 스크롤 버튼 End

// 라이브러리 목록 호버
const libraryElement = document.getElementById("library");
const infoBoxElement = document.getElementById("infoBox");
hoverAndShow(libraryElement, infoBoxElement);

const skillComponents = Array.from(
  document.getElementsByTagName("skill-component")
);
const skillLevelInfo = document.getElementById("skillInfoBox");
console.log(skillComponents);
skillComponents.forEach((e) => {
  const levelContainer = e.shadowRoot.querySelector(".levels");
  hoverAndShow(levelContainer, skillLevelInfo);
});
