(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // api/rss.js
  function fetchLatestPosts() {
    return __async(this, null, function* () {
      return fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcurt-poem.tistory.com%2Frss"
      ).then((response) => __async(this, null, function* () {
        if (!response.ok) {
          throw new Error(response.status);
        }
        const responseJson = yield response.json();
        return responseJson.items.splice(0, 3);
      })).then((items) => {
        const latestPosts = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          let title = item.title;
          title += ` - ${item.pubDate.split(" ")[0]}`;
          const link = item.link;
          latestPosts.push({ title, link });
        }
        return latestPosts;
      }).catch((error) => {
        throw error;
      });
    });
  }
  var latestPostEventListener = () => __async(void 0, null, function* () {
    const postListElement = document.getElementById("postList");
    const loadingSpinner = document.createElement("div");
    loadingSpinner.id = "loadingSpinner";
    loadingSpinner.classList.add("spinner");
    postListElement.appendChild(loadingSpinner);
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "RSS \uD53C\uB4DC\uB97C \uD1B5\uD574 \uBE14\uB85C\uADF8 \uCD5C\uC2E0 \uAE00\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4.";
    postListElement.appendChild(loadingMessage);
    try {
      const posts = yield fetchLatestPosts();
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
      console.error("\uCD5C\uC2E0 \uAE00\uC744 \uAC00\uC838\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.", error);
      const errorMessage = document.createElement("li");
      if (error.message == 429) {
        errorMessage.innerHTML = 'RSS GET \uC694\uCCAD \uC81C\uD55C \uB3C4\uB2EC: \uD55C \uC2DC\uAC04 \uB4A4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098 <a href="https://curt-poem.tistory.com/">\uBE14\uB85C\uADF8\uB97C \uC9C1\uC811 \uBC29\uBB38</a>\uD574\uC8FC\uC138\uC694.';
      } else {
        errorMessage.innerHTML = '\uD604\uC7AC <a href="https://curt-poem.tistory.com/">\uBE14\uB85C\uADF8\uC758 \uCD5C\uC2E0 \uAE00</a>\uC744 \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.';
      }
      postListElement.appendChild(errorMessage);
    } finally {
      postListElement.removeChild(loadingSpinner);
      postListElement.removeChild(loadingMessage);
    }
  });

  // component/hoverAndShow.js
  var hoverAndShow = (hoverTargetElement, showedElement) => {
    hoverTargetElement.addEventListener("mousemove", function(event) {
      showedElement.style.display = "block";
      showedElement.style.left = event.pageX + "px";
      showedElement.style.top = event.pageY + "px";
    });
    hoverTargetElement.addEventListener("mouseleave", function() {
      showedElement.style.display = "none";
    });
  };

  // util/getFilePath.js
  var getSkillImageDir = (skillName) => `./images/skills/${skillName.replace(/\s+/g, "")}.svg`;
  var getProjectImageDir = (projectName) => `./images/projects/${projectName.replace(/\s+/g, "")}.webp`;

  // component/project.js
  var Project = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      var _a, _b, _c, _d, _e;
      if (!this.shadowRoot) return;
      const name = (_a = this.getAttribute("name")) != null ? _a : "name \uC18D\uC131\uC774 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C";
      const skill2 = (_b = this.getAttribute("skill")) != null ? _b : "skill \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C";
      const projectSummary = (_c = this.getAttribute("projectSummary")) != null ? _c : "projectSummary \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C";
      const projectDescription = (_d = this.getAttribute("projectDescription")) != null ? _d : "";
      const imgSrc = this.getAttribute("imgSrc");
      const projectUrl = (_e = this.getAttribute("projectUrl")) != null ? _e : null;
      this.shadowRoot.innerHTML = `
    <style>
    :host {
      width: 100%;
    }
    * {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px;
    }
    .container {
      display: flex;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 16px;
      margin-bottom: 20px;
      transition: transform 0.3s ease;
    }
    .container:hover {
      transform: scale(1.05);
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
    ol {
      padding: 0px;
      list-style-type: none;
      counter-reset: counter;
    }
    ::slotted(li) {
      counter-increment: counter;
    }
    ::slotted(li)::before {
      content: counter(counter) ".";
      color: black;
      display: inline-block;
      width: 1.1rem;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    </style>

  <!--
  rel="noopener noreferrer"\uC740 Tabnabbing \uACF5\uACA9 \uBC29\uC5B4\uB97C \uC704\uD568
  \uC0C8 \uD0ED\uC774 \uC6D0\uB798 \uD0ED\uC758 window.opener \uAC1D\uCCB4\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uAC8C \uB9CC\uB4EC
  -->
  <a href="${projectUrl}" target="_blank" rel="noopener noreferrer">
    <article class="container">
      <img src="${imgSrc != null ? imgSrc : getProjectImageDir(name)}" height="200px" width="200px" class="img" loading="lazy" alt="${name} \uB85C\uACE0">
      <div class="column">
        <p class="name">${name}</p>
        <p class="summary">${projectSummary}</p>
        <p class="summary">${projectDescription}</p>
        <div class="skill">
          <p class="name">\uC5ED\uD560</p>
          <img class="img" src="${getSkillImageDir(
        skill2
      )}" height="30px" width="30px" loading="lazy" alt="${skill2} \uC544\uC774\uCF58">
        </div>
          <p><strong>${skill2}</strong></p>
          <ol>
            <slot></slot>
          </ol>
      </div>
    </article>
  </a>
    `;
    }
  };

  // component/skill.js
  var skill = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      var _a;
      if (!this.shadowRoot) return;
      const name = (_a = this.getAttribute("name")) != null ? _a : "name \uC18D\uC131 \uC5C6\uC74C";
      const level = Math.min(parseInt(this.getAttribute("level")) || 0, 5);
      const period = this.getAttribute("period");
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
      * {
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
        padding-top: 16px;
        padding-bottom: 16px;
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
      }
      .rectangle-color {
        background-color: #1263CE;
      }
      .rectangle-border {
        border: 1px black solid;
      }
      ul {
        list-style: none;
      }
      ::slotted(li) {
        list-style-type: none;
        overflow-wrap: break-word;
        white-space: wrap;
      }
      ::slotted(li)::before {
        content: "\u25BA";
        color: black;
        display: inline-block;
        width: 1rem;
      }
    </style>
    <article>
      <div class="row container">
        <img class="small-img" src="${getSkillImageDir(
        name
      )}" height="30px" loading="lazy" alt="${name}\uC544\uC774\uCF58"/>
        <p>${name}</p>
        <p class="left-margin period">${period ? `${period} \uACBD\uB825` : ""}</p>
        <div class="left-margin row levels">${rectangles}</div>
      </div>
      <div class="row">
        <img class="img" src="${getSkillImageDir(
        name
      )}" height="50px" loading="lazy" alt="${name}\uC544\uC774\uCF58"/>
        <ul>
          <slot></slot>
        </ul>
      </div>
    </article>
    `;
    }
  };

  // index.js
  customElements.define("project-component", Project);
  customElements.define("skill-component", skill);
  window.addEventListener("load", latestPostEventListener);
  window.addEventListener("scroll", function() {
    toTop();
    navHighlight();
  });
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
  function navHighlight() {
    const scrollPosition = window.scrollY + 1;
    const sectionPositions = {
      home: document.getElementById("home"),
      skills: document.getElementById("skills"),
      project: document.getElementById("project"),
      contact: document.getElementById("contact")
    };
    let currentSectionId = null;
    for (let sectionId in sectionPositions) {
      if (scrollPosition >= sectionPositions[sectionId].offsetTop && scrollPosition < sectionPositions[sectionId].offsetTop + // 아래에서 위로 올라 갈 때 현재 보는 Nav를 너무 빨리 바꾸지 않도록 함
      sectionPositions[sectionId].offsetHeight / 3) {
        currentSectionId = sectionId;
        break;
      }
    }
    if (!currentSectionId) return;
    const navLinks = document.querySelectorAll(".nav-ul li a");
    navLinks.forEach(function(link) {
      const sectionId = link.getAttribute("href").substring(1);
      if (sectionId === currentSectionId) {
        console.log(sectionId);
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  document.getElementById("topButton").addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  var libraryElement = document.getElementById("library");
  var infoBoxElement = document.getElementById("infoBox");
  hoverAndShow(libraryElement, infoBoxElement);
  var skillComponents = Array.from(
    document.getElementsByTagName("skill-component")
  );
  var skillLevelInfo = document.getElementById("skillInfoBox");
  console.log(skillComponents);
  skillComponents.forEach((e) => {
    const levelContainer = e.shadowRoot.querySelector(".levels");
    hoverAndShow(levelContainer, skillLevelInfo);
  });
})();
