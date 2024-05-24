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

// 내 블로그 최신글 가져오기
async function fetchLatestPosts() {
  return fetch(
    "https://cors-anywhere.herokuapp.com/https://curt-poem.tistory.com/rss"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.text();
    })
    .then((xmlText) => {
      const parser = new DOMParser();
      const xmlDocument = parser.parseFromString(xmlText, "text/xml");
      const items = xmlDocument.querySelectorAll("item");
      const latestPosts = [];
      for (let i = 0; i < Math.min(items.length, 3); i++) {
        const item = items[i];
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const pubDate = item.querySelector("pubDate").textContent;
        latestPosts.push({ title, link, pubDate });
      }
      return latestPosts;
    })
    .catch((error) => {
      throw error;
    });
}

// 페이지 로드 시 fetchLatestPosts 함수 실행
window.addEventListener("load", async () => {
  const postListElement = document.getElementById("postList");

  // 로딩 스피너 추가
  const loadingSpinner = document.createElement("div");
  loadingSpinner.id = "loadingSpinner";
  loadingSpinner.classList.add("spinner");
  postListElement.appendChild(loadingSpinner);

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent =
    "RSS 피드를 통해 블로그 최신 글을 불러오는 중입니다.";
  postListElement.appendChild(loadingMessage);

  try {
    // const posts = await fetchLatestPosts();

    posts.forEach((post) => {
      const listItem = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.href = post.link;
      linkElement.textContent = post.title;
      linkElement.classList.add("blog-post-item");
      listItem.appendChild(linkElement);
      postListElement.appendChild(listItem);
    });
  } catch (error) {
    console.error("최신 글을 가져오는 중 오류가 발생했습니다.", error);
    const errorMessage = document.createElement("p");

    if (error.message == 429) {
      errorMessage.innerHTML =
        'RSS GET 요청 제한 도달: 한 시간 뒤에 다시 시도하거나 <a href="https://curt-poem.tistory.com/">블로그를 직접 방문</a>해주세요.';
    } else if (error.message == 403) {
      errorMessage.innerHTML =
        "외부 프록시 서버 에러, hallow2546@gmail.com으로 연락주시면 빠르게 조치하겠습니다.";
    } else {
      errorMessage.innerHTML =
        '현재 <a href="https://curt-poem.tistory.com/">블로그의 최신 글</a>을 가져올 수 없습니다.';
    }
    postListElement.appendChild(errorMessage);
  } finally {
    // 로딩 스피너 삭제
    postListElement.removeChild(loadingSpinner);
    postListElement.removeChild(loadingMessage);
  }
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
    if (!this.shadowRoot) return;
    const name = this.getAttribute("name") ?? "name 속성 없음";
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
    :host {
      display: block;
    }
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
    .skill-component-small-img {
      display: none;
    }
    @media (max-width: 400px) {
      .skill-component-small-img {
        display: block;
        margin-right: 5px
      }
    }
    .skill-component-img {
      margin-right: 10px
    }
    @media (max-width: 400px) {
      .skill-component-img {
        display: none;
      }
    }
    .skill-component-rectangle {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      display: flex;
    }
     .skill-component-rectangle-color {
      background-color: #1263CE;
     }
     .skill-component-rectangle-border {
      border: 1px black solid;
     }
    </style>

    <div class="skill-component-row skill-component-bold-center">
      <img class="skill-component-small-img" src="./images/${name}.svg" height="30px"/>
      <p>${name}</p>
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

class Project extends HTMLElement {
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
    if (!this.shadowRoot) return;

    const name = this.getAttribute("name") ?? "name 속성이 지정되지 않음";
    const skill = this.getAttribute("skill") ?? "skill 속성 지정되지 않음";
    const projectDescription =
      this.getAttribute("projectDescription") ??
      "projectDescription이 지정되지 않음";
    const imgSrc = this.getAttribute("imgSrc");

    this.shadowRoot.innerHTML = `
    <style>
    .project-component-container {
      display: flex;
    }
    @media (max-width: 1000px) {
      .project-component-container {
        display: flex;
        flex-direction: column;
      }
    }
    .project-component-column {
      display: flex;
      flex-direction: column;
    }
    .project-component-column > p {
      margin: 0px
    }
    .project-component-skill {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .project-component-img {
      object-fit: contain;
    }
    .project-component-name {
      font-weight: bold;
    }
    </style>
    <div class="project-component-container">
      <img src="${imgSrc}" height="400px" class="project-component-img">
      <div class="project-component-column">
        <p class="project-component-name">${name}</p>
        <p>${projectDescription}</p>
        <p class="project-component-name">역할</p>
        <div class="project-component-skill">
          <img src="./images/${skill}.svg" height="40px" width="40px">
          <p>${skill}</p>
        </div>
        <slot></slot>
      </div>
    </div>
    `;
  }
}

customElements.define("project-component", Project);
