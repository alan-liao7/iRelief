const apiKey = "AIzaSyCRLZPGZw4nSb2tUbJjHcygZxNtDXjMhr8";

export function find(term) {
  let url = `http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=${term}`;

  fetch(url);
}
