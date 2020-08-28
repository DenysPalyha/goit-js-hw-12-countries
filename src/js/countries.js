import debounce from '../../node_modules/lodash.debounce';
import countriesSearch from './fetchCountries';
import listCountriesTamplates from '../templates/list-countries.hbs';
import oneCountriesTamplates from '../templates/one-countries.hbs';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

const refs = {
  inputRef: document.querySelector('#input-value'),
  countriesRef: document.querySelector('#countries-list'),
};

refs.inputRef.addEventListener('input', debounce(inputCountriesSearch, 500));

function inputCountriesSearch(e) {
  e.preventDefault();
  const searchInput = e.target.value;
  clearListCountri();
  countriesSearch
    .fetchCountries(searchInput)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (data.status === 404) {
        error({
          text:
            'No country has been found. Please enter a more specific query!',
        });
      }
      if (data.length <= 10) {
        const listMarkup = listCountriesTamplates(data);
        refs.countriesRef.insertAdjacentHTML('beforeend', listMarkup);
      }
      if (data.length === 1) {
        const oneMarkup = oneCountriesTamplates(data);
        refs.countriesRef.insertAdjacentHTML('beforeend', oneMarkup);
      }
    })
    .catch(Error => {
      console.log(Error);
    });
}

function clearListCountri() {
  refs.countriesRef.innerHTML = '';
}
