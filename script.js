// Base URL for the lyrics API
const baseURL = "https://api.lyrics.ovh/";

// DOM selection
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const searchResult = document.querySelector(".search-result");
const singleLyrics = document.querySelector(".single-lyrics");

// Event listener for search button
searchBtn.addEventListener("click", () => {
  // Check if the search box is not empty
  if (searchBox.value.length != 0) {
    // Construct the URL for fetching song suggestions
    const URL = `${baseURL}suggest/${searchBox.value.trim()}`;
    // Call the function to fetch data
    getData(URL, searchBox.value);
  } else {
    // Alert the user if the search box is empty
    alert("Firstly Enter a song name");
  }
});

// Function to fetch data from the API
async function getData(url, songName) {
  const response = await fetch(url);
  let data = (await response.json()).data;
  // Clear previous search results and single lyrics
  searchResult.innerHTML = "";
  singleLyrics.innerHTML = "";
  // Loop through the fetched data
  for (let i = 0; i < 10; i++) {
    const song = data[i];
    const artistName = song.artist.name;
    // Construct HTML for each search result
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
    // Insert the HTML into the search result container
    searchResult.insertAdjacentHTML("beforeend", songDetails);
  }
  // Attach event listener to the "Get Lyrics" buttons
  getLyrics(songName);
}

// Function to fetch and display lyrics when "Get Lyrics" button is clicked
function getLyrics(songName) {
  const getLyricBtns = document.querySelectorAll(".getLyricBtn");
  getLyricBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const artistName = e.target.dataset.artist;
      // Construct the URL for fetching lyrics
      const lyricURL = `${baseURL}v1/${artistName}/${songName}`;
      let response = await fetch(lyricURL);
      let data = await response.json();
      // Display the lyrics in the singleLyrics container
      singleLyrics.innerText = data.lyrics;
    });
  });
}
