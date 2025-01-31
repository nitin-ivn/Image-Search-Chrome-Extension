const capture = document.getElementById("capture");
const home = document.querySelector(".home");
const home_page = document.getElementById("home-page");
const homeNav = document.querySelector(".home-img");
const bookNav = document.getElementById("bookmark-img");
console.log(home_page)

capture.addEventListener('click', () => {
    home.style.width =  '47rem';
    home.style.height = 'auto';
    home_page.style.display = "none";
})

document.querySelector(".home-btn").addEventListener('click', () => {
    homeNav.src = "/assets/home-active.svg"
    bookNav.src = "/assets/bookmark.svg"
});

console.log(homeNav);
console.log(bookNav);

document.querySelector(".book-btn").addEventListener('click', () => {
    homeNav.src = "/assets/home.svg"
    bookNav.src = "/assets/bookmark-active.svg"
})