import commentRepository from "../repositories/comment.repository.js";

async function createComment( comment ) {
  return await commentRepository.createComment(comment);
}

async function getComments() {
  return await commentRepository.getComments();
}

async function deleteComment( commentId ) {
  return await commentRepository.deleteComment(commentId);
}

export default {
  createComment,
  getComments,
  deleteComment
}