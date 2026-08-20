function showClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
    const date = String(now.getDate()).padStart(2, '0');
    const dayList = ['日', '月', '火', '水', '木', '金', '土'];
    const day = dayList[now.getDay()];
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${year}年${month}月${date}日(${day}) ${h}:${m}:${s}`;
}
setInterval(showClock, 1000);
showClock();

const SideBarSystemMenuButton = document.getElementById("SideBarSystemMenuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
SideBarSystemMenuButton.addEventListener("click", () => {
sidebar.classList.toggle("active");
overlay.classList.toggle("active");
});
overlay.addEventListener("click", () => {
sidebar.classList.remove("active");
overlay.classList.remove("active");
});
