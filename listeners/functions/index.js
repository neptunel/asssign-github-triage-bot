const { reverseString } = require('./reverse-string');
const { greet } = require('./greeter');
const { assignTriageDuty} = require('./assign-triage-duty');
const { addPerson } = require('./add-person');
const { removePerson } = require('./remove-person');
const { advanceRotationOrder } = require('./advance-rotation-order');


module.exports.register = (app) => {
  app.function('reverse', reverseString);
  app.function('greeter', greet);
  app.function('assignTriageDuty', assignTriageDuty);
  app.function('addPerson', addPerson);
  app.function('removePerson', removePerson);
  app.function('advanceRotationOrder', advanceRotationOrder);
};
