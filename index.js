import { latestPostEventListener } from "./api/rss";
import { Project } from "./component/project";
import { skill } from "./component/skill";

// 컴포넌트 등록
customElements.define("project-component", Project);
customElements.define("skill-component", skill);

window.addEventListener("load", latestPostEventListener);

// 스크롤 버튼 Start
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
// 스크롤 버튼 End

// 라이브러리 호버 시 정렬 기준 설명 보이게 하기 Start
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
// 라이브러리 호버 시 정렬 기준 설명 보이게 하기 End
