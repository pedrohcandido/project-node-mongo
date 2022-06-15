import { ObjectId } from "mongodb";
import ServiceComment from "../services/comment.service.js";

async function createComment( req, res, next ) {
  try{
    let comment = req.body;
    comment.id_class = new ObjectId(comment.id_class);
    if(!comment.id_class || !comment.comment || !comment.data_created ){
      throw new Error("campos obrigatórios");
    }
    console.log(comment)
    await ServiceComment.createComment(comment);
    res.end();
    logger.info(`POST /comment - ${JSON.stringify(comment)}`)

  } catch(err){
    next(err);
  }
}

async function getComments( req, res, next ) {
  try{
    res.send(await ServiceComment.getComments());   
    logger.info(`GET /comment `)

  } catch( err ){
    next(err);
  }
}

async function deleteComment( req, res, next ) {
  const commentId = req.params._id
  try{
    res.send(await ServiceComment.deleteComment(commentId));
    logger.info(`DELETE /Comments - ${JSON.stringify(commentId)}`)
  } catch( err ) {
    next(err);
  }
}

export default {
  createComment,
  getComments,
  deleteComment
}