import ClassRepository from "../repositories/class.repository.js"

async function createClass(classInfo) {
    return await ClassRepository.createClass(classInfo); 
}

async function getClasses() {
  return await ClassRepository.getClasses();
}

async function getClass(id) {
  const infoClass = await ClassRepository.getClass(id);
  infoClass.comments = await ClassRepository.getLastComments(id);
  return infoClass;
}

async function updateClass(classInfo, classId) {
  return await ClassRepository.updateClass(classInfo, classId);
}

async function deleteClass(classId) {
  return await ClassRepository.deleteClass(classId);
}


export default {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass
}