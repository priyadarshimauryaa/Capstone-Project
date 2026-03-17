import { useEffect, useState } from "react";
import { getApps, addReview, downloadApp, uninstallApp, getRating, getReviews, getUserDownloads } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

const [apps, setApps] = useState([]);
const [installedApps, setInstalledApps] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [ratings, setRatings] = useState({});
const [reviewInputs, setReviewInputs] = useState({});
const [reviews, setReviews] = useState({});

const navigate = useNavigate();

const userId = Number(localStorage.getItem("userId"));

useEffect(() => {

getApps().then((res) => {

setApps(res.data);

res.data.forEach((app) => {

if(!app || !app.id) return;

getRating(app.id).then((r) => {

setRatings(prev => ({
...prev,
[app.id]: r.data
}));

});

getReviews(app.id).then((rev)=>{

setReviews(prev=>({
...prev,
[app.id]: rev.data
}));

});

});

});

if(userId){
getUserDownloads(userId).then((res)=>{
setInstalledApps(res.data);
});
}

}, [userId]);


/* INSTALL */

const handleInstall = (appId) => {

if(!userId){
alert("User not logged in");
return;
}

downloadApp(appId,userId).then(()=>{

setInstalledApps(prev => [...prev, appId]);

alert("App installed successfully");

});

};


/* UNINSTALL */

const handleUninstall = (appId) => {

uninstallApp(appId,userId).then(()=>{

setInstalledApps(prev => prev.filter(id => id !== appId));

alert("App uninstalled");

});

};


/* REVIEW */

const handleReview = (appId) => {

const review = reviewInputs[appId];
if(!review) return;

const ratingValue = parseFloat(review.rating);

if(isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5){
alert("Rating must be between 1 and 5");
return;
}

addReview({
appId: appId,
comment: review.comment,
rating: ratingValue
}).then(() => {

alert("Review submitted");

setReviewInputs({
...reviewInputs,
[appId]: { comment:"", rating:"" }
});

getRating(appId).then((r)=>{

setRatings(prev=>({
...prev,
[appId]:r.data
}));

});

});

};


/* SORT TOP RATED */

const sortedApps = [...apps].sort((a,b)=>{
return (ratings[b.id] || 0) - (ratings[a.id] || 0);
});


return (
<>
<Navbar />

<div style={container}>

<h1 style={{marginBottom:"30px"}}>PlayStore Dashboard</h1>

<div style={filterBox}>

<input
placeholder="Search apps..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={inputStyle}
/>

<select
onChange={(e)=>setCategory(e.target.value)}
style={inputStyle}
>

<option value="">All Categories</option>
<option value="Social">Social</option>
<option value="Gaming">Gaming</option>
<option value="Education">Education</option>
<option value="Music">Music</option>

</select>

</div>


<h2>⭐ Top Rated Apps</h2>

<div style={grid}>

{sortedApps.slice(0,3).map((app)=>(

<div key={app.id} style={smallCard}>

<img
src={app.image || "https://cdn-icons-png.flaticon.com/512/888/888857.png"}
style={{width:"40px"}}
/>

<h3>{app.name}</h3>

<p>{app.category}</p>

<p style={{color:"#fbbc04"}}>
⭐ {ratings[app.id] ? ratings[app.id].toFixed(1) : "No rating"}
</p>

</div>

))}

</div>


<h2>Available Apps</h2>

<div style={grid}>

{apps
.filter((app)=>
app.name.toLowerCase().includes(search.toLowerCase())
)
.filter((app)=>
category === "" || app.category === category
)
.map((app)=> (

<div key={app.id} style={card}>

<img
src={app.image || "https://cdn-icons-png.flaticon.com/512/888/888857.png"}
style={{width:"70px"}}
/>

<h3
style={{cursor:"pointer"}}
onClick={()=>navigate("/app",{state:app})}
>
{app.name}
</h3>

<p>{app.category}</p>
<p>{app.developer}</p>
<p>{app.description}</p>

<p style={{color:"#fbbc04"}}>
⭐ {ratings[app.id] || "No ratings"}
</p>


{/* INSTALL / UNINSTALL BUTTON */}

{installedApps.includes(app.id) ? (

<button
style={uninstallBtn}
onClick={()=>handleUninstall(app.id)}
>
Uninstall
</button>

) : (

<button
style={installBtn}
onClick={()=>handleInstall(app.id)}
>
Install
</button>

)}


<br/><br/>

<input
placeholder="Write review"
value={reviewInputs[app.id]?.comment || ""}
onChange={(e)=>setReviewInputs({
...reviewInputs,
[app.id]:{
...reviewInputs[app.id],
comment:e.target.value
}
})}
style={inputStyle}
/>

<input
type="number"
placeholder="Rating 1-5"
value={reviewInputs[app.id]?.rating || ""}
onChange={(e)=>setReviewInputs({
...reviewInputs,
[app.id]:{
...reviewInputs[app.id],
rating:e.target.value
}
})}
style={inputStyle}
/>

<button
style={reviewBtn}
onClick={()=>handleReview(app.id)}
>
Submit Review
</button>

<div style={{marginTop:"10px"}}>

{reviews[app.id]?.map((r,index)=>(
<div key={index}>
⭐ {r.rating} - {r.comment}
</div>
))}

</div>

</div>

))}

</div>

</div>

</>
);
}


/* STYLES */

const container = {
width:"100%",
padding:"30px"
};

const filterBox = {
display:"flex",
gap:"20px",
marginBottom:"30px"
};

const grid = {
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
gap:"20px"
};

const card = {
border:"1px solid #ddd",
padding:"20px",
borderRadius:"10px",
background:"#fff",
textAlign:"center"
};

const smallCard = {
border:"1px solid #ddd",
padding:"10px",
borderRadius:"10px",
background:"#fff",
textAlign:"center"
};

const inputStyle = {
padding:"8px",
marginBottom:"10px",
width:"100%",
background:"#ffffff",
color:"#000",
border:"1px solid #ccc",
borderRadius:"5px"
};

const installBtn = {
background:"#34A853",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
cursor:"pointer"
};

const uninstallBtn = {
background:"#ff4d4d",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
cursor:"pointer"
};

const reviewBtn = {
background:"#1a73e8",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
cursor:"pointer"
};

export default Dashboard;