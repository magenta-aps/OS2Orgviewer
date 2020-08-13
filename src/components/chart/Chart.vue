<template>
    <div class="oc-chart-wrapper" @mousedown="startDrag" @mouseup="endDrag" @mousemove="doDrag">
        <div ref="chart" class="oc-chart">
            <ul class="oc-branch oc-chart-root-branch">
                <li class="oc-node oc-chart-root-node">
                    <div class="oc-node-body">
                        <micro-dossier v-if="node" :node-data="node" />
                    </div>
                    <oc-branch :uuid="entry_node_uuid" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import OcBranch from './Branch.vue'
import OcNode from './Node.vue'
import MicroDossier from '../dossier/MicroDossier.vue'

export default {
    data: function() {
        return {
            entry_node_uuid: 'f06ee470-9f17-566f-acbe-e938112d46d9',
            node: null,
            dragging: false,
            x: null,
            y: null
        }
    },
    components: {
        OcBranch,
        OcNode,
        MicroDossier
    },
    methods: {
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
        initDisplay: function() {
            let viewport_center = (this.$refs.chart.scrollWidth / 2) - (window.innerWidth / 2)
            setTimeout(() => {
                this.$refs.chart.scrollTo(viewport_center, 0)
            }, 300)
        },
        startDrag: function(ev) {
            this.dragging = true
            this.x = ev.x
            this.y = ev.y
        },
        doDrag: function(ev) {
            if (this.dragging) {
                const offsetx = this.x - ev.x
                const offsety = this.y - ev.y
                this.x = ev.x
                this.y = ev.y
                ev.target.scrollLeft = ev.target.scrollLeft + offsetx
                ev.target.scrollTop = ev.target.scrollTop + offsety
            }
        },
        endDrag: function() {
            this.dragging = false
        }
    },
    created: function() {
        this.fetchOrg(this.entry_node_uuid)
    },
    mounted: function() {
        this.initDisplay()
    }
}
</script>

<style>

.oc-chart-wrapper {
    height: 100%;
}

.oc-chart {
    overflow: scroll;
    height: 100%;
    padding: 2rem 0;
}

.oc-chart .oc-chart-root-node > .oc-node-body::before,
.oc-chart .oc-chart-root-branch::before {
    content: none;
}

</style>
