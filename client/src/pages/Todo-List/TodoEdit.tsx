import Sidebar from "../../components/SideBar";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper
} from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { useState } from "react";

const TodoEdit = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        priority: "",
        status: "",
        createdAt: new Date().toISOString()
    })

    const [btnLoader, setBtnLoader] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // handle edit 
    const handleEdit = () => {
        console.log(formData)
    }


    return (
        <div className="dashboard_container">
            <Sidebar />

            <main>
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            // width: 460,
                            padding: 4,
                            borderRadius: 3,
                            background: "#151a1f"
                        }}
                    >
                        <Typography
                            variant="h5"
                            mb={3}
                            textAlign="center"
                            color="#fff"
                            fontWeight="bold"
                        >
                            Edit Todo
                        </Typography>

                        <TextField
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth label="Title" name="title" sx={inputStyle} />

                        <TextField
                            value={formData.description}
                            onChange={handleChange}

                            fullWidth multiline rows={3} label="Description" name="description" sx={inputStyle} />

                        <TextField
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth type="number" label="Price" name="price" sx={inputStyle} />

                        <TextField
                            value={formData.category}
                            onChange={handleChange}

                            fullWidth select label="Category" name="category" sx={inputStyle}>
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Study">Study</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>

                        <TextField
                            value={formData.priority}
                            onChange={handleChange}

                            fullWidth select label="Priority" name="priority" sx={inputStyle}>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </TextField>

                        <TextField
                            value={formData.status}
                            fullWidth select label="Status" name="Status" sx={inputStyle}>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="inprogress">In Progress</MenuItem>
                            <MenuItem value="done">Done</MenuItem>
                        </TextField>

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddTask />}
                            onClick={handleEdit}
                            sx={{
                                mt: 3,
                                py: 1.4,
                                background: "linear-gradient(135deg,#6a5af9,#9a6bff)",
                                fontWeight: "bold",
                                borderRadius: 2
                            }}
                        >
                            {btnLoader ? "Loading..." : " Edit Todo"}
                        </Button>
                    </Paper>
                </Box>
            </main>
        </div>
    );
};

const inputStyle = {
    mb: 2,
    "& label": { color: "#aaa" },
    "& label.Mui-focused": { color: "#6a5af9" },
    "& .MuiOutlinedInput-root": {
        color: "#fff",
        "& fieldset": { borderColor: "#2a2f36" },
        "&:hover fieldset": { borderColor: "#6a5af9" },
        "&.Mui-focused fieldset": { borderColor: "#9a6bff" }
    }
};

export default TodoEdit;
