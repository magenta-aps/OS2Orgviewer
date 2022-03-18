import { Selector } from 'testcafe'
import baseurl from './baseurl.js'

fixture `Test person info`
    .page(baseurl)

test('Open/close person details', async t => {
    await t
        .click('#ou-23a2ace2-52ca-458d-bead-d1a42080579f')
        .click(Selector('a').withText('Edelweis Lauritsen'))
        .expect(Selector('#persontitle').exists).ok()
        .click('#persontitle')
        .expect(Selector('#persontitle').exists).notOk()
})

test.page(`${baseurl}/#/person/67545393-6009-4845-b6db-7acab776fcd3`)('Render info when sharing a person URL', async t => {
    await t
        .expect(Selector('#persontitle').exists).ok()
        .expect(Selector('.oc-person-body dd').withText('Gerda Mitchell').exists).ok()
        .click('#persontitle')
        .expect(Selector('#orgtitle').exists).ok()
})