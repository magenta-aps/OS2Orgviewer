import { Selector } from 'testcafe'

fixture `Test org units`
    .page `http://localhost:8652`

test('Open/close org unit details', async t => {
    await t
        .click('#ou-f06ee470-9f17-566f-acbe-e938112d46d9')
        .expect(Selector('#orgtitle').exists).ok()
        .click('#orgtitle')
        .expect(Selector('#orgtitle').exists).notOk()
})

test('Display org unit addresses and people list', async t => {
    await t
        .click('#ou-f06ee470-9f17-566f-acbe-e938112d46d9')
        .expect(Selector('.people-list').exists).ok()
        .expect(Selector('.oc-address-list').exists).ok()
})

test.page('http://localhost:8652/#/orgunit/b6c11152-0645-4712-a207-ba2c53b391ab')('Render info when sharing an org unit URL', async t => {
    await t
        .expect(Selector('#orgtitle').exists).ok()
        .expect(Selector('#persontitle').exists).notOk()
        .expect(Selector('.oc-address-list').exists).ok()
        .expect(Selector('.people-list').exists).ok()
})