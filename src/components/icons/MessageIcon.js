import React from "react";

const MessageIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M4 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H6L2 22V6C2 4.9 2.9 4 4 4Z" 
      stroke={active ? "#5a4ff3" : "#8a8fa7"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="8" 
      cy="11" 
      r="1" 
      fill={active ? "#5a4ff3" : "#8a8fa7"} 
    />
    <circle 
      cx="12" 
      cy="11" 
      r="1" 
      fill={active ? "#5a4ff3" : "#8a8fa7"} 
    />
    <circle 
      cx="16" 
      cy="11" 
      r="1" 
      fill={active ? "#5a4ff3" : "#8a8fa7"} 
    />
  </svg>
);

export default MessageIcon;
