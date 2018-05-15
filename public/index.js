const url = 'http://localhost:8080/api/blogposts/';
let STORE = [];

function postDataToApi(callback) {
  let blogContent = {
	"title": "fud",
	"content": "bbbbbbbbbb",
	"topic": "frack"
};
  $.ajax({
  type: "POST",
  url: url,
  data: JSON.stringify(blogContent),
  success: callback,
  headers: {'Content-Type':'application/json'}
  });
}

function getBlogPosts(callback) {
  $.ajax({
  type: "GET",
  url: url,
  success: callback,
  headers: {'Content-Type':'application/json'}
  });
}

function updateBlogPosts(callback) {
  $.ajax({
    type: "PUT",
    url: url,
    success: callback,
    headers: {'Content-Type':'application/json'}
  });
}

function updateBlogPosts(callback) {
  let updatedContent = {
    "title": "Whales That Read",
    "content": "Is there really content?",
    "topic": "Marine Literacy"
  };
  $.ajax({
    type: "DELETE",
    url: url,
    data: JSON.stringify(updatedContent),
    success: callback,
    headers: {'Content-Type':'application/json'}
  });
}

function storeBlogPostData(data) {
  // STORE.push(data);
  STORE = data;
  renderBlogPosts();
}

function showBlogPost(data) {
  storeBlogPostData(data);
}

function renderBlogPosts() {
  // need some jQuery to render stuff by appending <li> to your <ul>
  // in the html
  for (let i = 0; i < STORE.length; i++) {
    let title = STORE[i].title;
    let id = STORE[i]._id;
    let liTag = `<li id=${id}>${title}</li>
                 <button class="deletePost">Delete</button>
                 <button class='updatePost'>Update</button>`
    $('.blogObj').append(liTag);
  }
  console.log(STORE);
}

function watchUpdateClick() {
  $('.updatePost').on('click', function(event) {
    event.preventDefault();
    updateBlogPosts(storeBlogPostData);
    console.log("this button works");
  })
}


// function findOutIfItWorks() {
//   console.log('hey buddy');
//   postDataToApi(showBlogPost);
//   getDataFromApi(showBlogPost);
// }

$(getBlogPosts(storeBlogPostData));
