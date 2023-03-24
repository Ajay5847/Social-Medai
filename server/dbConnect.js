const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const mongoUri =
      "mongodb+srv://Ajay91:s7m1QUneCMdZNWxX@cluster0.le10y5b.mongodb.net/?retryWrites=true&w=majority";

    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDb connected");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
