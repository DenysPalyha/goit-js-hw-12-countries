const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchCountries(searchQuery) {
    const countriesName = `${searchQuery}`;
    return fetch(baseUrl + countriesName).then(response => response.json());
  },
};
