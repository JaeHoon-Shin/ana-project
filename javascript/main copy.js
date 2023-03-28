fetch("./test/data.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    init(data)
  })


function init(data) {
  const dataArray = Object.entries(data)
  //수정 //
  let category = ['전체'];

  const locationName = document.querySelector('.location-name'),
    buttons = document.querySelector('.buttons'),
    locationContents = document.querySelector(".content-box .contents"),
    numOfContent = dataArray.length,
    showContent = 4,
    showButton = 5,
    maxPage = Math.ceil(numOfContent / showContent);
  let page = 1;
  let categoryPage = '전체';
  //지역 리스트//
  window.addEventListener('load', () => {
    dataArray.forEach(function (el, key) {
      if (!category.includes(el[1].category)) {
        category.push(el[1].category)
      }

    });
    category.forEach(function (el, key) {
      if (key == 0) {
        locationName.innerHTML += `<button class = "${el} on" > ${el}</button>`
      } else {
        locationName.innerHTML += `<button class = ${el}> ${el}</button>`
      }
    });
  })

  const makeContent = (id) => {
    const content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = `<a href="./pages/location.html?local=location${id}" class="spot${id}">
      <img class="front-img" src="${(dataArray[id - 1][1].img[0].url)}" alt="">
      <img class="front-map" src="${(dataArray[id - 1][1].img[1].url)}" alt="">
      <div class="location-text-box">
          <h3>${(dataArray[id - 1][1].category)}</h3>
          <span>${(dataArray[id - 1][1].place)}</span>
      </div>
      </a>
      `;
    return content;
  };

  const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
      Array.prototype.forEach.call(buttons.children, (button) => {
        if (button.dataset.num) button.classList.remove("active");
      });
      e.target.classList.add("active");
      renderContent(parseInt(e.target.dataset.num), 'ALL');
    });
    return button;
  };


  const renderContent = (page) => {
    // 목록 리스트 초기화
    while (locationContents.hasChildNodes()) {
      locationContents.removeChild(locationContents.lastChild);
    }
    // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    for (let id = (page - 1) * showContent + 1; id <= page * showContent && id <= numOfContent; id++) {
      locationContents.appendChild(makeContent(id));
    }
  };
  const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
      buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    for (let id = page; id < page + showButton && id <= maxPage; id++) {
      buttons.appendChild(makeButton(id));
    }
    // 첫 버튼 활성화(class="active")
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
    prev.innerHTML = '<div><img src = "./img/com/leftArrow.svg"></div>';
    prev.addEventListener("click", goPrevPage);

    const next = document.createElement("button");
    next.classList.add("button", "next");
    next.innerHTML = '<div><img src = "./img/com/rightArrow.svg"></div>';
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

  // 지역 버튼을 누르면 해당 지역만 페이지 나오게
  window.onload = ()=>{
  const locationBtn = document.querySelectorAll('.location-name > button');
  let btnIdx = 0;
  locationBtn.forEach((el, key) => {
    el.addEventListener('click', () => {
      buttons.classList.add('on'); // 버튼 안보이게 하기 
      locationBtn[btnIdx].classList.remove('on');
      el.classList.add('on');
      btnIdx = key;
      while (locationContents.hasChildNodes()) {
        locationContents.removeChild(locationContents.lastChild);
      }
      let count = 0;
      let locationKey = [];
      categoryPage = el.className.split(" ");
      dataArray.forEach((el, key) => {
        if (el[1].category == categoryPage[0]) {
          locationKey.push(key)
          count++;
        }
      })
      
      // 지역 버튼이 전체이면 페이지 전체 보이고 버튼 보이게
      if (categoryPage[0] == '전체') {
        buttons.classList.remove('on');
        render(page);
      }
      // 해당 지역 컨텐츠만 나오게
      else {
        for (let i = 0; i < count; i++) {
          
          const content = document.createElement("div");
          content.classList.add("content");
          
          content.innerHTML = `<a href="./pages/location.html?local=location${locationKey[i]+1}}" class="">
      <img class="front-img" src="${(dataArray[locationKey[i]][1].img[0].url)}" alt="">
      <img class="front-map" src="${(dataArray[locationKey[i]][1].img[1].url)}" alt="">
      <div class="location-text-box">
      <h3>${(dataArray[locationKey[i]][1].category)}</h3>
      <span>${(dataArray[locationKey[i]][1].place)}</span>
      </div>
      </a>
      `;
      locationContents.appendChild(content)
        }
      }
    })
  })
}

}
