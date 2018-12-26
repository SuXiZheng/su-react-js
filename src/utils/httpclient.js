export default (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.text();
        }
      })
      .then(json => resolve(json))
      .catch(error => {
        if (typeof error === "function") {
          error.then(errorMessage => {
            reject(errorMessage);
          });
        }
      });
  });
};
