<template>
    <transition name="dossier-fade">
        <article v-if="node" class="dossier" :id="`node_${ node.uuid }`">
            <img class="dossier-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTEhgwg4k9WfF0APgcz8sb3TQUKGocF_Jus2A&usqp=CAU" :alt="`Portræt af ${ node.name }`">
            <dl class="dossier-dl">
                <dt>Navn</dt>
                <dd>{{ node.name }}</dd>
            </dl>
            <button type="button" class="dossier-close-btn" @click="closeDossier" title="Skjul udvidet information">Luk</button>
        </article>
    </transition>
</template>

<script>
export default {
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
        z-index: 100;
        position: absolute;
        top: 0;
        right: 0;
        min-height: 100%;
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
    .dossier-img {
        width: 100%;
        height: auto;
    }
    .dossier-dl dt {
        opacity: .75;
        font-size: smaller;
    }
    .dossier-dl dd {
        margin: 0 0 1rem;
        padding: 0;
    }
    .dossier-email {
        text-transform: lowercase;
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