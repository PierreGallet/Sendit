Prospects = new Mongo.Collection("prospects");

Prospects.allow({
  insert: function (){
      return true;
  }
 });
