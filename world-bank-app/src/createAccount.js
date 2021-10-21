import { useFormik } from "formik"
import * as Yup from "yup"
<<<<<<< HEAD
import { useState } from "react"
=======
>>>>>>> 7d9ce23d6b84ee87c85df24fd6329b28be26ffd6
import "bootstrap/dist/css/bootstrap.min.css"

import { Button, Form, Row, Col, Alert } from "react-bootstrap"

function CreateAccount() {
    const [serverResponseMessage, setServerResponseMessage] = useState("")
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Must be at least 8 characters")
                .max(20, "Must be 20 characters or less")
                .required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
            email: Yup.string()
                .max(35, "Cannot exceed 35 characters")
                .email("Invalid email address")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            const result = await sendUserDetailsToServer(values)
            result === "Success"
                ? setServerResponseMessage("Success")
                : setServerResponseMessage("Failure")
            //Redirect to search page
        },
    })

    return (
        <div className="d-flex justify-content-center">
            <Form
                data-testid="createAccountForm"
                onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Control
                            id="email"
                            name="email"
                            type="email"
                            data-testid="createUsername"
                            placeholder="email"
                            className={validationCSS(
                                formik.touched.email,
                                formik.errors.email
                            )}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
<<<<<<< HEAD
                            <div
                                className="invalid-feedback"
                                data-testid="emailError">
=======
                            <div data-testid="emailError">
>>>>>>> 7d9ce23d6b84ee87c85df24fd6329b28be26ffd6
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Control
                                id="password"
                                name="password"
                                type="password"
                                data-testid="createPassword"
                                placeholder="password"
                                class={validationCSS(
                                    formik.touched.password,
                                    formik.errors.password
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
<<<<<<< HEAD
                                <div
                                    className="invalid-feedback"
                                    data-testid="requirePassword">
=======
                                <div data-testid="requirePassword">
>>>>>>> 7d9ce23d6b84ee87c85df24fd6329b28be26ffd6
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                data-testid="confirmPassword"
                                placeholder="confirm password"
                                class={validationCSS(
                                    formik.touched.confirmPassword,
                                    formik.errors.confirmPassword
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ? (
<<<<<<< HEAD
                                <div
                                    className="invalid-feedback"
                                    data-testid="requireConfirmPassword">
=======
                                <div data-testid="requireConfirmPassword">
>>>>>>> 7d9ce23d6b84ee87c85df24fd6329b28be26ffd6
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                </Row>
<<<<<<< HEAD
                <div className="d-grid">
                    <Button
                        className="mb-3"
                        variant="primary"
                        type="submit"
                        data-testid="submitCreateAccount"
                        size="lg">
                        Create Account
                    </Button>
                    {serverResponseMessage === "Success" ? (
                        <Alert variant="success" data-testid="redirectMessage">
                            Success. Redirecting....
                        </Alert>
                    ) : serverResponseMessage === "Failure" ? (
                        <Alert variant="danger" data-testid="redirectMessage">
                            <p>
                                Sorry, there may already be an account under
                                that name. Alternatively, we're having trouble
                                accessing our server at the moment.
                            </p>
                            <hr />
                            <p>Please wait a few moments and try again.</p>
                        </Alert>
                    ) : null}
                </div>
            </Form>
=======
                <Button
                    variant="primary"
                    type="submit"
                    data-testid="submitCreateAccount"
                    size="lg">
                    Create Account
                </Button>
            </Form>
<<<<<<< HEAD
            {serverResponseMessage === "Success" ? (
                <div data-testid="redirectMessage">
                    Success. Redirecting....
                </div>
            ) : serverResponseMessage === "Failure" ? (
                <div data-testid="redirectMessage">
                    <p>
                        Sorry, there may already be an account under that name.
                        Alternatively, we're having trouble accessing our server
                        at the moment.
                    </p>
                    <p>Please wait a few moments and try again.</p>
                </div>
            ) : (
                ""
            )}
=======
>>>>>>> 7d9ce23d6b84ee87c85df24fd6329b28be26ffd6
>>>>>>> main
        </div>
    )
}

function validationCSS(userHasVisited, errorStatus) {
    if (userHasVisited && !errorStatus) return "form-control is-valid"
    if (userHasVisited && errorStatus) return "form-control is-invalid"

    return "form-control"
}

async function sendUserDetailsToServer(values) {
    //Localhost may need to be updated when we start hosting the server
    let result = ""
    const submitToServer = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })
        .then(async (response) => {
            result = await response.json()
            if (result.name === "error") result = "Error"
            else result = "Success"
        })
        .catch((error) => {
            console.log("Error:", error)
            result = "error"
        })

    return result
}

export default CreateAccount
