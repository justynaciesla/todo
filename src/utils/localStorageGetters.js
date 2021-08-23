// localStorage.setItem("test", "[1,2,3,4]");
// localStorage.setItem("token", "abc");
// localStorage.removeItem("token");
// localStorage.setItem("test", "[1,3,4]");
// // console.log(JSON.parse(localStorage.getItem("test"))

// export const getTodosFromLocalStorage = () => {
//   let localStorageTodos;

//   if (localStorage.getItem("todos")) {
//     localStorageTodos = JSON.parse(localStorage.getItem("todos"));
//   } else {
//     localStorageTodos = [];
//   }

//   return localStorageTodos;
// };

export const getTodosFromLocalStorage = () =>
  localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

export const getInProgressFromLocalStorage = () =>
  localStorage.getItem("inProgress")
    ? JSON.parse(localStorage.getItem("inProgress"))
    : [];

export const getDoneFromLocalStorage = () =>
  localStorage.getItem("done") ? JSON.parse(localStorage.getItem("done")) : [];
