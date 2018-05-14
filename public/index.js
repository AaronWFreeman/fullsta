// const getApiUrl = `http://localhost:8080/api/blogposts/`;
// const postApiUrl = ""
// const putApiUrl = ""
//

function findOutIfItWorks() {
  console.log('hey buddy');
}


function doingTheThing() {
    return fetch('http://localhost:8080/api/blogposts/', {
        method: 'GET',
        headers: {"Accept": "application/json"},
        mode: 'cors'
      }).then((response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          return response.json();
          console.log('Word up');
      // }).then((data) => {
      //   // data.forEach( (doclog, index) => {
      //   //   doclog.log_id = 'index-' + index.toString();
      //   // });
      //   commit('blogData', data);
      // })
        // .catch(function(err) {
        // console.log(`error: ${err}`);
        // return err;
        // });
      })
    }

$(doingTheThing);
