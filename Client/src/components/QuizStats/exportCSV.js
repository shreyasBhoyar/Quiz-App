import React from "react";
import { CSVLink } from "react-csv";
import Button from "react-bootstrap/Button";

const ExportReactCSV = ({ csvData, fileName }) => {
  return (
    <Button variant="primary" style={{ float: "right", margin: ""}}>
      <CSVLink data={csvData} filename={fileName} style={{textDecoration:"none", color:"white"}}>
        Download as CSV
      </CSVLink>
    </Button>
  );
};
export default ExportReactCSV;
