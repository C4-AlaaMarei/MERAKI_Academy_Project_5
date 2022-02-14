// // /** @format */

// import axios from "axios";
// import React, { useRef, useEffect, useState } from "react";

// // // import { useNavigate, LINK } from "react-router-dom";
// import "./reject.css";



// import emailjs from "emailjs-com";

// const Reject = () => {
//   const form = useRef();
// const title="ERRORS-TEAM"

//   const rej ="Your Apllication refused ...sorry "
//   const sendEmail = (e) => {
  
    
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         "service_0c3knvt",
//         "template_02ihw4s",
//         form.current,
//         "user_HpGxyEqePdddiz4DOkw1R"
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };

 


//   return (
//     <>
//       <div className="reject">
//         <form className="rejectForm" ref={form} onSubmit={sendEmail}>
//           <input
//             id="sendBtn1"
//             type="text"
//             placeholder="Subject"
//             name="subject"
//             value={title}
//           />
//           <input
//             id="sendBtn2"
//             type="text"
//             placeholder="Your Name"
//             name="name"
//           />
//           <input
//             id="sendBtn3"
//             type="email"
//             placeholder="Your Email Address"
//             name="email"
//           />
//           <textarea
//             id="sendBtn4"
//             placeholder="Your Message Content"
//             cols="80"
//             rows="10"
//             name="message"

//           />
//           <input id="sendBtn5" type="submit" value="REJECTED " />

         
//         </form>
//       </div>
//     </>
//   );
// };
// export default Reject;
