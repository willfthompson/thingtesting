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
    if(e.toElement.innerText === "All"){
      posts.insertAdjacentHTML('beforeEnd', `<h1>TEXT</h1>`);
    } else {
      console.log(allPosts.filter(element => element.text.includes(e.toElement.innerText)));
    }
  });
});
