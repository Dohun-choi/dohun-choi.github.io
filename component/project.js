import { getProjectImageDir, getSkillImageDir } from "../util/getFilePath";

export class Project extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
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
    </style>
    <article class="container">
      <img src="${
        imgSrc ?? getProjectImageDir(name)
      }" height="200px" width="200px" class="img" loading="lazy" alt="${name} 로고">
      <div class="column">
        <p class="name">${name}</p>
        <p class="summary">${projectSummary}</p>
        <p class="summary">${projectDescription}</p>
        <div class="skill">
          <p class="name">역할</p>
          <img class="img" src="${getSkillImageDir(
            skill
          )}" height="30px" width="30px" loading="lazy" alt="${skill} 아이콘">
        </div>
          <p><strong>${skill}</strong></p>
          <ol>
            <slot></slot>
          </ol>
      </div>
    </article>
    `;
  }
}
