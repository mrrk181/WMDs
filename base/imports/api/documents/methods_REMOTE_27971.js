import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import personnel from './personnel';
import rateLimit from '../../modules/rate-limit.js';
export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});

export const upsertPerson = new ValidatedMethod({
    name :'personnel.upsert',
    validate : new SimpleSchema({
        _id :{type:String}
        name:{type :String},
        armyNumber:{type:Number},
        dob:{type:String},
        rank:{type:String},
        batchNo:{type: Number},
        medCat:{type:String},
        trade:{type:String},
        currentUnit:{type:String},
        milCourses:{type:[String]},
        children:{type:[String]},
        parents:{type:[String]}

    }).validator(),
    run(person){
        return personnel.upsert({_id:person_id},{$set:person});
    },
});
export const removePerson = new ValidatedMethod({
  name: 'personnel.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    personnel1.remove(_id);
  },
});
