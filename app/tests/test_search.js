import { Selector } from 'testcafe';

fixture `Test search`
    .page `http://localhost:8652/#/search`

test('Search for person', async t => {
    await t
        .typeText('#search-input', 'Verner', {replace: true})
        .click(Selector('.oc-search-list a').withText('Verner Pedersen'))
        .expect(Selector('.oc-person-title').withText('Verner Pedersen').exists).ok()
})

test('Search for org unit', async t => {
    await t
        .typeText('#search-input', 'Teknik', {replace: true})
        .click(Selector('.oc-search-list a').withText('Teknik og Miljø'))
        .expect(Selector('.oc-org-title').withText('Teknik og Miljø').exists).ok()
})