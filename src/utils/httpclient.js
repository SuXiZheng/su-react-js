export default (url, options, onSuccess, onFailure) => {
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
    .then(json => onSuccess && onSuccess(json))
    .catch(error => onFailure && onFailure(error));
};
