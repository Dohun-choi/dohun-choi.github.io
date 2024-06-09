import { getSkillImageDir } from "../util/getFilePath";

export class skill extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
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
        content: "►";
        color: black;
        display: inline-block;
        width: 1rem;
      }
    </style>
    <article>
      <div class="row container">
        <img class="small-img" src="${getSkillImageDir(
          name
        )}" height="30px" loading="lazy" alt="${name}아이콘"/>
        <p>${name}</p>
        <p class="left-margin period">${period ? `${period} 경력` : ""}</p>
        <div class="left-margin row levels">${rectangles}</div>
      </div>
      <div class="row">
        <img class="img" src="${getSkillImageDir(
          name
        )}" height="50px" loading="lazy" alt="${name}아이콘"/>
        <ul>
          <slot></slot>
        </ul>
      </div>
    </article>
    `;
  }
}
