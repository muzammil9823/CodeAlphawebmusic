document.addEventListener("DOMContentLoaded", function() {
    const audio = new Audio();
    const playlist = document.getElementById("playlist");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const volumeControl = document.getElementById("volumeControl");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const categorySelect = document.getElementById("categorySelect");

    let currentSongIndex = 0;
    let isPlaying = false;
    let currentCategory = "all";

    function playPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? "Pause" : "Play";
    }

    function loadSong(index) {
        const song = playlist.children[index];
        const songSrc = song.getAttribute("data-src");
        audio.src = songSrc;
        audio.load();
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "Pause";
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.children.length;
        loadSong(currentSongIndex);
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.children.length) % playlist.children.length;
        loadSong(currentSongIndex);
    }

    function changeVolume() {
        audio.volume = volumeControl.value / 100;
    }

    function searchSongs() {
        const searchTerm = searchInput.value.toLowerCase();
        const songs = playlist.children;

        for (let i = 0; i < songs.length; i++) {
            const song = songs[i];
            const songName = song.textContent.toLowerCase();

            if (songName.includes(searchTerm) && (currentCategory === "all" || song.getAttribute("data-category") === currentCategory)) {
                song.style.display = "block";
            } else {
                song.style.display = "none";
            }
        }
    }

    function filterByCategory() {
        currentCategory = categorySelect.value;
        searchSongs();
    }

    playPauseBtn.addEventListener("click", playPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    volumeControl.addEventListener("input", changeVolume);
    searchBtn.addEventListener("click", searchSongs);
    categorySelect.addEventListener("change", filterByCategory);
    loadSong(currentSongIndex);
    audio.addEventListener("ended", nextSong);
    audio.addEventListener("timeupdate", function() {
    });
});
