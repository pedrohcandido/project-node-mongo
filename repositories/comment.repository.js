import { ObjectId } from "mongodb";
import { getClient } from "../config/mongodb.config.js"

async function createComment(comment) {
  const client = await getClient();
  let id_class = comment.id_class;
  try{
      await client.connect();
      await client.db("EAD").collection("Comments").insertOne(comment);
      const classInfo = await client.db("EAD").collection("Classes").findOne({_id: id_class})
      let total_comments = classInfo.total_comments
      total_comments++
      await client.db("EAD").collection("Classes").updateOne({_id: id_class}, {$set: { total_comments }})
  } catch (err) {
    throw err;  
  } finally {
    client.close();
  }
}

async function getComments() {
  const client = await getClient();

  try{
    await client.connect();
    const resposta = await client.db("EAD").collection("Comments").find({}).toArray();
    console.log(resposta);
    return resposta
  } catch(err){
    throw err;
  } finally {
    client.close();
  }
}

async function deleteComment(commentId) {
  const client = await getClient();
  let _id = new ObjectId(commentId)
  try{
    await client.connect();
    return await client.db("EAD").collection("Comments").deleteOne({ _id });

  } catch( err ){
    throw err;

  } finally{
    client.close
  }
}

export default {
  createComment,
  getComments,
  deleteComment
}