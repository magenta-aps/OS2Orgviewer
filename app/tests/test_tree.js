import { Selector } from 'testcafe';

fixture `Test tree`
    .page `http://localhost:8652`

const expand_btn = Selector('.oc-branch-level-1 > .oc-node:first-child > .oc-node-body > .oc-node-expand-btn')

test('Default treeview', async t => {
    await t
        .expect(Selector('#ou-f06ee470-9f17-566f-acbe-e938112d46d9').exists).ok()
        .expect(Selector('#ou-23a2ace2-52ca-458d-bead-d1a42080579f').exists).ok()  
})

test('Expand/collapse node', async t => {
    await t
        .click(expand_btn)
        .expect(Selector('#ou-1f06ed67-aa6e-4bbc-96d9-2f262b9202b5').exists).ok()
        .click(expand_btn)
        .expect(expand_btn.withAttribute('aria-expanded', 'false').exists).ok()
})