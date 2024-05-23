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
    const posts = await fetchLatestPosts();

    // 로딩 스피너 삭제
    postListElement.removeChild(loadingSpinner);
    postListElement.removeChild(loadingMessage);

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
      errorMessage.textContent =
        "RSS GET 요청 제한 도달: 내일 다시 시도하거나 블로그를 직접 방문해주세요.";
    } else {
      errorMessage.textContent = "현재 블로그의 최신 글을 가져올 수 없습니다.";
    }
    postListElement.appendChild(errorMessage);
  }
});
