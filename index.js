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

// 내 블로그 최신글 가져오기 Start
// 날짜 형식
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

async function fetchLatestPosts() {
  return fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcurt-poem.tistory.com%2Frss"
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      const responseJson = await response.json();
      return responseJson.items.splice(0, 3);
    })
    .then((items) => {
      const latestPosts = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let title = item.title;
        title += ` - ${item.pubDate.split(" ")[0]}`;
        const link = item.link;
        latestPosts.push({ title, link });
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
    const posts = await fetchLatestPosts();

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
    const errorMessage = document.createElement("li");

    if (error.message == 429) {
      errorMessage.innerHTML =
        'RSS GET 요청 제한 도달: 한 시간 뒤에 다시 시도하거나 <a href="https://curt-poem.tistory.com/">블로그를 직접 방문</a>해주세요.';
    }
    // else if (error.message == 403) {
    //   errorMessage.innerHTML =
    //     "외부 프록시 서버에러.";
    // }
    else {
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
// 내 블로그 최신글 가져오기 End

// Web Component
const hiddenShadowDom = "open";

const getSkillImageDir = (skillName) =>
  `./images/skills/${skillName.replace(/\s+/g, "")}.svg`;
const getProjectImageDir = (projectName) =>
  `./images/projects/${projectName.replace(/\s+/g, "")}.webp`;

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
        rectangles += `<div class="rectangle rectangle-color"></div>`;
      } else {
        rectangles += `<div class="rectangle rectangle-border"></div>`;
      }
    }

    this.shadowRoot.innerHTML = `
    <style>
      :host > * {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
      }
      .row {
        display: flex;
        flex-direction: row;
      }
      .container {
        font-weight: bold;
        align-items: center;
      }
      .period {
        font-weight: normal
      }
      .left-margin {
        margin-left: 10px;
      }
      .small-img {
        display: none;
      }
      @media (max-width: 400px) {
        .small-img {
          display: block;
          margin-right: 5px
        }
      }
      .img {
        margin-right: 10px
      }
      @media (max-width: 400px) {
        .img {
          display: none;
        }
      }
      .rectangle {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        display: flex;
      }
      .rectangle-color {
        background-color: #1263CE;
      }
      .rectangle-border {
        border: 1px black solid;
      }
    </style>
    <article>
      <div class="row container">
        <img class="small-img" src="${getSkillImageDir(
          name
        )}" height="30px" alt="${name}아이콘"/>
        <p>${name}</p>
        <p class="left-margin period">${period ? `${period} 경력` : ""}</p>
        <p class="left-margin">${rectangles}</p>
      </div>
      <div class="row">
        <img class="img" src="${getSkillImageDir(
          name
        )}" height="50px" alt="${name}아이콘"/>
        <slot></slot>
      </div>
    </article>
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
    const projectSummary =
      this.getAttribute("projectSummary") ??
      "projectSummary 속성 지정되지 않음";
    const projectDescription = this.getAttribute("projectDescription") ?? "";
    const imgSrc = this.getAttribute("imgSrc");
    const reverse = this.getAttribute("reverse") !== null;

    this.shadowRoot.innerHTML = `
    <style>
    :host {
      width: 100%;
    }
    :host > * {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px;
    }
    .container {
      display: flex;
      justify-content: ${reverse ? "end" : "start"};
      flex-direction: ${reverse ? "row-reverse" : "row"};
    }
    @media (max-width: 1000px) {
      .container {
        display: flex;
        flex-direction: column;
      }
    }
    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .column > p {
      margin: 0px
    }
    .skill {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .img {
      align-self: center;
      object-fit: contain;
      margin-left: 5px;
      margin-right: 10px;
      border-radius: 30px;
      overflow: hidden;
    }
    .name {
      font-weight: bold;
      font-size: 1.2rem;
    }
    .summary {
      padding-bottom: 5px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    ::slotted(li)::before {
      content: "-";
      color: black;
      display: inline-block;
      width: 1rem;
    }
    </style>
    <article class="container">
      <img src="${
        imgSrc ?? getProjectImageDir(name)
      }" height="200px" width="200px" class="img" alt="${name} 로고">
      <div class="column">
        <p class="name">${name}</p>
        <p class="summary">${projectSummary}</p>
        <p class="summary">${projectDescription}</p>
        <div class="skill">
          <p class="name">역할</p>
          <img class="img" src="${getSkillImageDir(
            skill
          )}" height="40px" width="40px" alt="${skill} 아이콘">
        </div>
          <p><strong>${skill}</strong></p>
          <ul>
            <slot></slot>
          </ul>
      </div>
    </article>
    `;
  }
}

customElements.define("project-component", Project);
