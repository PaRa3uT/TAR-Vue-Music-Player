<script>
    import { mdiPlayCircleOutline, mdiPauseCircleOutline, mdiSkipPreviousCircleOutline, mdiSkipNextCircleOutline } from '@mdi/js'
    const threatSongs = songs => {
        return songs.map(song => {
            song["isPlaying"] = false;
            song["percent"] = 0;
            song["currentlyTimer"] = "00:00";
        // song["totalTimer"] = formatTimer(song.seconds);

            return song;
        });
    };

    export default {
        data() {
            return {
                icons: {
                    mdiPlayCircleOutline,
                    mdiPauseCircleOutline,
                    mdiSkipPreviousCircleOutline,
                    mdiSkipNextCircleOutline
                },
                index: 0,
                isPlaying: false,
                current: {},
                current_time: 0,
                current_time_str: '00:00',
                current_duration_str: '00:00',
                player: new Audio(),


                songs: [{
                        title: "5sta Family",
                        artist: "Аллилуйя",
                        seconds: 128,
                        cover: "/images/mc tha - oceano.jpg",
                        src: "/audios/5sta Family - Аллилуйя.mp3"
                  }, {
                        title: 'Театр',
                        artist: '13-е Созвездие',
                        seconds: 200,
                        cover: '',
                        src: '/audios/13-е Созвездие - Театр.mp3',
                  }, {
                        title: 'Никаких Больше Вечеринок',
                        artist: 'Cream Soda',
                        seconds: 200,
                        cover: '',
                        src: '/audios/Cream Soda - Никаких Больше Вечеринок.mp3',
                }]
            }
        },

        methods: {
            format_time(time_seconds) {
                let output = '';

                if (time_seconds) {
                    let minutes = parseInt(time_seconds / 60).toString();
                    let seconds = parseInt(time_seconds % 60).toString();

                    output += minutes > 9 ? `${minutes}` : `0${minutes}`;
                    output += seconds > 9 ? `:${seconds}` : `:0${seconds}`;

                    return output;
                }
                return '00:00';
            },

            listenersWhenPlay() {
                this.player.addEventListener("timeupdate", () => {
                    let playerTimer = this.player.currentTime;

                    this.current_time = playerTimer;
                    this.current_time_str = this.format_time(playerTimer);
                    this.current.isPlaying = true;
                    this.current_duration_str = this.format_time(this.player.duration);
                });

                this.player.addEventListener(
                    "ended",
                    function() {
                        console.log('event ended');
                        this.next();
                    }.bind(this)
                );
            },

            setCurrentSong() {
                this.current = this.songs[this.index];
                this.play(this.current);
                // this.setCover();
            },

            play(song) {
                if (typeof song.src !== "undefined") {
                    this.current.isPlaying = false;
                    this.index = this.songs.indexOf(this.current);
                    this.current = song;
                    this.player.src = this.current.src;
                }

                this.player.play();
                this.isPlaying = true;

                // this.setCover();
                this.listenersWhenPlay();

            },
            
            prev() {
                this.current.isPlaying = false;
                this.index = this.songs.indexOf(this.current);
                this.index--;
                if (this.index < 0) {
                    this.index = this.songs.length - 1;
                }
                this.setCurrentSong();
            },
            
            next() {
                this.current.isPlaying = false;
                this.index = this.songs.indexOf(this.current);
                this.index++;
                if (this.index > this.songs.length - 1) {
                    this.index = 0;
                }
                this.setCurrentSong();
            },

            stop() {
                this.player.stop();
                this.isPlaying = false;
            },

            pause() {
                this.player.pause();
                this.isPlaying = false;
            },

            seek(value) {
                this.player.fastSeek(this.player.duration * ( value / 100));
            }
        },

        mounted() {
            this.songs = threatSongs(this.songs);
        },

        computed: {
            current_song_title() {
                if (this.current) {
                    return this.current.artist + ' - ' + this.current.title;
                }
                return 'no song'
            },

            current_song_time() {
                return this.current.time;
            },

            song_progress_percent() {
                return (this.current_time * 100) / this.player.duration;
            },

            // current_duration_str() {
            //     if (this.player.duration) {
            //         return this.format_time(this.player.duration)
            //     }
            //     return "00:00"
            // }
        }
    }
</script>
<template>
    <v-app>
        <v-main>
            <v-card max-width="388">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>
                <v-card-text>
                    <div>{{ current_song_title }}</div>
                    <div>{{ current_time_str }} / {{ current_duration_str }}</div>
                    <v-progress-linear :value="song_progress_percent" color="amber" height="8" striped @change="seek"></v-progress-linear><br/>
                    <!-- controls -->
                    <div class="d-flex justify-space-between">
                        <v-btn outlined small color="primary" @click="prev"><v-icon>{{ icons.mdiSkipPreviousCircleOutline }}</v-icon>prev</v-btn>
                        <v-btn v-if="!isPlaying" outlined small color="success" @click="play"><v-icon>{{ icons.mdiPlayCircleOutline }}</v-icon>play</v-btn>
                        <v-btn v-else outlined small color="warning" @click="pause"><v-icon>{{ icons.mdiPauseCircleOutline }}</v-icon>pause</v-btn>
                        <!-- <button @click="stop">stop</button> -->
                        <v-btn outlined small color="primary" @click="next"><v-icon>{{ icons.mdiSkipNextCircleOutline }}</v-icon>next</v-btn>
                    </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-text>
                    <v-list dense height="240px" class="overflow-y-auto">
                        <template v-for="song in songs">
                            <v-list-item :key="song.src" @click="play(song)">
                                <v-list-item-icon class="mr-2">
                                    <v-icon v-text="icons.mdiPauseCircleOutline" v-if="song.src == current.src"></v-icon>
                                    <v-icon v-text="icons.mdiPlayCircleOutline" v-else></v-icon>
                                </v-list-item-icon>
                                <v-list-item-title v-text="song.artist + ' - ' + song.title" class="text-caption"></v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card-text>
            </v-card>

        </v-main>
    </v-app>
</template>
