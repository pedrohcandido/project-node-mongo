import { ObjectId } from "mongodb";
import { getClient } from "../config/mongodb.config.js"

async function createClass(classInfo) {
  const client = await getClient();
  try{
      await client.connect();
      await client.db("EAD").collection("Classes").insertOne(classInfo);
  } catch (err) {
    console.log(err)
    throw err;  
  } finally {
    client.close();
  }
}

async function getClasses() {
  const client = await getClient();
  try{
    await client.connect();
    let collection = client.db("EAD").collection("Classes");

    let queryObject = [{
      $lookup:{
        from: "Comments",
        localField: "_id",
        foreignField: "id_class",
        pipeline: [
         { $sort: {data_created: -1} },
         { $limit: 1 }         
        ],
        as: "comments_related"
      }
    }];
    // pipeline = [
    //   { $match : { … } },
    //   { $group : { … } },
    //   { $sort : { … } }
    //  ]
    //[ { $match : { author : "dave" } } ]

    return await collection.aggregate(queryObject).toArray();
    
  } catch (err){
    throw err;
  } finally{
    await client.close();
  }
}



async function getClass(classId){
  const client = await getClient();
  let _id = new ObjectId(classId)

  try{
      await client.connect();      
      return await client.db("EAD").collection("Classes").findOne({ _id });

  } catch (err){
      throw err;
  } finally {
    client.close();
  }
}

async function getLastComments(classId){
  const client = await getClient();
  let _id = new ObjectId(classId)

  try{
      await client.connect();
      return await client.db("EAD").collection("Comments").find({ id_class: _id }).sort({_id:-1}).limit(3).toArray();      
  } catch (err){
      throw err;
  } finally {
    client.close();
  }
}

async function updateClass(classInfo, classId){
  const client = await getClient();
  //let _id = new ObjectId(classInfo.id);
  let _id = new ObjectId(classId);
  
  try{
    await client.connect();
    return await client.db("EAD").collection("Classes").updateOne(
      { _id }, 
      {$set: {...classInfo}}
    
    );

  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

async function deleteClass(classId){
  const client = await getClient();
  let _id = new ObjectId(classId);
  try{
    await client.connect();
    return await client.db("EAD").collection("Classes").deleteOne({ _id })

  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

export default { 
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
  getLastComments,
}

// async function getClasses() {
//   const client = await getClient();
//   try{
//     await client.connect();
//     const classes_info = client.db("EAD").collection("Classes").find({}).toArray((err, info_class) => {
//       console.log(info_class);
//       // info_class.forEach(infoclass => {
//       //   let idclass = infoclass._id;
//       //   const comments = client.db("EAD").collection("Comments").find({id_class: idclass});
//       //   console.log(comments);
//       //   infoclass.last_comment = comments.comment_class
//       //   infoclass.last_comment_date = comments.data_created
//       // });
//     });    
    
//   } catch (err){
//     throw err;
//   } finally{
//     await client.close();
//   }
// }