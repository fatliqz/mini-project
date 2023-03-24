import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

var md5 = require("md5");

export default function Login() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let Navigate = useNavigate();

    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }

        setValidated(true);
    }

    const getAuthenToken = async () => {
        const response = await fetch(
            "http://localhost:8080/api/authen_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: md5(username)
                })
            }
        );

        const data = await response.json();

        console.log(data);
        return data;
    };

    const getAccessToken = async (authToken) => {
        var baseString = username + "&" + md5(password);
        var authenSignature = md5(baseString);

        const response = await fetch(
            "http://localhost:8080/api/access_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    authen_signature: authenSignature,
                    auth_token: authToken
                })
            }
        );

        const data = await response.json();
        return data;
    };

    const doLogin = async () => {
        const data1 = await getAuthenToken();
        const authToken = data1.data.auth_token;

        console.log(data1);


        const data2 = await getAccessToken(authToken);

        console.log(data2);

        localStorage.setItem("access_token", data2.data.access_token);
        localStorage.setItem("user_id", data2.data.account_info.user_id);
        localStorage.setItem("username", username);
        localStorage.setItem("first_name", data2.data.account_info.first_name);
        localStorage.setItem("last_name", data2.data.account_info.last_name);
        localStorage.setItem("email", data2.data.account_info.email);
        localStorage.setItem("role_id", data2.data.account_info.role_id);
        localStorage.setItem("role_name", data2.data.account_info.role_name);

        Navigate("home", { replace: false });

    }

    return (
        <section>

            <div className='form-box'>
                <div class="form-value">
                <h2>Login</h2>
              
                <Form noValidate validated={validated} onSubmit={onLogin}>
                    <Row className="inputbox">
                        <Form.Group as={Col} controlId="validateUsername">
                            <Form.Label></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอก Username
                            </Form.Control.Feedback>
                            
                        </Form.Group>
                    </Row>
                    <Row className="inputbox">
                        <Form.Group as={Col} controlId="validatePassword">
                            <Form.Label></Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอก Password
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" id='login' >Log in</Button>
                        </Col>
                    </Row>
                    <div class="register">
                        <p>Don't have a account <a href="#">Register</a></p>
                    </div>
                </Form>
                </div>
            </div>
        </section>
        
    );
}