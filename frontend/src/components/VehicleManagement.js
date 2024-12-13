import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Typography,
    DialogContentText,
    CircularProgress,
    useMediaQuery,
    useTheme,
    IconButton
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, index) => currentYear - index);

const VehicleManagement = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [vehicles, setVehicles] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        Name: '',
        status: '',
        make: '',
        model: '',
        year: '',
        color: '',
        registrationNumber: ''
    });
    const [errors, setErrors] = useState({
        Name: '',
        status: '',
        make: '',
        model: '',
        year: '',
        color: '',
        registrationNumber: ''
    });
    const [editing, setEditing] = useState(null);

    const handleDeleteClick = useCallback((vehicle) => {
        setSelectedVehicle(vehicle);
        setDeleteConfirmOpen(true);
    }, []);

    const handleEdit = useCallback((vehicle) => {
        setEditing(vehicle._id);
        setFormData({
            Name: vehicle.Name,
            status: vehicle.status,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            color: vehicle.color,
            registrationNumber: vehicle.registrationNumber
        });
        setOpen(true);
    }, []);
    const getColumns = useCallback(() => {
        const baseColumns = [
            {
                field: 'Name',
                headerName: 'Name',
                flex: 1,
                minWidth: 100,
            },
            {
                field: 'status',
                headerName: 'status',
                flex: 1,
                minWidth: 100,
            },
            {
                field: 'make',
                headerName: 'Make',
                flex: 1,
                minWidth: 100,
            },
            {
                field: 'model',
                headerName: 'Model',
                flex: 1,
                minWidth: 100,
            },
            {
                field: 'year',
                headerName: 'Year',
                flex: 1,
                minWidth: 80,
            },
            {
                field: 'color',
                headerName: 'Color',
                flex: 1,
                minWidth: 90,
                hide: isMobile,
            },
            {
                field: 'registrationNumber',
                headerName: 'Registration',
                flex: 1,
                minWidth: 120,
                hide: isMobile,
            },
            {
                field: 'updatedAt',
                headerName: 'Last Updated',
                flex: 1,
                minWidth: 120,
                hide: isMobile,
            },
            {
                field: 'actions',
                headerName: 'Actions',
                flex: 1,
                minWidth: 120,
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {isMobile || isTablet ? (
                            // Mobile/Tablet view - icon only buttons
                            <>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={() => handleEdit(params.row)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteClick(params.row)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </>
                        ) : (
                            // Desktop view - buttons with text
                            <>
                                <Button
                                    color="primary"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleEdit(params.row)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteClick(params.row)}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </Box>
                ),
            },
        ];

        return baseColumns;
    }, [isMobile, isTablet, handleEdit, handleDeleteClick]); // Added missing dependencies

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('https://vehicle-management-ncqd.onrender.com/api/vehicles');
            const vehiclesWithId = response.data.map(vehicle => ({
                ...vehicle,
                id: vehicle._id
            }));
            setVehicles(vehiclesWithId);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({
            make: '',
            model: '',
            year: '',
            color: '',
            registrationNumber: ''
        });
        setErrors({
            make: '',
            model: '',
            year: '',
            color: '',
            registrationNumber: ''
        });
        setEditing(null);
    };
    const validateForm = () => {
        let tempErrors = {
            Name: '',
            status: '',
            make: '',
            model: '',
            year: '',
            color: '',
            registrationNumber: ''
        };
        let isValid = true;
        // name validation
        if (!formData.Name) {
            tempErrors.Name = 'Name is required';
            isValid = false;
        } else if (formData.Name.length < 2) {
            tempErrors.Name = 'Name must be at least 2 characters';
            isValid = false;
        }

        // status validation
        if (!formData.status) {
            tempErrors.status = 'status is required';
            isValid = false;
        } else if (formData.status.length < 2) {
            tempErrors.status = 'status must be at least 2 characters';
            isValid = false;
        }
        // Make validation
        if (!formData.make) {
            tempErrors.make = 'Make is required';
            isValid = false;
        } else if (formData.make.length < 2) {
            tempErrors.make = 'Make must be at least 2 characters';
            isValid = false;
        }

        // Model validation
        if (!formData.model) {
            tempErrors.model = 'Model is required';
            isValid = false;
        } else if (formData.model.length < 2) {
            tempErrors.model = 'Model must be at least 2 characters';
            isValid = false;
        }

        // Year validation
        if (!formData.year) {
            tempErrors.year = 'Year is required';
            isValid = false;
        }

        // Color validation
        if (!formData.color) {
            tempErrors.color = 'Color is required';
            isValid = false;
        } else if (formData.color.length < 3) {
            tempErrors.color = 'Color must be at least 3 characters';
            isValid = false;
        }

        // Registration Number validation
        if (!formData.registrationNumber) {
            tempErrors.registrationNumber = 'Registration Number is required';
            isValid = false;
        } else if (formData.registrationNumber.length < 5) {
            tempErrors.registrationNumber = 'Registration Number must be at least 5 characters';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        try {
            if (editing) {
                await axios.put(`https://vehicle-management-ncqd.onrender.com/api/vehicles/${editing}`, formData);
            } else {
                await axios.post('https://vehicle-management-ncqd.onrender.com/api/vehicles', formData);
            }
            handleClose();
            fetchVehicles();
        } catch (error) {
            console.error('Error saving vehicle:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`https://vehicle-management-ncqd.onrender.com/api/vehicles/${selectedVehicle._id}`);
            setDeleteConfirmOpen(false);
            setSelectedVehicle(null);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
        setSelectedVehicle(null);
    };


    return (
        <Box className={isMobile ? "mx-auto p-1":"mx-auto p-4"}>
            <Typography className='flex justify-center items-center' variant="h4" sx={{ color: 'text.primary', mb: 4 }}>
                {isMobile? "VMS":"Vehicle Management System"}
            </Typography>

            <Box sx={{
                height: 500,
                width: '100%',
                mb: 2,
                '& .MuiDataGrid-root': {
                    border: 'none',
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#f0f0f0'
                        }`,
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
                    borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
                    borderTop: 'none',
                },
                '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
                    padding: 2,
                },
            }}>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    rows={vehicles}
                    columns={getColumns()}
                    pageSize={isMobile ? 5 : 10}
                    rowsPerPageOptions={isMobile ? [5] : [10, 25, 50]}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    disableSelectionOnClick
                    autoHeight
                    density={isMobile ? "compact" : "standard"}
                />
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: isMobile ? 16 : 32,
                    right: isMobile ? 16 : 32,
                    zIndex: 1000
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={!isMobile && <AddIcon />}
                    onClick={handleOpen}
                    sx={{
                        borderRadius: isMobile ? '50%' : '28px',
                        padding: isMobile ? '12px' : '12px 24px',
                        minWidth: isMobile ? '0' : 'auto',
                        width: isMobile ? '56px' : 'auto',
                        height: isMobile ? '56px' : 'auto',
                        boxShadow: 3,
                        '&:hover': {
                            boxShadow: 6,
                        }
                    }}
                >
                    {isMobile ? <AddIcon /> : 'Add New Vehicle'}
                </Button>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        m: isMobile ? 0 : 2,
                    }
                }}
            >
                <DialogTitle>
                    {editing ? 'Edit Vehicle' : 'Add New Vehicle'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Box sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
                        }}>
                            <TextField
                                label="Name"
                                value={formData.Name}
                                onChange={(e) => {
                                    setFormData({ ...formData, Name: e.target.value });
                                    if (errors.Name) setErrors({ ...errors, Name: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.Name)}
                                helperText={errors.Name}
                            />
                            <TextField
                                label="status"
                                value={formData.status}
                                onChange={(e) => {
                                    setFormData({ ...formData, status: e.target.value });
                                    if (errors.status) setErrors({ ...errors, status: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.status)}
                                helperText={errors.status}
                            />
                            <TextField
                                label="Make"
                                value={formData.make}
                                onChange={(e) => {
                                    setFormData({ ...formData, make: e.target.value });
                                    if (errors.make) setErrors({ ...errors, make: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.make)}
                                helperText={errors.make}
                            />
                            <TextField
                                label="Model"
                                value={formData.model}
                                onChange={(e) => {
                                    setFormData({ ...formData, model: e.target.value });
                                    if (errors.model) setErrors({ ...errors, model: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.model)}
                                helperText={errors.model}
                            />
                            <TextField
                                select
                                label="Select Year"
                                value={formData.year}
                                onChange={(e) => {
                                    setFormData({ ...formData, year: e.target.value });
                                    if (errors.year) setErrors({ ...errors, year: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.year)}
                                helperText={errors.year}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value=""></option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                label="Color"
                                value={formData.color}
                                onChange={(e) => {
                                    setFormData({ ...formData, color: e.target.value });
                                    if (errors.color) setErrors({ ...errors, color: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.color)}
                                helperText={errors.color}
                            />
                            <TextField
                                label="Registration Number"
                                value={formData.registrationNumber}
                                onChange={(e) => {
                                    setFormData({ ...formData, registrationNumber: e.target.value });
                                    if (errors.registrationNumber) setErrors({ ...errors, registrationNumber: '' });
                                }}
                                required
                                fullWidth
                                margin="dense"
                                error={Boolean(errors.registrationNumber)}
                                helperText={errors.registrationNumber}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                        >
                            {isSubmitting ? 'Saving...' : (editing ? 'Update' : 'Add')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={deleteConfirmOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        m: isMobile ? 0 : 2,
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the vehicle {selectedVehicle?.Name} {selectedVehicle?.model}?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={isDeleting}
                        startIcon={isDeleting ? <CircularProgress size={20} /> : null}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VehicleManagement;