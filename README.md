## NoteApp E2E testauksen muistiinpanot

- npm install --save-dev cypress
- Scripteihin: "cypress:open": "cypress open"
- Cypress-testit olettavat että testattava järjestelmä on käynnissä kun testit suoritetaan, eli toisin kuin esim. backendin integraatiotestit, Cypress-testit eivät käynnistä testattavaa järjestelmää testauksen yhteydessä.
- Lisää bäkkärin scripteihin: "start:test": "NODE_ENV=test node index.js"
- Käynnistä cypress: npm run cypress:open
- Mochan dokumentaatio kuitenkin suosittelee että nuolifunktioita ei käytetä, ne saattavat aiheuttaa ongelmia joissain tilanteissa.
- Testit on luonnollisesti mahdollista suorittaa myös komentoriviltä, komennolla cypress run, joka kannattaa halutessa lisätä npm-skriptiksi.
- Run cloud testfile: npm run cy:run -- --record --spec "cypress/e2e/my-spec.cy.js"
- Run local testfile: npx cypress run --record --spec "cypress/e2e/my-spec.cy.js"