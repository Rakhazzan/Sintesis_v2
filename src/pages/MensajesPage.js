import React from "react";
import "../components/Mensajes.css";
import Mensajes from "../components/Mensajes";

const MensajesPage = ({ params }) => (
  <div className="page-content">
    <Mensajes selectedPatientId={params?.patientId} />
  </div>
);

export default MensajesPage;
