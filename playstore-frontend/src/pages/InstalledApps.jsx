import { useEffect, useState } from "react";
import { getUserDownloads, getApps, uninstallApp } from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import {
Box,
Typography,
Card,
CardContent,
Grid,
Avatar,
Button
} from "@mui/material";

import AndroidIcon from "@mui/icons-material/Android";

function InstalledApps() {

const [installedApps, setInstalledApps] = useState([]);
const [apps, setApps] = useState([]);

const navigate = useNavigate();

const userId = localStorage.getItem("userId");

useEffect(() => {

getUserDownloads(userId).then((res)=>{
setInstalledApps(res.data);
});

getApps().then((res)=>{
setApps(res.data);
});

}, [userId]);

const installedAppDetails = apps.filter(app =>
installedApps.includes(app.id)
);

/* ⭐ UNINSTALL FUNCTION */

const handleUninstall = (appId) => {

uninstallApp(appId,userId).then(()=>{

setInstalledApps(prev => prev.filter(id => id !== appId));

alert("App uninstalled");

});

};

return (
<>
<Navbar/>

<Box
sx={{
padding:4,
background:"linear-gradient(135deg,#eef3ff,#f8fbff)",
minHeight:"90vh"
}}
>

<Typography
variant="h4"
sx={{
fontWeight:600,
mb:4
}}
>
Installed Apps
</Typography>

<Grid container spacing={3}>

{installedAppDetails.map((app)=> (

<Grid item xs={12} md={6} lg={4} key={app.id}>

<Card
sx={{
borderRadius:3,
boxShadow:"0 10px 30px rgba(0,0,0,0.1)",
transition:"0.3s",
"&:hover":{
transform:"translateY(-5px)"
}
}}
>

<CardContent
sx={{
display:"flex",
alignItems:"center",
gap:2
}}
>

<Avatar
src={app.image}
sx={{
width:60,
height:60
}}
>
<AndroidIcon/>
</Avatar>

<Box sx={{flexGrow:1}}>

<Typography
variant="h6"
sx={{fontWeight:600}}
>
{app.name}
</Typography>

<Typography
sx={{
fontSize:"14px",
color:"#777"
}}
>
{app.category}
</Typography>

</Box>

<Button
variant="contained"
sx={{
background:"#1a73e8",
mr:1,
"&:hover":{
background:"#0f5cd6"
}
}}
onClick={()=>navigate("/app",{state:app})}
>
Open
</Button>

<Button
variant="outlined"
color="error"
onClick={()=>handleUninstall(app.id)}
>
Uninstall
</Button>

</CardContent>

</Card>

</Grid>

))}

</Grid>

</Box>

</>
);

}

export default InstalledApps;