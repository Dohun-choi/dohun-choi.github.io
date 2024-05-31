export const hoverAndShow = (hoverTargetElement, showedElement) => {
  hoverTargetElement.addEventListener("mousemove", function (event) {
    // 마우스 위치에 정보 표시
    showedElement.style.display = "block";
    showedElement.style.left = event.pageX + "px";
    showedElement.style.top = event.pageY + "px";
  });

  hoverTargetElement.addEventListener("mouseleave", function () {
    // 마우스가 벗어날 때 정보 숨기기
    showedElement.style.display = "none";
  });
};
