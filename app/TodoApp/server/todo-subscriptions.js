import Tasks from 'TodoApp/collections/Tasks';
import Cities from 'TodoApp/collections/Cities';

// This code only runs on the server
Meteor.publish('tasks', function () {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});


  Meteor.publish("data", function () {
    return Cities.orderBy({ index: 'id' }).limit(100);
  });
