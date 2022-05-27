import mongodb from "mongodb";

async function getClient() {
  
  const uri = "mongodb+srv://root:root@ead.4suq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  return new mongodb.MongoClient(uri);  
  
}

export { getClient }