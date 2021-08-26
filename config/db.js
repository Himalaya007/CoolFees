import mongoose from "mongoose";

const connect = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://bunny:ketan123@cluster0.5ejnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`mongo connected on port ${con.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

export default connect;
