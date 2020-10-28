import React from "react";

import * as Yup from "yup";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import "bootstrap/dist/css/bootstrap.css";

const App = () => (
  <div className="container">
    <h3>Organzation Form (Dyanamic users - Array of Object) </h3>
    <hr />
    <Formik
      initialValues={{
        users: [{
          name: "deshan madurajith",
          email: "desh@email.com"
        },
        {
          name: "Hello Desh",
          email: "hello@email.com"
        }
      ],
        organizationName: [],
        isEditing: true
      }}
      validationSchema={Yup.object({
        organizationName: Yup.string().required(
          "Organization Name is required"
        )
        .min(5,"Organisation Name should not be less than 5 Characters")
        .max(10,"Organisation Name should not exceed 15 Characters"),
        users: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Name required"),
            email: Yup.string()
              .required("email required")
              .email("Enter valid email")
          })
        )
      })}
      onSubmit={values => alert(JSON.stringify(values, null, 2))}
      render={({ values }) => (
        <Form>
            <h5>Form </h5>
          <Field className="form-control" placeholder="Organization name" name={`organizationName`} />
          <ErrorMessage className="text-danger" name={`organizationName`} component="span" className="text-danger"/>
          <h5>Organzation users </h5>
          <FieldArray
            name="users"
            render={arrayHelpers => {
              const users = values.users;
              const editing = values.isEditing;
              return (
                <div>
                  {users && users.length > 0
                    ? users.map((user, index) => (
                        <div key={index}>
                          {
                            editing ? (
                              <>
                              <Field
                                className="form-control"
                                placeholder="user name"
                                name={`users.${index}.name`}
                              />
                              <ErrorMessage name={`users.${index}.name`} component="span" className="text-danger"/>
                              <br />
                              </>
                            ) 
                            :
                            <span className="text-success">{user.name}</span>
                          }
                          

                          <Field
                            className="form-control"
                            placeholder="user email"
                            name={`users.${index}.email`}
                          />
                          <ErrorMessage className="text-danger" name={`users.${index}.email`} component="span" className="text-danger" />

                          <br />

                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <br />
                          <br />
                        </div>
                      ))
                    : null}
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                      arrayHelpers.push({
                        name: "",
                        email: ""
                      })
                    } // insert an empty string at a position
                  >
                    add a User
                  </button>
                  <br />
                  <br />
                  <br />
                  <div>
                    <button type="submit" className="btn btn-success">Form Submit</button>
                  </div>
                </div>
              );
            }}
          />
          <hr />
        </Form>
      )}
    />
  </div>
);

export default App;
