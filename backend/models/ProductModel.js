import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    }
});
const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
//if it will be there it will use || else create new model
export default ProductModel; 