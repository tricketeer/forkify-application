import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupButton(buttonType, direction, curPage) {
    const btnIconMarkup = `
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
      </svg>`;
    return `
      ${
        buttonType === 'prev'
          ? `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--${buttonType}">
            ${btnIconMarkup}
            <span>Page ${curPage - 1}</span>
          </button>`
          : `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--${buttonType}">
            <span>Page ${curPage + 1}</span>
            ${btnIconMarkup}
          </button>`
      }`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton('next', 'right', curPage);
    // Last page
    if (curPage === numPages)
      return this._generateMarkupButton('prev', 'left', curPage);
    // Other page
    if (curPage < numPages)
      return `${this._generateMarkupButton(
        'prev',
        'left',
        curPage
      )} ${this._generateMarkupButton('next', 'right', curPage)}`;
    // Page 1, and there are NO other page
    return ``;
  }
}

export default new PaginationView();
