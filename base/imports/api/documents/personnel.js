import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

const personnel = new Mongo.Collection('personnel');
export default personnel;
personnel.allow({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    }
});
personnel.deny({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});
personnel.schema = new SimpleSchema({
    name:{
        type: String,
        label:'The Name of the person'
    },
    armyNumber:{
        type:Number
    },
    dob:{
        type:String,
        label:"The DOB of the person"
    },
    rank:{
        type:String,
        label:"The rank"
    },
    batchNo:{
        type:Number
    },
    medCat:{
        type:String,
        label:"Medical category"
    },
    trade:{
        type:String,
        label:"Trade"
    },
    currentUnit:{
        type:String,
        label:"The current unit"
    },
    milCourses:{
        type:[String]
    },
    children:{
        type:[String]
    },
    parents:{
        type:[String]
    }
});
personnel.attachSchema(personnel.schema);
Factory.define('personnel',personnel,{
    name :()=>"Factory Name ",
    armyNumber:()=>12345,
    dob:()=>"Factory 1-Apr-1980",
    rank:()=>"Factory Rank",
    batchNo:()=>25,
    medCat:()=>"Factory Cat",
    trade:()=>"Factory Trade",
    currentUnit:()=>"Factory Unit",
    milCourses:()=>["Factory Course 1","Factory Course 2"],
    children:()=>["Factory 1","Factory 2"],
    parents:()=>["Factory 1","Factory 2"],

})
