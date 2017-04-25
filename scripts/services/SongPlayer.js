(function () {
    function SongPlayer() {
        var SongPlayer = {};
        
        /** 
        * @desc song that is currently playing
        * @type {object}
        */
        var currentSong = null;
        
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(songs.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = songs;
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
        
        SongPlayer.play = function(songs) {
            if (currentSong !== songs) {
                setSong(songs);
                playSong(songs);
            } else if (currentSong === songs) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        SongPlayer.pause = function(songs) {
            currentBuzzObject.pause();
            songs.playing = false;
        };
        
        return SongPlayer;
    }
        
    angular 
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();