(()=>{var m=(t,e,o)=>new Promise((i,n)=>{var s=l=>{try{a(o.next(l))}catch(c){n(c)}},r=l=>{try{a(o.throw(l))}catch(c){n(c)}},a=l=>l.done?i(l.value):Promise.resolve(l.value).then(s,r);a((o=o.apply(t,e)).next())});function w(){return m(this,null,function*(){return fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcurt-poem.tistory.com%2Frss").then(t=>m(this,null,function*(){if(!t.ok)throw new Error(t.status);return(yield t.json()).items.splice(0,3)})).then(t=>{let e=[];for(let o=0;o<t.length;o++){let i=t[o],n=i.title;n+=` - ${i.pubDate.split(" ")[0]}`;let s=i.link;e.push({title:n,link:s})}return e}).catch(t=>{throw t})})}var f=()=>m(void 0,null,function*(){let t=document.getElementById("postList"),e=document.createElement("div");e.id="loadingSpinner",e.classList.add("spinner"),t.appendChild(e);let o=document.createElement("p");o.textContent="RSS \uD53C\uB4DC\uB97C \uD1B5\uD574 \uBE14\uB85C\uADF8 \uCD5C\uC2E0 \uAE00\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4.",t.appendChild(o);try{(yield w()).forEach(n=>{let s=document.createElement("li"),r=document.createElement("a");r.href=n.link,r.textContent=n.title,r.classList.add("blog-post-item"),s.appendChild(r),t.appendChild(s)})}catch(i){console.error("\uCD5C\uC2E0 \uAE00\uC744 \uAC00\uC838\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",i);let n=document.createElement("li");i.message==429?n.innerHTML='RSS GET \uC694\uCCAD \uC81C\uD55C \uB3C4\uB2EC: \uD55C \uC2DC\uAC04 \uB4A4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098 <a href="https://curt-poem.tistory.com/">\uBE14\uB85C\uADF8\uB97C \uC9C1\uC811 \uBC29\uBB38</a>\uD574\uC8FC\uC138\uC694.':n.innerHTML='\uD604\uC7AC <a href="https://curt-poem.tistory.com/">\uBE14\uB85C\uADF8\uC758 \uCD5C\uC2E0 \uAE00</a>\uC744 \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',t.appendChild(n)}finally{t.removeChild(e),t.removeChild(o)}});var d=t=>`./images/skills/${t.replace(/\s+/g,"")}.svg`,y=t=>`./images/projects/${t.replace(/\s+/g,"")}.webp`;var p=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){var a,l,c,u;if(!this.shadowRoot)return;let e=(a=this.getAttribute("name"))!=null?a:"name \uC18D\uC131\uC774 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",o=(l=this.getAttribute("skill"))!=null?l:"skill \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",i=(c=this.getAttribute("projectSummary"))!=null?c:"projectSummary \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",n=(u=this.getAttribute("projectDescription"))!=null?u:"",s=this.getAttribute("imgSrc"),r=this.getAttribute("reverse")!==null;this.shadowRoot.innerHTML=`
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
      justify-content: ${r?"end":"start"};
      flex-direction: ${r?"row-reverse":"row"};
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
      <img src="${s!=null?s:y(e)}" height="200px" width="200px" class="img" alt="${e} \uB85C\uACE0">
      <div class="column">
        <p class="name">${e}</p>
        <p class="summary">${i}</p>
        <p class="summary">${n}</p>
        <div class="skill">
          <p class="name">\uC5ED\uD560</p>
          <img class="img" src="${d(o)}" height="30px" width="30px" alt="${o} \uC544\uC774\uCF58">
        </div>
          <p><strong>${o}</strong></p>
          <ol>
            <slot></slot>
          </ol>
      </div>
    </article>
    `}};var g=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){var s;if(!this.shadowRoot)return;let e=(s=this.getAttribute("name"))!=null?s:"name \uC18D\uC131 \uC5C6\uC74C",o=Math.min(parseInt(this.getAttribute("level"))||0,5),i=this.getAttribute("period"),n="";for(let r=0;r<5;r++)r<o?n+='<div class="rectangle rectangle-color"></div>':n+='<div class="rectangle rectangle-border"></div>';this.shadowRoot.innerHTML=`
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
        <img class="small-img" src="${d(e)}" height="30px" alt="${e}\uC544\uC774\uCF58"/>
        <p>${e}</p>
        <p class="left-margin period">${i?`${i} \uACBD\uB825`:""}</p>
        <p class="left-margin">${n}</p>
      </div>
      <div class="row">
        <img class="img" src="${d(e)}" height="50px" alt="${e}\uC544\uC774\uCF58"/>
        <ul>
          <slot></slot>
        </ul>
      </div>
    </article>
    `}};customElements.define("project-component",p);customElements.define("skill-component",g);window.addEventListener("load",f);window.addEventListener("scroll",function(){let t=document.getElementById("topButton");window.scrollY>100?(t.style.display="block",t.style.opacity="1"):(t.style.opacity="0",setTimeout(()=>{window.scrollY<=100&&(t.style.display="none")},300))});document.getElementById("topButton").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});var x=document.getElementById("library"),h=document.getElementById("infoBox");x.addEventListener("mouseenter",function(t){let e=t.clientX,o=t.clientY;h.style.display="block",h.style.left=e,h.style.top=o});x.addEventListener("mouseleave",function(){h.style.display="none"});})();
/* https://github.com/Dohun-choi */
//# sourceMappingURL=bundle.js.map
