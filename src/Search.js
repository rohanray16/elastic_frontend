import axios from "axios";
import React, { useRef, useState } from "react";

function Search() {
  const [employee, setEmployee] = useState([]);
  let companyName = useRef();
  const searchClick = async () => {
    let URL = "http://localhost:4000/api/get-employee?company=" + companyName.current.value;
    try {
      let response = await axios.get(URL);
      console.log(response.data);
      if (response.data.status === true) {
        setEmployee(response.data.employee.hits.hits);
      } 
      else alert("Something wrong");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="header">Elastic Search of Employee</h1>
      <div className="search-section">
        <div className="search-div">
          <input
            className="search-input"
            type="text"
            name="search"
            id="search"
            placeholder="Enter Company name"
            ref={companyName}
          />
          <button onClick={searchClick} className="search-button">
            Search
          </button>
        </div>
        <div className="search-result-section">
          {employee.map((element,index) => {
            return (
            <div className="search-result-item" key={element._id}>
              <p>
                <b>SL_NO:</b> {element._source.sl_no}
              </p>
              <p>
                <b>COMPANY_NAME:</b> {element._source.company_name}
              </p>
              <p>
                <b>EMPLOYEE_NAME:</b> {element._source.employee_name}
              </p>
              <p>
                <b>DESCRIPTION:</b> {element._source.description}
              </p>
              <p>
                <b>LEAVE:</b> {element._source.leave}
              </p>
            </div>
            )
          })
            
          }
        </div>
      </div>
    </>
  );
}

export default Search;
