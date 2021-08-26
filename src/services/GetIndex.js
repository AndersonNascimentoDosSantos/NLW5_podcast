import Mongoose from 'mongoose'
let Conn = null
export default async function GetIndex(model) {
  if (Conn == null) {
    Conn = await Mongoose.createConnection(process.env.URI, {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  await Conn

  const Model = Conn.model(...model)
  // console.log(conn)
  const doc = await Model.find()
  // console.log(doc)
  return {
    Conn,
    doc
  }
}
