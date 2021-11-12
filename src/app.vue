<script>
    // import songs from "@/mocks/songs";

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
                index: 0,
                isPlaying: false,
                current: {},
                player: new Audio(),

                songs: [
                    {
                        title: "MEnorme",
                        artist: "Linn da Quebrada",
                        seconds: 244,
                        cover: "/assets/images/linn da quebrada - menorme.jpg",
                        src: "/assets/audios/Linn da Quebrada - MEnorme.mp3"
                      },
                      {
                        title: "Oceano",
                        artist: "Mc Tha",
                        seconds: 128,
                        cover: "/assets/images/mc tha - oceano.jpg",
                        src: "/assets/audios/Mc Tha - Oceano.mp3"
                      },
                ]
            }
        },

        methods: {
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
                // this.listenersWhenPlay();

            },
        },

        mounted() {
            this.songs = threatSongs(this.songs);
        }
    }
</script>
<template>
    <div>
        <section>
            <ul>
                <li v-for="song in songs" :key="song.src" class="song">
                    <div @click="play(song)">
                        {{ song.title }}
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>
