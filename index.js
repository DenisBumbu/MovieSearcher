const btn = document.querySelector(".btn-style");
const display = document.querySelector(".display");
const input = document.querySelector(".input");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  showMovie();
});

const showMovie = async function () {
  try {
    const str = await request();
    const responce = await fetch(
      `https://api.tvmaze.com/search/shows?q=${str}`
    );
    const data = await responce.json();
    if (data.length === 0)
      throw new Error(
        `<h2 class="error">Sorry I didn't Found Your Movie ;( Could You Try Something Else Please.</h2>`
      );
    let movie = data[0];
    movie = {
      name: data[0].show.name,
      rating: data[0].show.rating.average,
      poster: data[0].show.image.medium,
      summary: data[0].show.summary,
    };
    console.log(movie);

    const markup = `
          <img class="post--img" src="${movie.poster}" alt="" />
        
        <div class="name">
        <p class="header--text">Name:</p>
          <h4 class="name--text">${movie.name}</h4>
        </div>
        <div class="rating">
        <p class="header--text">Average Rating is:</p>
          <h4 class="rating--text">${movie.rating}</h4>
        </div>
        <div class="summary">
        <p class="header--text">About Movie</p>
          <h4 class="summary--text">${movie.summary}</h4>
        </div>
`;
    display.innerHTML = "";
    display.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    display.innerHTML = "";
    display.insertAdjacentHTML("afterbegin", err);
  }
};

const request = () => {
  const str = input.value;
  input.value = " ";
  return str;
};
