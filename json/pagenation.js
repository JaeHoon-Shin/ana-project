const data = [
  {
    area: "spot01",
    img: "./img/01.jpg",
  },
  {
    area: "spot02",
    img: "./img/02.jpg",
  },
  {
    area: "spot03",
    img: "./img/03.jpg",
  },
  {
    area: "spot04",
    img: "./img/04.jpg",
  },
  {
    area: "spot05",
    img: "./img/05.jpg",
  },
  {
    area: "spot06",
    img: "./img/06.jpg",
  },
  {
    area: "spot07",
    img: "./img/07.jpg",
  },
  {
    area: "spot08",
    img: "./img/08.jpg",
  },
  {
    area: "spot09",
    img: "./img/09.jpg",
  },
  {
    area: "spot10",
    img: "./img/10.jpg",
  },
];

// console.log(data);

const contents = document.querySelector(".contents"),
  buttons = document.querySelector(".buttons");
const numOfContent = data.length,
  showContent = 3,
  showButton = 3,
  maxPage = Math.ceil(numOfContent / showContent);
let page = 1;

const makeContent = (id) => {
  //   console.log(id);
  const content = document.createElement("li");
  //   console.log(data);
  content.classList.add("content");
  content.innerHTML = `<img src="${data[id - 1].img
    }" alt="" class="content_img">
                        <span class="content_title">${data[id - 1].area}</span>
        `;
  return content;
};
const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    data.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

// console.log(contents.hasChildNodes());

const renderContent = (page) => {
  //목록 리스트 초기화
  while (contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }

  // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 showContent 만큼의 글 생성
  for (
    let id = (page - 1) * showContent + 1;
    id <= page * showContent && id <= numOfContent;
    id++
  ) {
    contents.appendChild(makeContent(id));
  }
};

const renderButton = (page) => {
  // 버튼 리스트 초기화
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  // 화면에 최대 showButton의 페이지 버튼 생성
  for (let id = page; id < page + showButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  // 첫 버튼 활성화 (class = "active")
  buttons.children[0].classList.add("active");

  const goPrevPage = () => {
    page -= showButton;
    render(page);
  };

  const goNextPage = () => {
    page += showButton;
    render(page);
  };

  const prev = document.createElement("button");
  prev.classList.add("button", "prev");
  prev.innerHTML =
    '<img src="./assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz24.svg" alt="" />';
  prev.addEventListener("click", goPrevPage);

  const next = document.createElement("button");
  next.classList.add("button", "next");
  next.innerHTML =
    '<img src="./assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz24.svg" alt="" />';
  next.addEventListener("click", goNextPage);

  buttons.prepend(prev);
  buttons.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - showButton < 1) buttons.removeChild(prev);
  if (page + showButton > maxPage) buttons.removeChild(next);
};

const render = (page) => {
  renderContent(page);
  renderButton(page);
};

render(page);
