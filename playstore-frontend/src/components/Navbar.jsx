import { Link } from "react-router-dom";

function Navbar(){

return(

<div style={navbarStyle}>

{/* LOGO SECTION */}

<div style={logoSection}>

<img
src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
alt="PlayStore"
style={logoStyle}
/>

<h2 style={titleStyle}>PlayStore</h2>

</div>


{/* NAV LINKS */}

<div style={navLinks}>

<Link to="/dashboard" style={linkStyle}>Home</Link>

<Link to="/installed" style={linkStyle}>Installed</Link>

<Link to="/downloads" style={linkStyle}>Downloads</Link>

<Link to="/profile" style={linkStyle}>Profile</Link>

<button
style={logoutBtn}
onClick={()=>{
localStorage.clear();
window.location="/login";
}}
>
Logout
</button>

</div>

</div>

);

}


/* NAVBAR */

const navbarStyle={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"14px 50px",
background:"linear-gradient(90deg,#1a73e8,#0d47a1)",
color:"white",
boxShadow:"0 3px 10px rgba(0,0,0,0.2)"
}


/* LOGO SECTION */

const logoSection={
display:"flex",
alignItems:"center",
gap:"12px"
}


/* LOGO */

const logoStyle={
width:"36px",
height:"36px"
}


/* TITLE */

const titleStyle={
margin:0,
fontWeight:"600",
letterSpacing:"0.5px"
}


/* NAV LINKS */

const navLinks={
display:"flex",
alignItems:"center",
gap:"25px"
}


/* LINKS */

const linkStyle={
color:"white",
textDecoration:"none",
fontSize:"16px",
fontWeight:"500",
transition:"0.3s"
}


/* LOGOUT BUTTON */

const logoutBtn={
background:"#ff4d4d",
border:"none",
padding:"7px 14px",
color:"white",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"500",
boxShadow:"0 2px 5px rgba(0,0,0,0.2)"
}

export default Navbar;