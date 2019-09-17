import {Aurelia} from 'aurelia-framework';

(async () => {
  const aurelia = new Aurelia();
  aurelia
    .use
      .standardConfiguration()
      .feature(`/data-input-selector/src/resources/index.js`);

  aurelia
    .start()
    .then(async () => {
      aurelia.setRoot(`/data-input-selector/src/app.js`, document.body);
    })
    .catch(ex => {
      document.body.textContent = `Bootstrap error: `;
    });

})();
