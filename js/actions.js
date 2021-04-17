let startScreen = document.getElementById("startScreen");
let content = document.getElementById("content");

startScreen.querySelector("button").addEventListener("click", () => {
    startScreen.classList.add("fade-out");
})
startScreen.onanimationend = () => {
    startScreen.remove();
    content.style.setProperty("display","block");
    content.classList.add("fade-in");
}