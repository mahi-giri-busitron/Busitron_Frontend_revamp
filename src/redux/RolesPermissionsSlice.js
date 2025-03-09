import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = '/api/v1/role_permissions'; 

export const fetchRolesPermissions = createAsyncThunk(
    'rolesPermissions/fetchRolesPermissions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE}`);
            
            return response.data[0].role_permissions; 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addRole = createAsyncThunk(
    'rolesPermissions/addRole',
    async (roleName, { dispatch, rejectWithValue }) => {
        try {
            const payload = { role: roleName };
            await axios.post(`${API_BASE}/67c19715a7ed1b3ddd180f4c`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            dispatch(fetchRolesPermissions()); 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateRolePermissions = createAsyncThunk(
    'rolesPermissions/updateRolePermissions',
    async ({ roleId, permissions }, { dispatch, rejectWithValue }) => {
        try {
            const payload = { permissions };
            const response = await axios.put(
                `${API_BASE}/67c19715a7ed1b3ddd180f4c/${roleId}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );


            dispatch(fetchRolesPermissions()); 

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteRole = createAsyncThunk(
    'rolesPermissions/deleteRole',
    async (roleId, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`${API_BASE}/67c19715a7ed1b3ddd180f4c/${roleId}`);
            dispatch(fetchRolesPermissions()); 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const resetRolePermissions = createAsyncThunk(
    'rolesPermissions/resetRolePermissions',
    async (roleId, { dispatch, getState, rejectWithValue }) => {
        try {
            const { roles } = getState().rolesPermissions;
            const role = roles.find((r) => r._id === roleId);

            if (!role) {
                return rejectWithValue("Role not found");
            }

            const resetPermissions = {
                permissions: {
                    projects: { add: false, view: false, update: false, delete: false },
                    financial_management: { add: false, view: false, update: false, delete: false },
                    tasks: { add: false, view: false, update: false, delete: false },
                    manage_users: { add: false, view: false, update: false, delete: false },
                    tickets: { add: false, view: false, update: false, delete: false },
                    Performance_tracking: { add: false, view: false, update: false, delete: false },

                },
            };

            await axios.put(`${API_BASE}/67c19715a7ed1b3ddd180f4c/${roleId}`, resetPermissions, {
                headers: { "Content-Type": "application/json" },
            });

            dispatch(fetchRolesPermissions()); 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const rolesPermissionsSlice = createSlice({
    name: 'rolesPermissions',
    initialState: {
        roles: [],
        permissions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRolesPermissions.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
                state.permissions = action.payload;
            })
            .addCase(fetchRolesPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addRole.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateRolePermissions.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(resetRolePermissions.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default rolesPermissionsSlice.reducer;
