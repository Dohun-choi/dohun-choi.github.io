(()=>{async function b(){return fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcurt-poem.tistory.com%2Frss").then(async t=>{if(!t.ok)throw new Error(t.status);return(await t.json()).items.splice(0,3)}).then(t=>{let e=[];for(let n=0;n<t.length;n++){let s=t[n],o=s.title;o+=" - ".concat(s.pubDate.split(" ")[0]);let i=s.link;e.push({title:o,link:i})}return e}).catch(t=>{throw t})}var f=async()=>{let t=document.getElementById("postList"),e=document.createElement("div");e.id="loadingSpinner",e.classList.add("spinner"),t.appendChild(e);let n=document.createElement("p");n.textContent="RSS \uD53C\uB4DC\uB97C \uD1B5\uD574 \uBE14\uB85C\uADF8 \uCD5C\uC2E0 \uAE00\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4.",t.appendChild(n);try{(await b()).forEach(o=>{let i=document.createElement("li"),r=document.createElement("a");r.href=o.link,r.textContent=o.title,r.classList.add("blog-post-item"),i.appendChild(r),t.appendChild(i)})}catch(s){console.error("\uCD5C\uC2E0 \uAE00\uC744 \uAC00\uC838\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",s);let o=document.createElement("li");s.message==429?o.innerHTML='RSS GET \uC694\uCCAD \uC81C\uD55C \uB3C4\uB2EC: \uD55C \uC2DC\uAC04 \uB4A4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098 <a href="https://curt-poem.tistory.com/">\uBE14\uB85C\uADF8\uB97C \uC9C1\uC811 \uBC29\uBB38</a>\uD574\uC8FC\uC138\uC694.':o.innerHTML='\uD604\uC7AC <a href="https://curt-poem.tistory.com/">\uBE14\uB85C\uADF8\uC758 \uCD5C\uC2E0 \uAE00</a>\uC744 \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',t.appendChild(o)}finally{t.removeChild(e),t.removeChild(n)}};var l=t=>"./images/skills/".concat(t.replace(/\s+/g,""),".svg"),y=t=>"./images/projects/".concat(t.replace(/\s+/g,""),".webp");var a=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){var p,m,g,h,u;if(!this.shadowRoot)return;let e=(p=this.getAttribute("name"))!=null?p:"name \uC18D\uC131\uC774 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",n=(m=this.getAttribute("skill"))!=null?m:"skill \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",s=(g=this.getAttribute("projectSummary"))!=null?g:"projectSummary \uC18D\uC131 \uC9C0\uC815\uB418\uC9C0 \uC54A\uC74C",o=(h=this.getAttribute("projectDescription"))!=null?h:"",i=this.getAttribute("imgSrc"),r=(u=this.getAttribute("projectUrl"))!=null?u:null;this.shadowRoot.innerHTML='\n    <style>\n    :host {\n      width: 100%;\n    }\n    * {\n      box-sizing: border-box;\n      margin: 0px;\n      padding: 0px;\n    }\n    .container {\n      display: flex;\n      border: 1px solid #ddd;\n      border-radius: 10px;\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n      padding: 16px;\n      margin-bottom: 20px;\n      transition: transform 0.3s ease;\n    }\n    .container:hover {\n      transform: scale(1.05);\n    }\n    @media (max-width: 1000px) {\n      .container {\n        display: flex;\n        flex-direction: column;\n      }\n    }\n    .column {\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n    .column > p {\n      margin: 0px\n    }\n    .skill {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n    }\n    .img {\n      align-self: center;\n      object-fit: contain;\n      margin-left: 5px;\n      margin-right: 10px;\n      border-radius: 30px;\n      overflow: hidden;\n    }\n    .name {\n      font-weight: bold;\n      font-size: 1.2rem;\n    }\n    .summary {\n      padding-bottom: 5px;\n    }\n    ol {\n      padding: 0px;\n      list-style-type: none;\n      counter-reset: counter;\n    }\n    ::slotted(li) {\n      counter-increment: counter;\n    }\n    ::slotted(li)::before {\n      content: counter(counter) ".";\n      color: black;\n      display: inline-block;\n      width: 1.1rem;\n    }\n    a {\n      text-decoration: none;\n      color: inherit;\n    }\n    </style>\n\n  <!--\n  rel="noopener noreferrer"\uC740 Tabnabbing \uACF5\uACA9 \uBC29\uC5B4\uB97C \uC704\uD568\n  \uC0C8 \uD0ED\uC774 \uC6D0\uB798 \uD0ED\uC758 window.opener \uAC1D\uCCB4\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uAC8C \uB9CC\uB4EC\n  -->\n  <a href="'.concat(r,'" target="_blank" rel="noopener noreferrer">\n    <article class="container">\n      <img src="').concat(i!=null?i:y(e),'" height="200px" width="200px" class="img" loading="lazy" alt="').concat(e,' \uB85C\uACE0">\n      <div class="column">\n        <p class="name">').concat(e,'</p>\n        <p class="summary">').concat(s,'</p>\n        <p class="summary">').concat(o,'</p>\n        <div class="skill">\n          <p class="name">\uC5ED\uD560</p>\n          <img class="img" src="').concat(l(n),'" height="30px" width="30px" loading="lazy" alt="').concat(n,' \uC544\uC774\uCF58">\n        </div>\n          <p><strong>').concat(n,"</strong></p>\n          <ol>\n            <slot></slot>\n          </ol>\n      </div>\n    </article>\n  </a>\n    ")}};var c=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){var i;if(!this.shadowRoot)return;let e=(i=this.getAttribute("name"))!=null?i:"name \uC18D\uC131 \uC5C6\uC74C",n=Math.min(parseInt(this.getAttribute("level"))||0,5),s=this.getAttribute("period"),o="";for(let r=0;r<5;r++)r<n?o+='<div class="rectangle rectangle-color"></div>':o+='<div class="rectangle rectangle-border"></div>';this.shadowRoot.innerHTML='\n    <style>\n      * {\n        box-sizing: border-box;\n        margin: 0px;\n        padding: 0px;\n      }\n      .row {\n        display: flex;\n        flex-direction: row;\n      }\n      .container {\n        font-weight: bold;\n        align-items: center;\n        padding-top: 16px;\n        padding-bottom: 16px;\n      }\n      .period {\n        font-weight: normal\n      }\n      .left-margin {\n        margin-left: 10px;\n      }\n      .small-img {\n        display: none;\n      }\n      @media (max-width: 400px) {\n        .small-img {\n          display: block;\n          margin-right: 5px\n        }\n      }\n      .img {\n        margin-right: 10px\n      }\n      @media (max-width: 400px) {\n        .img {\n          display: none;\n        }\n      }\n      .rectangle {\n        width: 20px;\n        height: 20px;\n        margin-right: 5px;\n        display: flex;\n      }\n      .rectangle-color {\n        background-color: #1263CE;\n      }\n      .rectangle-border {\n        border: 1px black solid;\n      }\n      ul {\n        list-style: none;\n      }\n      ::slotted(li) {\n        list-style-type: none;\n        overflow-wrap: break-word;\n        white-space: wrap;\n      }\n      ::slotted(li)::before {\n        content: "\u25BA";\n        color: black;\n        display: inline-block;\n        width: 1rem;\n      }\n    </style>\n    <article>\n      <div class="row container">\n        <img class="small-img" src="'.concat(l(e),'" height="30px" loading="lazy" alt="').concat(e,'\uC544\uC774\uCF58"/>\n        <p>').concat(e,'</p>\n        <p class="left-margin period">').concat(s?"".concat(s," \uACBD\uB825"):"",'</p>\n        <p class="left-margin">').concat(o,'</p>\n      </div>\n      <div class="row">\n        <img class="img" src="').concat(l(e),'" height="50px" loading="lazy" alt="').concat(e,'\uC544\uC774\uCF58"/>\n        <ul>\n          <slot></slot>\n        </ul>\n      </div>\n    </article>\n    ')}};customElements.define("project-component",a);customElements.define("skill-component",c);window.addEventListener("load",f);window.addEventListener("scroll",function(){w(),v()});function w(){let t=document.getElementById("topButton");window.scrollY>100?(t.style.display="block",t.style.opacity="1"):(t.style.opacity="0",setTimeout(()=>{window.scrollY<=100&&(t.style.display="none")},300))}function v(){let t=window.scrollY+1,e={home:document.getElementById("home"),skills:document.getElementById("skills"),project:document.getElementById("project"),contact:document.getElementById("contact")},n=null;for(let o in e)if(t>=e[o].offsetTop&&t<e[o].offsetTop+e[o].offsetHeight/3){n=o;break}if(!n)return;document.querySelectorAll(".nav-ul li a").forEach(function(o){let i=o.getAttribute("href").substring(1);i===n?o.classList.add("active"):o.classList.remove("active")})}document.getElementById("topButton").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});var x=document.getElementById("library"),d=document.getElementById("infoBox");x.addEventListener("mouseenter",function(t){let e=t.clientX,n=t.clientY;d.style.display="block",d.style.left=e,d.style.top=n});x.addEventListener("mouseleave",function(){d.style.display="none"});})();
/* https://github.com/Dohun-choi */
