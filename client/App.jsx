import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Router } from "react-router-dom";
function App() {
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  //input value get
  const handleChange = (el, index) => {
    if (isNaN(el.value)) {
      // if input is not a number, set value to empty string and add highlight class
      // el.value = "";
      setOtp([...otp.map((data, i) => (i === index ? el.value : data))]);
      el.classList.add("highlight");
    } else {
      // if input is a number, update state with input value and remove highlight class
      setOtp([...otp.map((data, i) => (i === index ? el.value : data))]);
      el.classList.remove("highlight");
    }

    if (el.nextSibling) {
      el.nextSibling.focus();
    }
  };
  //onClick event
  const submintOtp = () => {
    const data = { otp: Number(otp.join("")) };
    console.log("Data is", data);
    axios
      .post("localhost:5000/verifyotp", data)
      .then((response) => {
        // Router.push("/success");
        console.log(response);
      })
      .catch((error) => {
        console.log("erorr is", error);
        setError(true);
      });
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const otpArray = pastedData
      .split("")
      .filter((data) => !isNaN(data))
      .slice(0, 6);
    const newOtp = [...otp];
    otpArray.forEach((data, index) => {
      newOtp[index] = data;
    });
    setOtp(newOtp);
  };
  return (
    <div className="container">
      <h3>Please Enter Your OTP</h3>
      {errorMesage && (
        <p>
          The OTP was not correct.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please enter again
        </p>
      )}

      <div className="otp-input-box">
        {otp.map((data, i) => {
          return (
            <input
              type="text"
              name="otp"
              className={`otp-input ${isNaN(data) ? "highlight" : ""}`}
              maxLength={1}
              key={i}
              value={data}
              onChange={(e) => handleChange(e.target, i)}
              onFocus={(e) => e.target.select()}
              onPaste={handlePaste}
              onBlur={(e) => e.target.classList.remove("highlight")}
            />
          );
        })}
      </div>
      <button onClick={submintOtp} className="button">
        <p>Submit</p>
      </button>
    </div>
  );
}

export default App;
