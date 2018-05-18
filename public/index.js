const url = 'http://localhost:8080/api/blogposts/';
let STORE = [];
// let blogId;

function postDataToApi(newContent, callback) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(newContent),
    success: callback,
    headers: {'Content-Type':'application/json'}
  });
}

function deleteBlogPosts(id, callback) {
  $.ajax({
      type: "DELETE",
      url: url + id,
      success: callback,
      headers: {'Content-Type':'application/json'}
  });
}

function updateBlogPost(blogId, newContent, callback) {
  $.ajax({
    type: "PUT",
    url: url + blogId,
    data: JSON.stringify(newContent),
    success: callback,
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'}
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

function storeBlogPostData(data) {
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
    let content = STORE[i].content;
    let topic = STORE[i].topic;
    let id = STORE[i]._id;
    let liTag = `<li id=${id}>${title}<br>${content}<br>${topic}</li>
                 <button class="deletePost" id="${id}">Delete</button>
                 <button class="updatePost" id=${id}>Update</button>`
    $('.blogObj').append(liTag);
  }
  watchUpdateClick();
  watchDeleteClick();
}

function watchPostSubmit() {
  $('.postForm').submit(function(event) {
    event.preventDefault();
    // let blogId = event.target.id;
    // console.log('from watchSubmit', typeof blogId);
    let title = $(".postTitle").val();
    let content = $(".postContent").val();
    let topic = $(".postTopic").val();
    let newContent = {
      title,
      content,
      topic
    }
    console.log(newContent);
    postDataToApi(newContent, postCallback);
  });
}

function watchUpdateClick() {
  $('.updatePost').on('click', function(event) {
    event.preventDefault();
    let postId = event.target.id;
    let form = document.querySelector('.updatedPostForm');
    form.id = postId;
    console.log('button works', postId);
    $('.updatedPostForm').removeClass('hidden');
  });
}

function watchFormSubmit() {
  $('.updatedPostForm').submit(function(event) {
    event.preventDefault();
    let blogId = event.target.id;
    console.log('from watchSubmit', typeof blogId);
    let title = $(".title").val();
    let content = $(".content").val();
    let topic = $(".topic").val();
    let newContent = {
      title,
      content,
      topic
    }
    $('.updatedPostForm').addClass('hidden');
    updateBlogPost(blogId, newContent, putCallback);
  });
}

function watchDeleteClick() {
  $('.deletePost').on('click', function(event) {
    event.preventDefault();
    let id = event.target.id;
    console.log(id);
    deleteBlogPosts(id, deleteCallback);
    $(this).closest('li').remove();
  })
}

function postCallback(response) {
  location.reload();
  console.log(response, 'post response');
}

function putCallback(response) {
  location.reload();
  console.log(response, 'I think this is working.');
}

function deleteCallback(response) {
  location.reload();
  console.log(response, 'Deleted');
}

$(watchPostSubmit);
$(watchDeleteClick);
$(watchUpdateClick);
$(watchFormSubmit);
$(getBlogPosts(storeBlogPostData));
