import { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

import {
Box,
Button,
TextField,
Typography,
Paper,
AppBar,
Toolbar
} from "@mui/material";

import AndroidIcon from "@mui/icons-material/Android";

function Login() {

const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = (e) => {
e.preventDefault();

loginUser(formData)
.then((res) => {

console.log("LOGIN RESPONSE:", res.data);

localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
localStorage.setItem("userId", res.data.userId);

if (res.data.role === "ADMIN") {
navigate("/admin");
} else {
navigate("/dashboard");
}

})
.catch(() => {
alert("Login failed");
});
};

return (

<Box
sx={{
height:"100vh",
fontFamily:"Roboto",
background:"linear-gradient(135deg,#f1f5ff,#e3ecff)"
}}
>

{/* HEADER */}

<AppBar
position="static"
sx={{
background:"#ffffff",
color:"#000",
boxShadow:"0 2px 10px rgba(0,0,0,0.08)"
}}
>

<Toolbar>

<AndroidIcon sx={{fontSize:38,color:"#34a853",mr:1}}/>

<Typography variant="h6" sx={{fontWeight:600}}>
Google Play
</Typography>

</Toolbar>

</AppBar>


{/* MAIN SECTION */}

<Box
sx={{
display:"grid",
gridTemplateColumns:"1fr 420px",
height:"90vh"
}}
>


{/* LEFT SIDE */}

<Box
sx={{
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
textAlign:"center",
px:6
}}
>

<img
src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
width="80"
style={{marginBottom:"20px"}}
/>

<Typography
variant="h2"
sx={{
fontWeight:700,
background:"linear-gradient(90deg,#1a73e8,#34a853)",
WebkitBackgroundClip:"text",
WebkitTextFillColor:"transparent"
}}
>
Discover Amazing Apps
</Typography>

<Typography
sx={{
mt:2,
fontSize:"18px",
color:"#666"
}}
>
Millions of apps, games, music and more.
</Typography>


<Box sx={{display:"flex",gap:4,mt:5}}>

<img
src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
width="50"
/>

<img
src="https://cdn-icons-png.flaticon.com/512/174/174872.png"
width="50"
/>

<img
src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
width="50"
/>

</Box>


<Box sx={{mt:4}}>

<img
src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
width="200"
/>

</Box>

</Box>


{/* LOGIN CARD */}

<Box
sx={{
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<Paper
elevation={8}
sx={{
padding:5,
width:350,
borderRadius:4,
display:"flex",
flexDirection:"column",
gap:2,
background:"rgba(255,255,255,0.9)",
backdropFilter:"blur(10px)",
boxShadow:"0 20px 60px rgba(0,0,0,0.15)",
transition:"0.3s",
"&:hover":{
transform:"translateY(-6px)"
}
}}
>

<Typography
variant="h5"
sx={{
textAlign:"center",
fontWeight:600
}}
>
Login
</Typography>


<Link to="/register" style={{textDecoration:"none"}}>

<Button
variant="contained"
fullWidth
sx={{
background:"#34a853",
fontWeight:600,
"&:hover":{
background:"#2c8c46"
}
}}
>
REGISTER
</Button>

</Link>


<form onSubmit={handleSubmit}>

<TextField
name="email"
label="Email"
fullWidth
margin="normal"
onChange={handleChange}
sx={{
"& .MuiOutlinedInput-root":{
borderRadius:2
}
}}
/>

<TextField
name="password"
label="Password"
type="password"
fullWidth
margin="normal"
onChange={handleChange}
sx={{
"& .MuiOutlinedInput-root":{
borderRadius:2
}
}}
/>


<Button
type="submit"
variant="contained"
fullWidth
sx={{
mt:2,
background:"#1a73e8",
fontWeight:"bold",
letterSpacing:1,
borderRadius:2,
"&:hover":{
background:"#0f5cd6"
}
}}
>
LOGIN
</Button>

</form>

</Paper>

</Box>

</Box>

</Box>
);
}

export default Login;