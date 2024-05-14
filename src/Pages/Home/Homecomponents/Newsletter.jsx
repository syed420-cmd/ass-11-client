import React from 'react'
import { useState } from 'react';
import './banner.css'


function Newsletter() {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Here you can handle form submission, like sending data to a server
      alert(`Name: ${name}, Subject: ${subject}, Message: ${message}`);
      setName('');
      setSubject('');
      setMessage('');
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'subject':
          setSubject(value);
          break;
        case 'message':
          setMessage(value);
          break;
        default:
          break;
      }
    };
  
  
    return (
    <div>
       
       <h2 className='text-[32px] mt-[40px] text-black text-center'>Newsletter</h2>
       <form id='newsletter' className='bg-blue-600 mt-[40px] h-[600px] flex flex-col items-center justify-center' onSubmit={handleSubmit}>
      <div>
        <label className='text-[24px] font-[400]  text-black mr-[20px]' htmlFor="name">Name:</label>
        <input
          className='h-[40px] w-[350px] px-5 rounded-[15px] '
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label  className='text-[24px] font-[400] text-black mt-[20px] mr-[20px]' htmlFor="subject">Subject:</label>
        <input   className='h-[40px] mt-[20px] px-5 w-[350px] rounded-[15px] '
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={handleChange}
        />
      </div>
      <div className='flex justify-center items-center'>
        <label  className='text-[24px] font-[400] text-black mt-[20px] mr-[20px]'  htmlFor="message">Message:</label>
        <textarea 
         className='h-[140px] mt-[20px] px-5 my-0 w-[350px] rounded-[15px] '
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
        />
      </div>
      <button className='bg-cyan-400 py-[20px] px-[30px] rounded-[20px] mt-[20px] font-[700]' type="submit">Send</button>
    </form>
    </div>
  )
}

export default Newsletter
