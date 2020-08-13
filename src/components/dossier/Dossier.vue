<template>
    <transition name="dossier-fade">
        <article v-if="node" class="dossier" :id="`details_${ node.uuid }`">
            <div>
                <div class="dossier-avatar">{{ makeAvatar(node.name) }}</div>
                <h2>{{ node.name }}</h2>
                <manager :org-uuid="node.uuid" />
                <employee-list :org-uuid="node.uuid" />
            </div>
            <a 
                :href="`#node_${ node.uuid }`"
                @click="closeDossier"
                class="dossier-close-btn"
                title="Skjul udvidet information">
                Luk
            </a>
        </article>
    </transition>
</template>

<script>
import Manager from '../people/Manager.vue'
import EmployeeList from '../people/EmployeeList.vue'

export default {
    components: {
        Manager,
        EmployeeList
    },
    props: [
        'nodeUuid'
    ],
    data: function() {
        return {
            node: null
        }
    },
    methods: {
        closeDossier: function() {
            this.node = null
            this.$emit('closedossier')
        },
        fetchOrg: function(uuid) {
            fetch(`${ process.env.VUE_APP_API_BASEURL }/service/ou/${ uuid }/`)
            .then((response) => {
                return response.json()
            })
            .then((org) => {
                this.node = org
            })
            .catch(err => {
                console.log(err)
            })
        },
        makeAvatar: function(string) {
            return string.substring(0,1)
        }
    },
    created: function() {
        this.fetchOrg(this.nodeUuid)
    }
}
</script>

<style>
    .dossier {
        margin: 0;
        background-color: #fff;
        display: flex;
        flex-flow: column nowrap;
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
    }
    .dossier > div {
        padding: 2rem;
        overflow-y: auto;
        overflow-x: hidden;
        flex-grow: 1;
    }
    .dossier-fade-enter-active,
    .dossier-fade-leave-active {
        /*transition: all .3s ease;*/
    }
    .dossier-fade-enter,
    .dossier-fade-leave-to {
        /*
        transform: translateX(100%);
        width: 0;
        */
    }
    .dossier-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background-color: #faa;
        color: #fff;
        font-size: 3rem;
        margin: 0 auto;
    }
    a.dossier-close-btn:link,
    a.dossier-close-btn:visited {
        display: block;
        background-color: #6ad;
        color: #fff;
        border: none;
        text-transform: uppercase;
        text-align: center;
        width: 100%;
        height: 2rem;
        padding: .5rem;
        font-size: smaller;
    }
    a.dossier-close-btn:hover,
    a.dossier-close-btn:active,
    a.dossier-close-btn:focus {
        background-color: #cef;
    }

    @media screen and (max-width: 40rem) {

        .dossier {
            width: 100%;
            max-width: 25rem;
        }
    }

    @media screen and (min-width: 40rem) {
        .dossier {
            width: 25rem;
        }
    }

    @media screen and (min-width: 90rem) {
        .dossier {
            width: 30rem;
        }
    }

</style>