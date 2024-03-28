import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom';
import {  useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Clerk_Home=()=>{
  const location=useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allcomplaints?suburb=${user.suburb}&city=${user.city}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return(
    <div className="Clerkhome">
      <nav className="somebar">
            <h2>Welcome {user.name}</h2>
            <div className="extralinks">
        <Link to={{ pathname: "/Clerk_Complaint", state: { user: user} }} className='submitbutton Add_complaint'>+Complaint</Link>
            </div>
        </nav>
        <div className="Complaints_container">
      <div className="Complaints_form">
          <h1>All complaints </h1>
          {data.map((jsonData,index) => (
          <div key={index} className="Complaint_content">
                        <div className="texts">
              <div className="text"><div className="sidelabel">Problem :</div> <div className="maintext">{jsonData.Problem}</div></div>
              <div className="rowtexts">
              <div className="text"><div className="sidelabel">Address :</div><div className="maintext"> {jsonData.Address}</div></div>
              <div className="text"><div className="sidelabel">Status :</div><div className="maintext">{jsonData.status}</div></div>
              </div>
          </div>
          </div>
        ))}
        </div>
    </div>
    </div>
      
    );
}

export  default Clerk_Home ;