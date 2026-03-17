import { Box, Typography, Paper, Avatar, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Navbar from "../components/Navbar";

function Profile() {

const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");

return (
<>
<Navbar/>

<Box
sx={{
height:"90vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#e8f0fe,#f1f5ff)"
}}
>

<Paper
elevation={10}
sx={{
width:400,
padding:4,
borderRadius:4,
textAlign:"center",
background:"#ffffff",
boxShadow:"0 20px 60px rgba(0,0,0,0.15)"
}}
>

<Avatar
sx={{
width:80,
height:80,
margin:"auto",
background:"#1a73e8",
mb:2
}}
>
<PersonIcon sx={{fontSize:40}}/>
</Avatar>

<Typography variant="h5" sx={{fontWeight:600}}>
User Profile
</Typography>

<Typography sx={{mt:2,color:"#666"}}>
User ID
</Typography>

<Typography variant="h6" sx={{fontWeight:500}}>
{userId}
</Typography>

<Typography sx={{mt:2,color:"#666"}}>
Role
</Typography>

<Typography
variant="h6"
sx={{
fontWeight:600,
color: role === "ADMIN" ? "#e53935" : "#1a73e8"
}}
>
{role}
</Typography>

<Button
variant="contained"
sx={{
mt:4,
background:"#1a73e8",
borderRadius:2,
"&:hover":{
background:"#0f5cd6"
}
}}
onClick={()=>{
localStorage.clear();
window.location.href="/login";
}}
>
Logout
</Button>

</Paper>

</Box>
</>
);
}

export default Profile;