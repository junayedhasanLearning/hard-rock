// Base URL
const baseURL = "https://api.lyrics.ovh/";

// DOM selection
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const searchResult = document.querySelector(".search-result");
const singleLyrics = document.querySelector(".single-lyrics");

searchBtn.addEventListener("click", () => {
  if (searchBox.value.length != 0) {
    const URL = `${baseURL}suggest/${searchBox.value.trim()}`;
    getData(URL, searchBox.value);
  } else {
    alert("Firstly Enter a song name");
  }
});

async function getData(url, songName) {
  const response = await fetch(url);
  let data = (await response.json()).data;
  searchResult.innerHTML = "";
  singleLyrics.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const song = data[i];
    const artistName = song.artist.name;
    const songDetails = `<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-9">
    <div class="row">
      <div class="col-md-3">
        <img class="singer-img my-md-5" src="${song.artist.picture}" />
      </div>
      <div class="col-md-9 my-md-2 singer-details">
        <h3 class="lyrics-name">${songName.toUpperCase()}</h3>
        <p class="author lead">Album by <span>${artistName}</span></p>
        <strong>
          <audio controls src="${song.preview}"></audio>
        </strong>
      </div>
    </div>
  </div>
            <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success getLyricBtn" data-artist="${artistName}">Get Lyrics</button>
            </div>
          </div>`;
    searchResult.insertAdjacentHTML("beforeend", songDetails);
  }
  // Attach event listener only after all elements are created
  getLyrics(songName);
}

function getLyrics(songName) {
  const getLyricBtns = document.querySelectorAll(".getLyricBtn");
  getLyricBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const artistName = e.target.dataset.artist;
      lyricURL = `${baseURL}v1/${artistName}/${songName}`;
      let response = await fetch(lyricURL);
      let data = await response.json();
      singleLyrics.innerText = data.lyrics;
    });
  });
}
