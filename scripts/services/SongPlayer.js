(function () {
    function SongPlayer() {
        var SongPlayer = {};
        
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
        
        
        SongPlayer.play = function(songs) {
            if (currentSong !== songs) {
                setSong(songs);
                currentBuzzObject.play();
            songs.playing = true;
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