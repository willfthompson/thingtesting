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

//manually creating a POST since IG kicked me out....

let post = new Post(
  `What brand has the best unboxing experience? 🎁 Comment yours below ↓⁣
  Like everything in our pandemic-hit world, Christmas is going to look a little different this year. To limit face-to-face interactions, many presents are likely to be shipped directly to the recipient’s door. On the big day itself, we may find our social feeds flooded with unboxing videos, as the experience of opening a gift in front of a friend or family member goes digital, too. ⁣
  ⁣Brands are now launching personalised hand-written gift notes, extra stocking stuffers, and limited-editions among many other things. We interviewed founders at @get.canopy @drinkhaus @snif.co as well as Jenna Navitsky from @redantler and Stephan Ango from @lumi to hear their thoughts on best in class festive unboxings. → www.thingtesting.com/stories for their thoughts⁣
  ⁣↓ What brand has in your opinion created the best unboxing experience? ↓ 👀`,
  "https://media.voguebusiness.com/photos/5d88f2cc9eed020009993fb0/16:9/w_1920,c_limit/hashtag-authentic-voguebus-credit-Thingtesting-sep-19-article.jpg",
  373,
  120
  );
allPosts.push(post);

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
        posts.insertAdjacentHTML('beforeEnd', `<img src="${post.imgURL}"><p>${post.text}</p><div class="nums"><p>${post.likes}</p><p>${post.comments}</p></div>`);
      });
    } else {
      let somePosts = allPosts.filter(element => element.text.includes(e.toElement.innerText));
      somePosts.forEach(post => {
        posts.insertAdjacentHTML('beforeEnd', `<img src="${post.imgURL}"><p>${post.text}</p><div class="nums"><p>${post.likes}</p><p>${post.comments}</p></div>`);
      });
    };
  });
});
