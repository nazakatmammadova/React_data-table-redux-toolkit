import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getData,deleteData } from "../redux/tableSlice";
import OpenModal from "./OpenModal";

function DataTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const dispatch=useDispatch()
  const {users}=useSelector((s)=>s.datatable)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch]);

  return (
    <>
      <div className="container py-3">
        <div className="row mt-3">
          <form>
            <div className="input-group-md mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Seacrh user name..."
                    onKeyUp={(e)=> dispatch(getData(e.target.value))}
                  />
            </div>
          </form>
        </div>
        <div className="row row-table">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr className="py-2">
                  <th className="text-center">№</th>
                  <th>Employee Name</th>
                  <th>Employee Surname</th>
                  <th>Experience</th>
                  <th>Salary</th>
                  <th colSpan="2" className="text-center">
                    <Button variant="contained" size="small" onClick={()=>setIsOpen(true)}>ADD</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={item.id}>
                    <th className="text-center">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.experience} year</td>
                    <td>{item.salary} $</td>
                    <td className="text-center">
                    <Button 
                    variant="contained" 
                    color="error" 
                    size="small" 
                    endIcon={<DeleteIcon />}
                    onClick={() => dispatch(deleteData(item.id))}
                    >
                      Delete
                    </Button>
                    </td>
                    <td className="text-center"> 
                    <Button 
                    variant="contained" 
                    color="success" 
                    size="small" 
                    endIcon={<EditIcon />}
                    onClick={() => {setEditEmployee(item),setIsOpen(true)}}>
                      Edit
                    </Button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {
        isOpen && <OpenModal setIsOpen={setIsOpen} employee={editEmployee}/>
      }
    </>
  );
}

export default DataTable;
