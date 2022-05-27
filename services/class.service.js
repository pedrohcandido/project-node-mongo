import ClassRepository from "../repositories/class.repository.js"

async function createClass(classInfo) {
    return await ClassRepository.createClass(classInfo); 
}

async function getClasses() {
  return await ClassRepository.getClasses();
}

async function getClass(id) {
  return await ClassRepository.getClass(id);
}

async function updateClass(classInfo, classId) {
  return await ClassRepository.updateClass(classInfo, classId);
}


export default {
  createClass,
  getClasses,
  getClass,
  updateClass
}