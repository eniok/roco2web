// src/components/Products.tsx
import { motion } from 'framer-motion';
import { productsData } from '../constants';

const Products = () => {
    return (
        <motion.section
            id="products"
            className="bg-gray-50 pt-20 pb-20"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-6">
                    Featured <span className="text-red-600">Products</span>
                </h2>
                <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    Discover our curated selection of premium furniture designed to accentuate every living space.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {productsData.map((product, index) => (
                         <div key={index} className="relative group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                            <img src={product.imgSrc} alt={product.alt} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"/>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{product.price}</p>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Products;