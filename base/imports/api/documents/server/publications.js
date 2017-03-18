import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../documents';
import personnel from '../personnel';

Meteor.publish('documents.list', () => Documents.find());
Meteor.publish('personnel.list', () => personnel.find());

Meteor.publish('documents.view', (_id) => {
  check(_id, String);
  return Documents.find(_id);
});
Meteor.publish('personnel.view', (_id) => {
  return personnel.find(_id);
});
