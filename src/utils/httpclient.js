export default (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          response.text().then(error => {
            throw error;
          });
        }
      })
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};
