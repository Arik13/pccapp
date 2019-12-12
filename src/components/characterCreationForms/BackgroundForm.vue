<template>
    <v-row>
        <v-col>
            <v-form>
                <v-text-field
                    v-model="characterName"
                    label="Character Name"
                    required
                ></v-text-field>
                <v-textarea
                    outlined
                    label="Personality"
                    :value="personality"
                ></v-textarea>
                <v-textarea
                    outlined
                    label="History"
                    :value="history"
                ></v-textarea>
                <v-radio-group v-model="radioGroup">
                    <v-radio
                        v-for="(sex, i) in sexes"
                        :key="i"
                        :label="sex"
                        :value="i"
                    ></v-radio>
                </v-radio-group>
                <v-text-field
                    v-if="otherSelected"
                    label="Specify Your Sex">
                </v-text-field>
                <v-overflow-btn
                    :items="races"
                    label="Race"
                ></v-overflow-btn>
            </v-form>
        </v-col>
        <!-- <v-col></v-col> -->
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            radioGroup: 0,
            characterName: '',
            personality: '',
            history: '',
            sex: '',
            race: '',
            sexes: ['Male', 'Female', 'Other'],
            races: ['Dwarf', 'Elf', 'Gnome', 'Half Elf', 'Halfling', 'Half Orc', 'Human'],
        }
    },
    computed: {
        otherSelected() {
            return this.radioGroup == 2;
        }
    }
}
</script>