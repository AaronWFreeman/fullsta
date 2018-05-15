const postApiUrl = `http://localhost:8080/api/blogposts/`;

let blogPostId = [];

function getDataFromApi(callback) {
  $.ajax({
  type: "POST",
  url: postApiUrl,
  data: JSON.stringify(),
  success: callback,
  dataType: 'application/json'
  });
}

function storeBlogPostData(data) {
  let data = blogPostId[0];
}

function showBlogPost(data) {
  console.log(data);
  storeBlogPostData(data);
}

function findOutIfItWorks() {
  console.log('hey buddy');
  getDataFromApi(showBlogPost);
}

$(findOutIfItWorks);
