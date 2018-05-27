const url = 'http://localhost:8080/api/blogposts/';
let STORE = [];

// POST API
function postDataToApi(newContent, callback) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(newContent),
    success: callback,
    headers: {'Content-Type':'application/json'}
  });
}

// DELETE API
function deleteBlogPosts(id, callback) {
  $.ajax({
      type: "DELETE",
      url: url + id,
      success: callback,
      headers: {'Content-Type':'application/json'}
  });
}

// PUT API
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

// GET API
function getBlogPosts(callback) {
  $.ajax({
    type: "GET",
    url: url,
    success: callback,
    headers: {'Content-Type':'application/json'}
  });
}

// Initial Callback function to getBlogPosts(), which stores all posts in STORE
// then calls renderBlogPosts() to render html to the DOM.
function storeBlogPostData(data) {
  STORE = data;
  renderBlogPosts();
}

function renderBlogPosts() {
  // Appending <li> to the <ul>
  for (let i = 0; i < STORE.length; i++) {
    let title = STORE[i].title;
    let content = STORE[i].content;
    let topic = STORE[i].topic;
    let id = STORE[i]._id;
    let liTag = `<li role="listItem" id=${id}>
                    <h1 class="newPostTitle">"${title}"</h1>
                    <h2 class="newPostTopic">Topic: ${topic}</h2>
                    <textarea type="text" role="textbox" class="renderedContent">${content}</textarea>
                 </li>
                 <button class="deletePost" id="${id}">Delete</button>
                 <button class="updatePost" id=${id}>Update</button>`
    $('.blogObj').append(liTag);
  }
  // Call the next two button options functions
  watchUpdateClick();
  watchDeleteClick();
}

// Form which calls the POST API once required fields are submitted.
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

// This is the first Update Click, which collects the ID from the Post & sends
// it to the update post form //
function watchUpdateClick() {
  $('.updatePost').on('click', function(event) {
    event.preventDefault();
    let postId = event.target.id;
    let form = document.querySelector('.updatedPostForm');
    form.id = postId;
    console.log('button works', postId);
    $('.updatedPostForm').removeClass('hidden');
    $('.postForm').addClass('hidden');
    $(window).scrollTop(0);
  });
}

// Update Post form: Title, Content or Topic of previous Post //
function watchFormSubmit() {
  $('.updatedPostForm').submit(function(event) {
    event.preventDefault();
    let blogId = event.target.id;
    console.log('from watchSubmit', typeof blogId);
    let title = $(".updatedTitle").val();
    let content = $(".updatedContent").val();
    let topic = $(".updatedTopic").val();
    let newContent = {
      title,
      content,
      topic
    }
    // $('.postForm').removeClass('hidden');
    updateBlogPost(blogId, newContent, putCallback);
    $('.updatedPostForm').addClass('hidden');
  });
}

// Button which calls the DELETE API
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
  getBlogPosts(storeBlogPostData);
  $('.postForm').addClass('hidden');
  console.log(response, 'post response');
}

function putCallback(response) {
  $('.blogObj').empty();
  getBlogPosts(storeBlogPostData);
  console.log(response, "Does this work?");
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
