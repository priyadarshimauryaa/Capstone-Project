import { useEffect, useState } from "react";
import { getDownloads, getApps } from "../services/api";
import Navbar from "../components/Navbar";

import {
Box,
Typography,
Card,
CardContent,
Grid,
Avatar
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

function Downloads() {

const [downloads, setDownloads] = useState([]);
const [apps, setApps] = useState([]);

useEffect(() => {

getDownloads().then((res)=>{
setDownloads(res.data);
});

getApps().then((res)=>{
setApps(res.data);
});

}, []);

const getAppName = (appId) => {
const app = apps.find(a => a.id === appId);
return app ? app.name : "Unknown App";
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
Downloaded Apps
</Typography>

<Grid container spacing={3}>

{downloads.map((d,index)=> (

<Grid item xs={12} md={6} lg={4} key={index}>

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
sx={{
background:"#34a853"
}}
>
<DownloadIcon/>
</Avatar>

<Box>

<Typography
variant="h6"
sx={{fontWeight:600}}
>
{getAppName(d.appId)}
</Typography>

<Typography
sx={{
fontSize:"14px",
color:"#777"
}}
>
Downloaded at
</Typography>

<Typography
sx={{
fontSize:"14px",
fontWeight:500
}}
>
{new Date(d.downloadTime).toLocaleString()}
</Typography>

</Box>

</CardContent>

</Card>

</Grid>

))}

</Grid>

</Box>
</>
);

}

export default Downloads;