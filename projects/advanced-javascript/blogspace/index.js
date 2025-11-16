fetch(`https://jsonplaceholder.typicode.com/posts`, { method: "GET" }).then(
  (response) =>
    response.json().then((data) => {
      const postsArr = data.slice(0, 5);

      const postContainer = document.querySelector("#blog-list");

      // display title and body of posts objects
      postsArr.forEach((post) => {
        // create elements for each post
        const postDiv = document.createElement("div");

        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title;
        const contentElement = document.createElement("p");
        contentElement.textContent = post.body;

        // append element to post div
        postDiv.appendChild(titleElement);
        postDiv.appendChild(contentElement);

        postContainer.appendChild(postDiv);
      });

      console.log(postsArr);
    }),
);
