import { useEffect, useState } from "react";
import { getApps, addApp, deleteApp, updateApp, getDownloadCount, getReviews } from "../services/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {

const [apps, setApps] = useState([]);
const [reviews, setReviews] = useState([]);
const [downloadCounts, setDownloadCounts] = useState({});
const [editId, setEditId] = useState(null);

const [formData, setFormData] = useState({
name:"",
category:"",
developer:"",
description:"",
image:""
});


useEffect(()=>{

getApps().then((res)=>{

setApps(res.data);

res.data.forEach((app)=>{

getDownloadCount(app.id).then((countRes)=>{

setDownloadCounts((prev)=>({
...prev,
[app.id]:countRes.data
}));

});

});

});

getReviews().then((res)=>{
setReviews(res.data);
});

},[]);



const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
});

};



const handleSubmit=(e)=>{

e.preventDefault();

if(editId){

updateApp(editId,formData).then(()=>{

alert("App updated successfully");

setEditId(null);

setFormData({
name:"",
category:"",
developer:"",
description:"",
image:""
});

getApps().then((res)=>{
setApps(res.data);
});

});

}else{

addApp(formData).then(()=>{

alert("App added successfully");

setFormData({
name:"",
category:"",
developer:"",
description:"",
image:""
});

getApps().then((res)=>{
setApps(res.data);
});

});

}

};



const handleEdit=(app)=>{

setEditId(app.id);

setFormData({
name:app.name || "",
category:app.category || "",
developer:app.developer || "",
description:app.description || "",
image:app.image || ""
});

};



const handleDelete=(id)=>{

deleteApp(id).then(()=>{

alert("App deleted");

getApps().then((res)=>{
setApps(res.data);
});

});

};



const handleLogout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("role");
window.location.href="/login";

};



return(

<>

<Navbar/>

<div style={page}>

<h1 style={{marginBottom:"20px"}}>Admin Dashboard</h1>

<button style={logoutBtn} onClick={handleLogout}>Logout</button>


{/* DASHBOARD STATS */}

<div style={statsBox}>

<div style={statCard}>
<h2>{apps.length}</h2>
<p>Total Apps</p>
</div>

<div style={statCard}>
<h2>{Object.values(downloadCounts).reduce((a,b)=>a+b,0)}</h2>
<p>Total Downloads</p>
</div>

<div style={statCard}>
<h2>{reviews.length}</h2>
<p>Total Reviews</p>
</div>

</div>


<div style={layout}>


{/* LEFT SIDE FORM */}

<div style={formBox}>

<h2>{editId ? "Update App" : "Add App"}</h2>

<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="App Name"
value={formData.name}
onChange={handleChange}
style={inputStyle}
/>

<input
name="category"
placeholder="Category"
value={formData.category}
onChange={handleChange}
style={inputStyle}
/>

<input
name="developer"
placeholder="Developer"
value={formData.developer}
onChange={handleChange}
style={inputStyle}
/>

<input
name="description"
placeholder="Description"
value={formData.description}
onChange={handleChange}
style={inputStyle}
/>

<input
name="image"
placeholder="App Image URL"
value={formData.image}
onChange={handleChange}
style={inputStyle}
/>

<button style={addBtn}>
{editId ? "Update App" : "Add App"}
</button>

</form>

</div>



{/* RIGHT SIDE APPS */}

<div>

<h2>All Apps</h2>

<div style={appGrid}>

{apps.map((app)=>(

<div
key={app.id}
style={card}
onMouseOver={(e)=>e.currentTarget.style.transform="translateY(-6px)"}
onMouseOut={(e)=>e.currentTarget.style.transform="translateY(0)"}
>

<img
src={app.image || "https://cdn-icons-png.flaticon.com/512/888/888857.png"}
style={{width:"60px",height:"60px",marginBottom:"10px"}}
/>

<h3>{app.name}</h3>

<p>{app.category}</p>

<p>{app.developer}</p>

<p style={{fontSize:"14px"}}>{app.description}</p>

<p>⭐ 4.5</p>

<p>Downloads: {downloadCounts[app.id] || 0}</p>

<button style={editBtn} onClick={()=>handleEdit(app)}>Edit</button>

<button style={deleteBtn} onClick={()=>handleDelete(app.id)}>Delete</button>

</div>

))}

</div>

</div>

</div>

</div>

</>

);

}



/* PAGE */

const page={
background:"#f4f6f9",
minHeight:"100vh",
padding:"30px"
};



/* LAYOUT */

const layout={
display:"grid",
gridTemplateColumns:"320px 1fr",
gap:"40px"
};



/* FORM BOX */

const formBox={
background:"#fff",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
};



/* INPUT */

const inputStyle={
width:"100%",
padding:"10px",
marginBottom:"12px",
borderRadius:"6px",
border:"1px solid #ccc",
background:"white"
};



/* BUTTONS */

const addBtn={
width:"100%",
padding:"10px",
background:"#1a73e8",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
};

const editBtn={
background:"#42a5f5",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"6px",
marginRight:"8px",
cursor:"pointer"
};

const deleteBtn={
background:"#e53935",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"6px",
cursor:"pointer"
};

const logoutBtn={
background:"#1565c0",
color:"white",
border:"none",
padding:"8px 14px",
borderRadius:"6px",
cursor:"pointer",
marginBottom:"20px"
};



/* STATS */

const statsBox={
display:"flex",
gap:"20px",
marginBottom:"30px"
};

const statCard={
background:"#fff",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)",
flex:"1",
textAlign:"center"
};



/* GRID */

const appGrid={
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
gap:"20px"
};



/* CARD */

const card={
background:"#fff",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)",
textAlign:"center",
transition:"0.3s",
cursor:"pointer"
};


export default AdminDashboard;