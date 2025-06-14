import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Grid, Typography, MenuItem, Switch, Box } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { MainContext } from '../../context/index.jsx';
import { useNavigate } from 'react-router';

const ProductAddPage = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { categories } = useContext(MainContext);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        image: null,
        price: "",
        discount: "",
        stock: "",
        category: "",
        featured: false,
        newRelease: false
    });


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setProductData({ ...productData, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else if (type === 'checkbox') {
            setProductData({ ...productData, [name]: checked });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Adding all form data to FormData object
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });


        try {
            const response = await fetch(`${BASE_URL}/product/add`, {
                method: 'POST',
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                alert('Product added successfully!');
                setProductData({
                    title: "",
                    description: "",
                    image: null,
                    price: "",
                    discount: "",
                    stock: "",
                    category: "",
                    featured: false,
                    newRelease: false
                });
                setImagePreview(null);
            } else {
                const errorMessage = await response.text();
                console.error('Failed to add product:', errorMessage);
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred.');
        }
    };

    const handleImageDelete = () => {
        setProductData({ ...productData, image: null });
        setImagePreview(null);
    };

    const handleDiscard = () => {
        navigate('/admin/dashboard');
    }


    return (
        <Box sx={{ padding: 4 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    {/* General Information */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">General Information</Typography>
                                <TextField label="Product Name" name="title" value={productData.title} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label="Description" name="description" value={productData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Product Media and Category */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Product Media
                                </Typography>

                                {/* Upload Button */}
                                <Button variant="outlined" component="label" fullWidth sx={{ mb: 4 }}>
                                    Upload Image
                                    <input type="file" name="image" hidden onChange={handleChange} />
                                </Button>

                                {/* Centered Preview Box */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 200,
                                            height: 140,
                                            border: '2px dashed #ccc',
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            backgroundColor: '#f9f9f9',
                                        }}
                                    >
                                        {imagePreview ? (
                                            <>
                                                <Box
                                                    component="img"
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <IconTrash
                                                    stroke={2}
                                                    onClick={handleImageDelete}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        cursor: 'pointer',
                                                        backgroundColor: 'white',
                                                        borderRadius: '50%',
                                                        padding: '4px',
                                                        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <Typography color="textSecondary" sx={{ textAlign: 'center', px: 2 }}>
                                                Image preview will appear here
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Category
                                </Typography>
                                <TextField
                                    select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                >
                                    {categories && categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Stock */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Available Stock
                                </Typography>
                                <TextField
                                    label="Stock"
                                    name="stock"
                                    value={productData.stock}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                />
                            </CardContent>
                        </Card>
                    </Grid>



                    {/* Pricing */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>Pricing</Typography>
                                    <TextField
                                        label="Base Price"
                                        name="price"
                                        value={productData.price}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                    />
                                    <TextField
                                        label="Discount (%)"
                                        name="discount"
                                        value={productData.discount}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                    />
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Additional Options */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>Additional Options</Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                                        <Typography>Featured</Typography>
                                        <Switch
                                            name="featured"
                                            checked={productData.featured}
                                            onChange={handleChange}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                                        <Typography>New Release</Typography>
                                        <Switch
                                            name="newRelease"
                                            checked={productData.newRelease}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>


                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                            <Button onClick={handleDiscard} variant="outlined" color="error">Discard Changes</Button>
                            <Button variant="contained" color="primary" type="submit">Add Product</Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default ProductAddPage;
