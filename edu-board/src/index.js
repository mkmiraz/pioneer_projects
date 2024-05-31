const resultSearchForm = document.getElementById("resultSearchForm");
const ediPlzLabel = document.getElementById("ediPlz");
const eduBody = document.querySelector(".edu-body");

let plz1 = getRandomNumber();
let plz2 = getRandomNumber();
// plz value store
localStorage.setItem("edu_pzl", JSON.stringify({ a: plz1, b: plz2 }));
ediPlzLabel.innerHTML = `${plz1} + ${plz2}`;

resultSearchForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);

  // get storej Data

  const eduPzlData = JSON.parse(localStorage.getItem("edu_pzl"));
  const studentData = JSON.parse(localStorage.getItem("students"));

  if (eduPzlData.a + eduPzlData.b !== parseInt(data.pzl)) {
    alert("Pzl Not match");
  } else {
    const searchData = studentData.find(
      (item) =>
        item.exam == data.examination &&
        item.year == data.year &&
        item.board == data.board &&
        item.roll == data.roll &&
        item.reg == data.reg
    );

    if (searchData) {
      localStorage.setItem("result", JSON.stringify(searchData));
      eduBody.innerHTML = ` 
        <img src="https://i0.wp.com/www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif?fit=450%2C250&ssl=1" />
      `;
      setInterval(() => {
        window.location.href = "/result.html";
      }, 3000);
    } else {
      alert("No result found");
    }
  }
};
