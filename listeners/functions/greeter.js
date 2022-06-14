const greet = async ({ event, success, error }) => {
    const { person } = event.inputs.person;
    const message = ("Hi! ").concat(person);
    try {
      await success({ greet: message });
    } catch (err) {
      // call error callback with function outputs
      await error('There was an issue', err);
    }
  };
  
  module.exports = { greet };