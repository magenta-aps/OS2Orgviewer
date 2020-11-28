import { Selector } from 'testcafe'

fixture `Test person info`
    .page `http://localhost:8652`

test('Open/close person details', async t => {
    await t
        .click('#ou-b6c11152-0645-4712-a207-ba2c53b391ab')
        .click(Selector('a').withText('Verner Pedersen'))
        .expect(Selector('#persontitle').exists).ok()
        .click('#persontitle')
        .expect(Selector('#persontitle').exists).notOk()
})

test.page('http://localhost:8652/#/person/43d684b5-9f9f-45d1-9acc-f597f3933cb7')('Render info when sharing a person URL', async t => {
    await t
        .expect(Selector('#persontitle').exists).ok()
        .expect(Selector('.oc-person-body dd').withText('Verner Pedersen').exists).ok()
        .click('#persontitle')
        .expect(Selector('#orgtitle').exists).ok()
})