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
