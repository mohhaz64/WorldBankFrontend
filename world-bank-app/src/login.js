import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { Button, Form, Row, Col, Alert } from "react-bootstrap"

function Login(props) {
    const { setIsLoggedIn } = props
    const [serverResponseMessage, setServerResponseMessage] = useState("")
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Must be at least 8 characters")
                .max(20, "Must be 20 characters or less")
                .required("Required")
                .label("password"),
            email: Yup.string().max(35, "Cannot exceed 35 characters").email("Invalid email address").required("Required").label("email"),
        }),
        onSubmit: async (values) => {
            const result = await sendUserDetailsToServer(values)
            if (result === "Success") {
                setServerResponseMessage("Success")
                setIsLoggedIn(true)
            } else {
                setServerResponseMessage("Failure")
            }
        },
    })

    return (
        <div className="text-center">
            <Form data-testid="loginForm" onSubmit={formik.handleSubmit} noValidate>
                <h2 className="mb-4">Welcome to World Bank Database</h2>

                <Row className="mb-3">
                    <Form.Group>
                        <Form.Control
                            id="email"
                            name="email"
                            type="email"
                            data-testid="enterEmail"
                            placeholder="Email"
                            className={validationCSS(formik.touched.email, formik.errors.email)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            required
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="invalid-feedback" data-testid="emailError">
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
                                data-testid="enterPassword"
                                placeholder="Password"
                                class={validationCSS(formik.touched.password, formik.errors.password)}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback" data-testid="requirePassword">
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-grid">
                    <Button className="mb-3" variant="primary" type="submit" data-testid="submitLogin" size="lg">
                        Login
                    </Button>
                    {serverResponseMessage === "Success" ? (
                        <Alert variant="success" data-testid="redirectMessage">
                            Success. Redirecting....
                        </Alert>
                    ) : serverResponseMessage === "Failure" ? (
                        <Alert variant="danger" data-testid="redirectMessage">
                            Sorry, we couldn't find an account with those login details.
                        </Alert>
                    ) : null}
                </div>
            </Form>
        </div>
    )
}

//NOTE: I know this function could just be imported from ""./createAccount", but for whatever reason
//the css breaks if you import this function instead of just copy + pasting it here. - Sean
function validationCSS(userHasVisited, errorStatus) {
    if (userHasVisited && !errorStatus) return "form-control is-valid"
    if (userHasVisited && errorStatus) return "form-control is-invalid"

    return "form-control"
}

async function sendUserDetailsToServer(values) {
    //Localhost may need to be updated when we start hosting the server
    let result = ""
    const submitToServer = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })
        .then(async (response) => {
            result = await response.status
            if (result === 200) {
                result = "Success"
            } else {
                result = "error"
            }
        })
        .catch((error) => {
            console.log("Error:", error)
            result = "error"
        })
    return result
}

export default Login
