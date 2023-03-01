import Table from 'react-bootstrap/Table';
function UserReportTable(props) {
   let users = props.results
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Score</th>
          <th>Correct Answered</th>
          <th>Incorrect/Unattempted</th>
          <th>Percentage(%)</th>
        </tr>
      </thead>
      <tbody>
        
    
     {
     users.map((result,index)=>{
            return(
        <tr key={result.ID}>
        <td>{index+1}</td>
        <td>{result.username}</td>
        <td>{result.score}</td>
        <td>{result.correctAns}</td>
         <td>{result.wrongAns}</td>
          <td>{Math.round(result.percentage)}</td> 
      </tr>
            )
        })
        }

      </tbody>
    </Table>
  );
}

export default UserReportTable;