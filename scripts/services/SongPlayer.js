(function () {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc used to store album info 
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /** 
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads a new audio file as currentBuzzObject
        * @param {Object} songs
        */
        var setSong = function(songs) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(songs.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = songs;
        };
        
        /**
        * @function playSong
        * @desc sets Buzz Object to play and songs.playing to true
        * @param {object} songs
        */
        var playSong = function(songs) {
            currentBuzzObject.play();
            songs.playing = true;
        };
        
        /**
        * @desc stops Buzz object from playing and sets songs.playing to false
        *@param {object} songs
        */
        var stopSong = function(songs) {
            currentBuzzObject.stop();
            songs.playing = null;
        };
        
        SongPlayer.currentSong = null;
        
        /**
        * @function getSongIndex
        * @ desc stores Index value of song
        * @param {object} songs
        * @return index value of song
        */
        var getSongIndex = function(songs) {
            return currentAlbum.songs.indexOf(songs);
        };
        
        /**
        * @function SongPlayer.play
        * @desc allows audio playback for player
        */
        SongPlayer.play = function(songs) {
            songs = songs || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== songs) {
                setSong(songs);
                playSong(songs);
            } else if (SongPlayer.currentSong === songs) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @desc method gives pause functionality to player
        */
        SongPlayer.pause = function(songs) {
            songs = songs || SongPlayer.currentSong;
            currentBuzzObject.pause();
            songs.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc method gives 'Previous Song' functionality to playerBar
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function SongPlayer.previous
        * @desc method gives 'Next Song' functionality to playerBar
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
        
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();