const posts = document.querySelector(".posts");
const buttons = document.querySelectorAll(".button");
const allPosts = [];




class Post {
  constructor(text, imgURL, likes, comments) {
    this.text = text;
    this.imgURL = imgURL;
    this.likes = likes;
    this.comments = comments;
  }
}

fetch("https://www.instagram.com/thingtesting/?__a=1")
.then(response => response.json())
.then((data) => {
  console.log(data);
  data.graphql.user.edge_owner_to_timeline_media.edges.forEach((edge) =>{
    let post = new Post(
      //returns text for all posts
      edge.node.edge_media_to_caption.edges[0].node.text,
      //returns image URL for all posts
      edge.node.display_url,
      //returns likes number for all posts
      edge.node.edge_liked_by.count,
      //returns comments number for all posts
      edge.node.edge_media_to_comment.count
      );
    allPosts.push(post);
  });
});


buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    console.log(e.toElement.innerText);
    posts.innerHTML = "";
    if(e.toElement.innerText === "All"){
      allPosts.forEach(post => {
        posts.insertAdjacentHTML('beforeEnd', `<h1>TEXT</h1><img src="${post.imgURL}"><p>${post.text}</p><p>${post.likes}</p><p>${post.comments}</p>`);
      });
    } else {
      let somePosts = allPosts.filter(element => element.text.includes(e.toElement.innerText));
      somePosts.forEach(post => {
        posts.insertAdjacentHTML('beforeEnd', `<h1>TEXT</h1><img src="${post.imgURL}"><p>${post.text}</p><p>${post.likes}</p><p>${post.comments}</p>`);
      });
    };
  });
});
