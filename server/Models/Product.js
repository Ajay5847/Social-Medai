const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  productImage: {
    publicId: String,
    url: String,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true
  },
  productStock: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  productVariants: {
    type: String,
    ref: "user"
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('post', productSchema);
