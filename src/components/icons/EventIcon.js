import React from "react";

const EventIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {active ? (
      <>
        <path
          d="M8 2V5"
          stroke="#5a4ff3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 2V5"
          stroke="#5a4ff3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 9.09H20.5"
          stroke="#5a4ff3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 4.5H7C4.79086 4.5 3 6.29086 3 8.5V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V8.5C21 6.29086 19.2091 4.5 17 4.5Z"
          fill="#EDF1FD"
          stroke="#5a4ff3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path 
          d="M9.7 15.3C9.3 15.3 9 15 9 14.6V14.4C9 14 9.3 13.7 9.7 13.7H10.6C11 13.7 11.3 14 11.3 14.4V14.6C11.3 15 11 15.3 10.6 15.3H9.7Z" 
          fill="#5a4ff3"
        />
        <path 
          d="M13.7 15.3C13.3 15.3 13 15 13 14.6V14.4C13 14 13.3 13.7 13.7 13.7H14.6C15 13.7 15.3 14 15.3 14.4V14.6C15.3 15 15 15.3 14.6 15.3H13.7Z" 
          fill="#5a4ff3"
        />
      </>
    ) : (
      <>
        <path
          d="M8 2V5"
          stroke="#8a8fa7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 2V5"
          stroke="#8a8fa7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 9.09H20.5"
          stroke="#8a8fa7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 4.5H7C4.79086 4.5 3 6.29086 3 8.5V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V8.5C21 6.29086 19.2091 4.5 17 4.5Z"
          stroke="#8a8fa7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path 
          d="M9.7 15.3C9.3 15.3 9 15 9 14.6V14.4C9 14 9.3 13.7 9.7 13.7H10.6C11 13.7 11.3 14 11.3 14.4V14.6C11.3 15 11 15.3 10.6 15.3H9.7Z" 
          stroke="#8a8fa7"
          strokeWidth="1"
        />
        <path 
          d="M13.7 15.3C13.3 15.3 13 15 13 14.6V14.4C13 14 13.3 13.7 13.7 13.7H14.6C15 13.7 15.3 14 15.3 14.4V14.6C15.3 15 15 15.3 14.6 15.3H13.7Z" 
          stroke="#8a8fa7"
          strokeWidth="1"
        />
      </>
    )}
  </svg>
);

export default EventIcon;
