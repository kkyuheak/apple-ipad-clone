// 장바구니

const basketStarterEl = document.querySelector(".basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

const showBasket = () => {
  basketEl.classList.add("show");
};

const hideBasket = () => {
  basketEl.classList.remove("show");
};

basketStarterEl.addEventListener("click", (e) => {
  e.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  hideBasket();
});

// 검색

const headerEl = document.querySelector("header");
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");

const showSearch = () => {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
};

const hideSearch = () => {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
};

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);
