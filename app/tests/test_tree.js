import { Selector } from 'testcafe';

fixture('Test tree')
    .page('http://localhost:8652')

const expand_btn = Selector('#branch-f06ee470-9f17-566f-acbe-e938112d46d9 > .oc-tt-item:first-child > .oc-tt-node > .oc-node-expand-btn')

test('Default treeview', async t => {
    await t
        .expect(Selector('#ou-f06ee470-9f17-566f-acbe-e938112d46d9').exists).ok()
        .expect(Selector('#ou-23a2ace2-52ca-458d-bead-d1a42080579f').exists).ok()
})

test('Expand/collapse node', async t => {
    await t
        .click(expand_btn)
        .expect(Selector('#ou-9b7b3dde-16c9-4f88-87cc-e03aa5b4e709').exists).ok()
        .click(expand_btn)
        .expect(expand_btn.withAttribute('aria-expanded', 'false').exists).ok()
})

test('Change tree root', async t => {
    await t
        .click('#node-23a2ace2-52ca-458d-bead-d1a42080579f > .oc-tt-node > .oc-tt-node-body > .oc-node-focus-btn')
        .expect(Selector('#node-f06ee470-9f17-566f-acbe-e938112d46d9').exists).notOk()
        .expect(Selector('.oc-tt-ul-root > #node-23a2ace2-52ca-458d-bead-d1a42080579f').exists).ok()
        .expect(Selector('#node-cf4daae1-4812-41f1-8c47-63a99e26aadf').exists).ok()
        .expect(Selector('.oc-chart-root-link').exists).ok()
        .click('.oc-chart-root-link')
        .expect(Selector('.oc-chart-root-link').exists).notOk()
        .expect(Selector('#node-f06ee470-9f17-566f-acbe-e938112d46d9').exists).ok()
})

test.page('http://localhost:8652/#/tree/9b7b3dde-16c9-4f88-87cc-e03aa5b4e709')('Render info when sharing a tree URL', async t => {
    await t
        .expect(Selector('#node-9b7b3dde-16c9-4f88-87cc-e03aa5b4e709.active').exists).ok()
        .expect(Selector('#orgtitle').exists).notOk()
        .expect(Selector('#persontitle').exists).notOk()
})

test.page('http://localhost:8652/#/tree/fe2d2ff4-45f8-4b19-8e1b-72d1c4914360/fe2d2ff4-45f8-4b19-8e1b-72d1c4914360/')('Render info when sharing a tree URL with specific root', async t => {
    await t
        .expect(Selector('.oc-chart-root-link').exists).ok()
        .expect(Selector('.oc-tt-ul-root > #node-fe2d2ff4-45f8-4b19-8e1b-72d1c4914360').exists).ok()
        .click('.oc-chart-root-link')
        .expect(Selector('.oc-tt-ul-root > #node-23a2ace2-52ca-458d-bead-d1a42080579f').exists).ok()
})

test.page('http://localhost:8652/#/tree/fe2d2ff4-45f8-4b19-8e1b-72d1c4914360/fe2d2ff4-45f8-4b19-8e1b-72d1c4914360/')('Reset all when click on branding link', async t => {
    await t
        .expect(Selector('.oc-chart-root-link').exists).ok()
        .click('#oc-global-header > .oc-header-preaction')
        .expect(Selector('#node-f06ee470-9f17-566f-acbe-e938112d46d9').hasAttribute('class', 'active')).ok()
        .expect(Selector('.oc-chart-root-link').exists).notOk()
})