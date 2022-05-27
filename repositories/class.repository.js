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
    return await client.db("EAD").collection("Classes").find({}).toArray();    
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

export default { 
  createClass,
  getClasses,
  getClass,
  updateClass
}