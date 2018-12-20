export default (url, options, onSuccess, onFailure) => {
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw await response.text();
      }
    })
    .then(json => onSuccess && onSuccess(json))
    .catch(error => onFailure && onFailure(error));
};
