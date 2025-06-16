import React, { useContext, useState, useEffect } from 'react';
import {
    Container, Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, CircularProgress, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Pagination, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { MainContext } from '../../context/index.jsx';
import { useNavigate } from 'react-router';
import { Chip } from '@mui/material';
import AccessDenied from '../../Error/AccessDenied.jsx'


const AllPermission = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { adminRole } = useContext(MainContext);
    const [allPermission, setAllPermission] = useState([])
    const permissionPerPage = 10;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    if (adminRole?.toLowerCase() !== "admin") {
        return (
            <AccessDenied />
        );
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    useEffect(() => {
        fetchPermission();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const totalPages = Math.ceil(allPermission.length / permissionPerPage);
    const indexOfLastPermission = currentPage * permissionPerPage;
    const indexOfFirstPermission = indexOfLastPermission - permissionPerPage;
    const visiblePermission = allPermission.slice(indexOfFirstPermission, indexOfLastPermission);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    const handleAddRole = async () => {
        const { name, email, password, role } = formData;

        // Proper validation
        if (!name || !email || !password || !role) {
            return alert("All fields are required!");
        }

        try {
            const response = await fetch(`${BASE_URL}/admin/create-permission`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Error adding role");

            alert("Role added successfully!");
            setOpenModal(false);
            setFormData({ name: '', email: '', password: '', role: '' });
            fetchPermission();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    const handleDelete = async (email) => {
        if (!window.confirm("Are you sure you want to delete this Role?")) return;

        try {
            const response = await fetch(`${BASE_URL}/admin/delete-permission`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error deleting Role");

            alert("Role deleted successfully!");
            fetchPermission();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    const handleEdit = (email, role) => {
        setEditRole({ email, role });
        setOpenEditModal(true);
    };


    const handleEditRole = async () => {
        if (!editRole?.email || !editRole?.role) {
            return alert("Email or role is missing. Please reload and try again.");
        }

        try {
            const response = await fetch(`${BASE_URL}/admin/update-permission`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: editRole.email,
                    role: editRole.role
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Error updating role");

            alert("Role updated successfully!");
            setOpenEditModal(false);
            setEditRole(null);
            fetchPermission();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    const fetchPermission = async () => {

        try {
            const response = await fetch(`${BASE_URL}/admin/all`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Error fetching permission");
            }
            setAllPermission(data);
        }
        catch (error) {
            alert(`Error : ${error.message}`);
        }

    }

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" my={4}>
                <Button variant="contained" color="error" onClick={() => navigate('/admin/dashboard')}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                    Add Role
                </Button>
            </Box>


            {loading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : allPermission.length === 0 ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <p>No Permission found</p>
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }} sx={{
                                    "@media (min-width: 1024px)": {
                                        pl: 5
                                    }
                                }} align="left">No</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}
                                    align="center"
                                    sx={{
                                        "@media (min-width: 1024px)": {
                                            pl: 10
                                        }
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}
                                    align="center"
                                    sx={{
                                        "@media (min-width: 1024px)": {
                                            pl: 10
                                        }
                                    }}
                                >
                                    Email
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}
                                    align="center"
                                    sx={{
                                        "@media (min-width: 1024px)": {
                                            pl: 10
                                        }
                                    }}
                                >
                                    Role
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="right" sx={{ pr: 18 }}>Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visiblePermission.map((admin, index) => (

                                <TableRow key={admin._id}>
                                    <TableCell sx={{
                                        "@media (min-width: 1024px)": {
                                            pl: 5
                                        }
                                    }} align="left">{indexOfFirstPermission + index + 1}</TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            "@media (min-width: 1024px)": {
                                                pl: 10,
                                            }
                                        }}
                                    >
                                        {admin.name}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            "@media (min-width: 1024px)": {
                                                pl: 10,
                                            }
                                        }}
                                    >
                                        {admin.email}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            "@media (min-width: 1024px)": {
                                                pl: 10,
                                            },
                                        }}
                                    >
                                        {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                                        {admin.isRoot && (
                                            <Chip
                                                label="Root"
                                                color="error"
                                                size="small"
                                                sx={{ ml: 1, fontWeight: 'bold' }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ pr: 12 }} align="right">
                                        <Button
                                            disabled={adminRole?.toLowerCase() !== "admin"}
                                            onClick={() => { handleEdit(admin.email, admin.role) }}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            style={{
                                                border: "2px solid", borderRadius: '8px'
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            disabled={adminRole?.toLowerCase() !== "admin"}
                                            onClick={() => handleDelete(admin.email)}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            style={{ marginLeft: '8px', border: "2px solid", borderRadius: '8px' }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    "& .MuiDialog-paper": {
                        width: "500px",
                        borderRadius: 3,
                        padding: 2,
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
                    Add New Permission
                </DialogTitle>

                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ display: 'grid', gap: 2, mt: 1 }}
                    >
                        <TextField
                            name="name"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                value={formData.role}
                                label="Role"
                                onChange={handleChange}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                    <Button onClick={() => setOpenModal(false)} color="error" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleAddRole} color="primary" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Edit Role Modal */}
            <Dialog
                open={openEditModal}
                onClose={() => handleEditRole(false)}
                maxWidth="sm"
                fullWidth
                sx={{ "& .MuiDialog-paper": { width: "500px", minHeight: "250px" } }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>Edit Role</DialogTitle>

                <DialogContent
                    sx={{
                        minHeight: "150px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    {/* Email Field (Disabled) */}
                    <TextField
                        label="Email"
                        value={editRole?.email || ""}
                        disabled
                        fullWidth
                    />

                    {/* Role Dropdown */}
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Select Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={editRole?.role || ""}
                            label="Select Role"
                            onChange={(e) => setEditRole({ ...editRole, role: e.target.value })}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="editor">Editor</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                            {/* Add more roles as needed */}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)} sx={{ color: "red" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleEditRole} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>




            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

        </Container>
    );
};

export default AllPermission;
