import { Selector } from 'testcafe'

fixture `Test person info`
    .page `http://localhost:8652`

test('Open/close person details', async t => {
    await t
        .click('#ou-b6c11152-0645-4712-a207-ba2c53b391ab')
        .click(Selector('a').withText('Margit Lysholm Mogensen'))
        .expect(Selector('#persontitle').exists).ok()
        .click('#persontitle')
        .expect(Selector('#persontitle').exists).notOk()
})

test.page('http://localhost:8652/#/person/a454a30f-5659-4f21-8d3f-a3d043c6d9ac')('Render info when sharing a person URL', async t => {
    await t
        .expect(Selector('#persontitle').exists).ok()
        .expect(Selector('.oc-person-body dd').withText('Margit Lysholm Mogensen').exists).ok()
        .click('#persontitle')
        .expect(Selector('#orgtitle').exists).ok()
})