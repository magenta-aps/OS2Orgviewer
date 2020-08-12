<template>
    <transition name="dossier-fade">
        <article v-if="node" class="dossier" :id="`node_${ node.uuid }`">
            <div class="dossier-avatar">{{ makeAvatar(node.name) }}</div>
            <h2>{{ node.name }}</h2>
            <manager :org-uuid="node.uuid" />
            <employee-list :org-uuid="node.uuid" />
            <button type="button" class="dossier-close-btn" @click="closeDossier" title="Skjul udvidet information">Luk</button>
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
    data: function() {
        return {
            node: null
        }
    },
    methods: {
        closeDossier: function() {
            this.node = null
        },
        fetchOrg: function(uuid) {
            fetch(`http://localhost:5001/service/ou/${ uuid }/`)
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
        },
        hashCangeHandler: function() {
            this.fetchOrg(window.location.hash.substring(6))
        }
    },
    created: function() {
        window.addEventListener('hashchange', this.hashCangeHandler)
    }
}
</script>

<style>
    .dossier {
        padding: 2rem;
        margin: 0;
        background-color: #fff;
        overflow-y: auto;
        overflow-x: hidden;
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
    .dossier-close-btn {
        background-color: #6ad;
        color: #fff;
        border: none;
        text-transform: uppercase;
        text-align: center;
        width: 100%;
        height: 2rem;
    }
    .dossier-close-btn:hover,
    .dossier-close-btn:active,
    .dossier-close-btn:focus {
        background-color: #cef;
    }

    @media screen and (max-width: 30rem) {
        #dossier {
            width: 100%;
            left: 0;
            overflow-y: scroll;
            overflow-x: hidden;
        }
    }

    @media screen and (min-width: 30rem) {
        #dossier {
            width: 25rem;
        }
    }

</style>