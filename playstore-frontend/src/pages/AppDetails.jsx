import { useLocation } from "react-router-dom";

function AppDetails(){

  const location = useLocation();
  const app = location.state;

  return(

    <div>

      <h1>{app.name}</h1>

      <p>Category: {app.category}</p>
      <p>Developer: {app.developer}</p>
      <p>Description: {app.description}</p>

      <button onClick={() => alert(app.name + " installed successfully")}>
        Install
      </button>

    </div>

  );

}

export default AppDetails;