<template>
    <v-row>
        <!-- <strong>Welcome back {{ screenName }}!</strong><br><br> -->
        <v-flex xs12 sm8 offset-sm2>
            <v-btn @click="toggleNav()">Toggle</v-btn>
            <v-tabs
                    v-model="currentTabId"
                    class="elevation-2"
                    dark
                    :vertical="true"
                >
                    <v-tab class="hidden-sm-and-down" v-for='(tab, i) in tabs' :key="i">{{ tab }}</v-tab>
                <v-tab-item v-for='(tab, i) in tabs' :key="i">
                    <v-card flat tile>
                        <v-card-title>{{ tab }}</v-card-title>
                        <v-card-text>
                            <component :is='currentComponent'></component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-flex>
    </v-row>
</template>

<script>
import BackgroundForm from './characterCreationForms/BackgroundForm';
import AbilityScoreForm from './characterCreationForms/AbilityScoreForm';
import ClassForm from './characterCreationForms/ClassForm';
import SkillForm from './characterCreationForms/SkillForm';
import FeatForm from './characterCreationForms/FeatForm';
import SpellForm from './characterCreationForms/SpellForm';
import EquipmentForm from './characterCreationForms/EquipmentForm';

export default {
    data() {
        return {
            showNav: false,
            currentTabId: 0,
            drawer: '',
            tabObjects: [
                {tabHeader: 'Background', associatedComponent: 'background-form'},
                {tabHeader: 'Ability Scores', associatedComponent: 'ability-score-form'},
                {tabHeader: 'Class', associatedComponent: 'class-form'},
                {tabHeader: 'Skills', associatedComponent: 'skill-form'},
                {tabHeader: 'Feats', associatedComponent: 'feat-form'},
                {tabHeader: 'Spells', associatedComponent: 'spell-form'},
                {tabHeader: 'Equipment', associatedComponent: 'equipment-form'},
            ],
            tabs: [
                'Background',
                'Ability Scores',
                'Class',
                'Skills',
                'Feats',
                'Spells',
                'Equipment'],
        }
    },
    components: {
        'background-form': BackgroundForm,
        'ability-score-form': AbilityScoreForm,
        'class-form': ClassForm,
        'skill-form': SkillForm,
        'feat-form': FeatForm,
        'spell-form': SpellForm,
        'equipment-form': EquipmentForm,
    },
    computed: {
        screenName() {
            //if (!this.$store.getters.user) return;
            return this.$store.getters.user.screenName;
        },
        email() {
            //if (!this.$store.getters.user) return;
            return this.$store.getters.user.email;
        },
        currentComponent() {
            return this.tabObjects[this.currentTabId].associatedComponent;
        }
    },
    methods: {
        toggleNav() {
            this.showNav = !this.showNav;
        }
    }
}
</script>