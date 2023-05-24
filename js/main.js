import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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
const headerMenuEls = [...document.querySelectorAll(".menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEl = [...searchWrapEl.querySelectorAll("li")];

const showSearch = () => {
  headerEl.classList.add("searching");
  stopScroll();
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
};

const hideSearch = () => {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEl.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEl.length + "s";
  });
  searchDelayEl.reverse();
  searchInputEl.value = "";
};

const playScroll = () => {
  document.documentElement.classList.remove("fixed");
};

const stopScroll = () => {
  document.documentElement.classList.add("fixed");
};

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", (e) => {
  e.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

// 모바일 header menu click
const menuStartEl = document.querySelector("header .menu-starter");
menuStartEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 최적회
window.addEventListener("resize", () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

//모바일 헤더 검색 , 취소 버튼 클릭
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");

searchTextFieldEl.addEventListener("click", () => {
  headerEl.classList.add("searching--mobile");
  // searchInputEl.focus();
});

searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
  searchInputEl.value = "";
});

// 모바일 nav 토글 버튼
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

navShadowEl.addEventListener("click", () => {
  hideNavMenu();
});

window.addEventListener("click", () => {
  hideNavMenu();
});

const showNavMenu = () => {
  navEl.classList.add("menuing");
};

const hideNavMenu = () => {
  navEl.classList.remove("menuing");
};

//요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      // entry.target.classList.remove("show");
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");

infoEls.forEach((el) => {
  io.observe(el);
});

const video = document.querySelector("video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// 당신에게 맞는 아이패드는 랜더링
const itemsEl = document.querySelector(".compare .items");
ipads.forEach((ipad) => {
  const itemEL = document.createElement("div");
  itemEL.classList.add("item");

  let colorList = "";

  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color:${color};"></li>`;
  });
  itemEL.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEL);
});

const navigationsEl = document.querySelector("footer .navigations");

navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="title">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector(".this-year");
thisYearEl.textContent = new Date().getFullYear();

const footerMapEls = document.querySelectorAll("footer .navigations .map");
footerMapEls.forEach((el) => {
  const footerh3El = el.querySelector("h3");
  footerh3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});
