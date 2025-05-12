import React from "react";

const EventIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="3" 
      y="5" 
      width="18" 
      height="16" 
      rx="2" 
      stroke={active ? "#5a4ff3" : "#8a8fa7"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 9H21" 
      stroke={active ? "#5a4ff3" : "#8a8fa7"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 2V5" 
      stroke={active ? "#5a4ff3" : "#8a8fa7"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 2V5" 
      stroke={active ? "#5a4ff3" : "#8a8fa7"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="7.5" 
      cy="13.5" 
      r="1" 
      fill={active ? "#5a4ff3" : "#8a8fa7"} 
    />
    <circle 
      cx="12" 
      cy="13.5" 
      r="1" 
      fill={active ? "#5a4ff3" : "#8a8fa7"} 
    />
    <circle 
      cx="16.5" 
      cy="13.5" 
      r="1" 
      fill={active ? "#5a4ff3" : "#8a8fa7"} 
    />
  </svg>
);

export default EventIcon;
