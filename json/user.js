const userId = document.querySelector(".useridgo"),
  userPass = document.querySelector(".password"),
  userSignup = document.querySelector(".signup");

window.addEventListener("submit", () => {
  console.log(userId.value);
  console.log(userPass.value);

  //   if (userId.value && userPass.value) {
  //     localStorage.setItem(userId.value, userPass.value);
  //   }
  //   //   localStorage.setItem(userPass, userPass.value);
  //   console.log("aaa");

  const loginId = document.querySelector("#userIdtxt"),
    loginPass = document.querySelector("#userPasswordtxt"),
    login = document.querySelector("login");

  console.log(loginId.value, "loginId.value");
  console.log(localStorage.getItem(loginId.value), "userId.value");
  console.log(loginPass.value, "loginPass.value");
  console.log(userPass.getItem, "userPass.value");

  if (loginId.value == localStorage.getItem(loginId.value)) {
    alert("같은 아이디입니다.");
  } else {
    alert("아이디를 확인해주세요");
  }
  //   if (loginId.value == userId.value && loginPass == userPass) {
  //     alert("로그인 되었습니다.");
  //   } else {
  //     alert("ID와 PASSWORD를 확인해주세요.");
  //   }
});

// console.log(localStorage.getItem("first"));
