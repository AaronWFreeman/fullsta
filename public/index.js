const postApiUrl = 'http://localhost:8080/api/blogposts/';
const getApiUrl = 'http://localhost:8080/api/blogposts/';


const STORE = [];

function postDataToApi(callback) {
  let blogContent = {
	"title": "fud",
	"content": "bbbbbbbbbb",
	"topic": "frack"
};
  $.ajax({
  type: "POST",
  url: postApiUrl,
  data: JSON.stringify(blogContent),
  success: callback,
  headers: {'Content-Type':'application/json'}
  });
}
//
function getDataFromApi(callback) {
  $.ajax({
  type: "GET",
  url: getApiUrl,
  success: callback,
  headers: {'Content-Type':'application/json'}
  });
}


function storeBlogPostData(data) {
  STORE.push(data);
  // console.log(blogPostId);
  console.log(STORE);
}

function showBlogPost(data) {
  storeBlogPostData(data);
}

function findOutIfItWorks() {
  console.log('hey buddy');
  postDataToApi(showBlogPost);
  // getDataFromApi(showBlogPost);
}

$(findOutIfItWorks);
