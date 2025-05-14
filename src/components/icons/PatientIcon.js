import React from "react";

const PatientIcon = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {active ? (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.579 21.25H7.704C5.401 21.25 3.5 19.41 3.5 17.186V16.689C3.5 15.971 3.897 15.319 4.542 14.979L9.382 12.429C10.206 11.988 11.221 12.073 11.958 12.661L13.521 13.92C14.032 14.332 14.862 14.046 14.994 13.405L15.481 11.02C15.737 9.773 16.695 8.77 17.927 8.455L18.751 8.237C19.554 8.022 20.379 8.511 20.632 9.304C20.87 10.046 20.999 10.842 20.999 11.657V17.186C20.999 19.41 19.098 21.25 16.795 21.25H12.921"
          fill="#EDF1FD"
          stroke="#5a4ff3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM7.5 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          fill="#EDF1FD"
          stroke="#5a4ff3"
          strokeWidth="1.5"
        />
      </>
    ) : (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.579 21.25H7.704C5.401 21.25 3.5 19.41 3.5 17.186V16.689C3.5 15.971 3.897 15.319 4.542 14.979L9.382 12.429C10.206 11.988 11.221 12.073 11.958 12.661L13.521 13.92C14.032 14.332 14.862 14.046 14.994 13.405L15.481 11.02C15.737 9.773 16.695 8.77 17.927 8.455L18.751 8.237C19.554 8.022 20.379 8.511 20.632 9.304C20.87 10.046 20.999 10.842 20.999 11.657V17.186C20.999 19.41 19.098 21.25 16.795 21.25H12.921"
          stroke="#8a8fa7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM7.5 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          stroke="#8a8fa7"
          strokeWidth="1.5"
        />
      </>
    )}
  </svg>
);

export default PatientIcon;
