//1st way to calling API
const searchSong = async () => {
  const searchText = document.getElementById("search-filed").value.trim();
  const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
  toggleSpiner(true);
  try {
    const res = await fetch(url);
    const data = await res.json();
    dispalySongs(data.data);
  } catch (error) {
    displayError("Somthing Went Wrong..... Please Try again Letter");
  }
};

const dispalySongs = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.style.display = "block";
  songContainer.innerHTML = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
      <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                 <source src="${song.preview}" type="audio/mpeg">
            </audio>
     </div>
     <div class="col-md-3 text-md-right text-center">
            <button onclick ="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
     </div>
      `;
    songContainer.appendChild(songDiv);
    toggleSpiner(false);
  });
  const songLyric = document.getElementById("song-lyrics");
  songLyric.style.display = "none";
};

const getLyric = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayLyric(data.lyrics);
  } catch (error) {
    displayError("Sorry I Can't found the lyrics.. Pleas try again Letter");
  }
  //2nd way to calling API
  /** 
   fetch(url)
    .then((res) => res.json())
    .then((data) => displayLyric(data.lyrics))
    .catch(
      displayError("Sorry I Can't found the lyrics.. Pleas try again Letter")
    );
*/
  const songContainer = document.getElementById("song-container");
  songContainer.style.display = "none";
};

const displayLyric = (lyrics) => {
  const lyricDiv = document.getElementById("song-lyrics");
  lyricDiv.innerText = lyrics;
  lyricDiv.style.display = "block";
};

const displayError = (error) => {
  const errorTag = document.getElementById("error-msg");
  errorTag.innerText = error;
};

const toggleSpiner = (show) => {
  const spinner = document.getElementById("loading-spiner");
  if (show) {
    spinner.classList.add("d-flex");
  } else {
    spinner.classList.remove("d-flex");
  }
};
