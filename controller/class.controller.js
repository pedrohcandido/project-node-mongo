import ServiceClass from "../services/class.service.js"

async function createClass( req, res, next ) {
      try{
         let classInfo = req.body;
         if (!classInfo.name || !classInfo.description || !classInfo.video || !classInfo.data_init || !classInfo.data_end || !classInfo.date_created || !classInfo.date_updated || !classInfo.total_comments ) {
              throw new Error( "Descrição, vídeo, data inicial, data final e data de criação são obrigatórios." );
         }
         await ServiceClass.createClass(classInfo);
         res.end();
         logger.info(`POST /classes - ${JSON.stringify(classInfo)}` );

      } catch (err) {
        next(err);
      }
}

async function getClasses(req, res, next ) {
  try{
    res.send(await ServiceClass.getClasses());
    logger.info("GET /classes");
  
  } catch(err){
    next(err);
  }
}

async function getClass(req, res, next ) {
  try{
    const classId = req.params.id;
    res.send(await ServiceClass.getClass(classId));
    
    logger.info(`GET /classes/${JSON.stringify(classId)}`)

  } catch(err){
    next(err);
  }
}

async function updateClass( req, res, next ) {
  try{
    const classInfo = req.body;
    const classId = req.params._id;
    if (!classInfo.name || !classInfo.description || !classInfo.video || !classInfo.data_init || !classInfo.data_end || !classInfo.date_created || !classInfo.date_updated || !classInfo.total_comments ) {
      throw new Error( "Descrição, vídeo, data inicial, data final e data de criação são obrigatórios." );
   }
   await ServiceClass.updateClass(classInfo, classId);
   res.end();
   logger.info(`PUT /classes - ${JSON.stringify(classInfo)}`)

  } catch (err) {
    next(err);
  }

}

async function deleteClass(req, res, next ) {
  try{
    const classId = req.params._id

    res.send(await ServiceClass.deleteClass(classId));
    logger.info(`DELETE /classes/:_id - ${classId}`)

  } catch (err) {
    next(err);
  }
}

export default {
    createClass,
    getClasses,
    getClass,
    updateClass,
    deleteClass
}