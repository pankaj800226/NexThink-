import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Sidebar from "../components/SideBar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

interface User {
  username: string,
  email: string,
  avatar: string
}

const Profile = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const token = localStorage.getItem('TOKEN')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("You are not login")
        return navigate('/login')
      }

      try {
        setLoader(true)

        const res = await axios.get(`${api}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setProfile(res.data)
        setFormData({
          username: res.data.username,
          email: res.data.email
        })
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch profile")
        setError("Api Fetching Error")
      } finally {
        setLoader(false)

      }
    }
    fetchProfile()
  }, [token, navigate])

  const handleEditProfile = async () => {
    if (!token) {
      toast.error("You are not login")
      return navigate('/login')
    }
    try {
      const res = await axios.put(`${api}/api/user/editProfile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(res.data)
      setEditDialogOpen(false)
      toast.success("Profile updated")

    } catch (error) {
      console.log(error);
      toast.error("Error updating profile")
    
    }
  }

  if (error) return <h2>{error}</h2>
  if (loader) return <Loading />

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main>
        <motion.div
          className="profile_conatiner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="profile_left"
            whileHover={{ scale: 1.05, rotate: 3, boxShadow: "0px 0px 20px rgba(255,255,255,0.2)" }}
          >
            <motion.img
              src={profile?.avatar}
              alt="User Avatar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="profile_right"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{profile?.username}</h1>
            <p>{profile?.email}</p>
            <p>Creater</p>
            <motion.div whileHover={{ scale: 1.1 }} style={{ display: 'inline-block' }}>
              <Button onClick={() => setEditDialogOpen(true)}>
                <Edit />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      <Dialog
        open={editDialogOpen} onClose={() => setEditDialogOpen(false)}
        fullScreen={isMobile} fullWidth maxWidth="sm"
        TransitionComponent={motion.div} // optional: dialog animation
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditProfile}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile;
