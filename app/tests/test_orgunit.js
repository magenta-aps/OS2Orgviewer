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