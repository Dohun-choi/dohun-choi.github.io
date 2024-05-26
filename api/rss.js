// 내 블로그 최신글 가져오기
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
export const latestPostEventListener = async () => {
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
};
