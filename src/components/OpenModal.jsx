import { useFormik } from "formik";
import {Button} from '@mui/material';
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { postData,putData } from "../redux/tableSlice";

const EmployeeSchema = yup.object({
  name: yup.string().required("Cannot be empty!"),
  surname: yup.string().required("Cannot be empty!"),
  experience: yup
    .number()
    .nullable()
    .min(1,"Minimum 1 year experince required!")
    .max(50,"Can be maximum 50 years!")
    .required("Cannot be empty!")
    .positive("Enter positive number!"),
  salary: yup
    .number()
    .nullable()
    .required("Cannot be empty!")
    .positive("Enter positive number!"),
});

function OpenModal({setIsOpen,employee}) {
  const dispatch=useDispatch()
  const updateId = employee ? employee.id : null;
  const formik = useFormik({
    initialValues: {
       name: employee ? employee.name : "",
      surname: employee ? employee.surname : "",
      experience: employee ? employee.experience : "",
      salary: employee ? employee.salary : "",
    },
    validationSchema: EmployeeSchema,
    onSubmit: (values) => {
      if (updateId) {
        dispatch(putData({ id: updateId, updatedData: values }));
      } else {
        dispatch(postData(values));
      }
      setIsOpen(false);
    },
  });

  return (
    <>
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {updateId ? "Update Employee" : "Add Employee"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>setIsOpen(false)}
              ></button>
            </div>
                <div className="modal-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="name">
                          Name
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                      </div>
                      {formik.errors.name && (
                        <p className="text-danger">{formik.errors.name}</p>
                      )}
                    </div>
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="surname">
                          Surname
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="surname"
                          onChange={formik.handleChange}
                          value={formik.values.surname}
                        />
                      </div>
                      {formik.errors.surname && (
                        <p className="text-danger">{formik.errors.surname}</p>
                      )}
                    </div>
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="experience">
                          Experience
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          name="experience"
                          onChange={formik.handleChange}
                          value={formik.values.experience}
                        />
                      </div>
                      {formik.errors.experience && (
                        <p className="text-danger">
                          {formik.errors.experience}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="salary">
                          Salary
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          name="salary"
                          onChange={formik.handleChange}
                          value={formik.values.salary}
                        />
                      </div>
                      {formik.errors.salary && (
                        <p className="text-danger">{formik.errors.salary}</p>
                      )}
                    </div>
                    <div className="modal-footer">
                      <Button type="submit" variant="contained" size="small" color="success">
                        {updateId ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenModal;
