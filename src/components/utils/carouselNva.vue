<template>
    <v-container class="custom-container ">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(       slide, i       ) in        slides       " :key=" i ">
                <v-sheet :color=" colors[ i ] " height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <div class="text-h2">
                            {{ slide }} Slide
                        </div>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <v-container>
            <v-layout></v-layout>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data: () => ( {
        cards: [
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
        colors: [
            'green',
            'secondary',
            'yellow darken-4',
            'red lighten-2',
            'orange darken-1',
        ],
        cycle: false,
        slides: [
            'First',
            'Second',
            'Third',
            'Fourth',
            'Fifth',
        ],

    } ),
}
</script>

<style scoped></style>