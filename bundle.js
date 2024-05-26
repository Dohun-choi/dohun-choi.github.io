/*! This is a banner */
(()=>{var s=e=>`./images/skills/${e.replace(/\s+/g,"")}.svg`,u=e=>`./images/projects/${e.replace(/\s+/g,"")}.webp`;var a=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){var m,p,g,h;if(!this.shadowRoot)return;let t=(m=this.getAttribute("name"))!=null?m:"name \uC18D\uC131\uC774 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",i=(p=this.getAttribute("skill"))!=null?p:"skill \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",r=(g=this.getAttribute("projectSummary"))!=null?g:"projectSummary \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",n=(h=this.getAttribute("projectDescription"))!=null?h:"",o=this.getAttribute("imgSrc"),l=this.getAttribute("reverse")!==null;this.shadowRoot.innerHTML=`
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
      justify-content: ${l?"end":"start"};
      flex-direction: ${l?"row-reverse":"row"};
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
      <img src="${o!=null?o:u(t)}" height="200px" width="200px" class="img" alt="${t} \uB85C\uACE0">
      <div class="column">
        <p class="name">${t}</p>
        <p class="summary">${r}</p>
        <p class="summary">${n}</p>
        <div class="skill">
          <p class="name">\uC5ED\uD560</p>
          <img class="img" src="${s(i)}" height="30px" width="30px" alt="${i} \uC544\uC774\uCF58">
        </div>
          <p><strong>${i}</strong></p>
          <ol>
            <slot></slot>
          </ol>
      </div>
    </article>
    `}};var c=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){var o;if(!this.shadowRoot)return;let t=(o=this.getAttribute("name"))!=null?o:"name \uC18D\uC131 \uC5C6\uC74C",i=Math.min(parseInt(this.getAttribute("level"))||0,5),r=this.getAttribute("period"),n="";for(let l=0;l<5;l++)l<i?n+='<div class="rectangle rectangle-color"></div>':n+='<div class="rectangle rectangle-border"></div>';this.shadowRoot.innerHTML=`
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
      ul {
        list-style: none;
        padding: 0;
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
        <img class="small-img" src="${s(t)}" height="30px" alt="${t}\uC544\uC774\uCF58"/>
        <p>${t}</p>
        <p class="left-margin period">${r?`${r} \uACBD\uB825`:""}</p>
        <p class="left-margin">${n}</p>
      </div>
      <div class="row">
        <img class="img" src="${s(t)}" height="50px" alt="${t}\uC544\uC774\uCF58"/>
        <ul>
          <slot></slot>
        </ul>
      </div>
    </article>
    `}};customElements.define("project-component",a);customElements.define("skill-component",c);window.addEventListener("scroll",function(){let e=document.getElementById("topButton");window.scrollY>100?(e.style.display="block",e.style.opacity="1"):(e.style.opacity="0",setTimeout(()=>{window.scrollY<=100&&(e.style.display="none")},300))});document.getElementById("topButton").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});var x=document.getElementById("library"),d=document.getElementById("infoBox");x.addEventListener("mouseenter",function(e){let t=e.clientX,i=e.clientY;d.style.display="block",d.style.left=t,d.style.top=i});x.addEventListener("mouseleave",function(){d.style.display="none"});})();
/* This is a footer */
//# sourceMappingURL=bundle.js.map
