const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("MONGO CONNECTED");
} catch (error) {
  console.log(error);
}
