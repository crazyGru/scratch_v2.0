import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import FootBar from '../home/FootBar';

export default function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirm: "",
    });

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value);
        setUser({...user, [name]:value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, password, confirm} = user;
        console.log(user)
        if(password !== confirm){
            alert("Password doesn't match. Please correct!")
        }
        else {
            try {
                
                const res = await fetch('http://localhost:5000/register', {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        username, password
                    })
                })
                if(res.ok){
                    // window.alert("Registered Successfully");
                    navigate('/login');
                }
                else if(res.status === 400 || !res){
                    window.alert("Already Used Dtails");
                } 
                else{
                    window.alert("Register Failed");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div>
              <Navbar />
            </div>
            <div className="container shadow my-5 ">
                <div className="row justify-content-center"　style={{ marginTop: "100px" }}>
                    <div className="col-md-5 d-flex flex-column align-items-center form justify-content-center text-white order-2">
                        <h1 className="display-4 fw-bolder">こんにちは</h1>
                        <p className="lead text-center">詳細を入力してください</p>
                        <h5 className='mb-4'>それとも</h5>
                        <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">サインイン</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <form onSubmit={handleSubmit} method='POST'>
                            <div class="mb-3">
                                <label for="name" class="form-label">ユーザー名</label>
                                <input type="text" class="form-control" id="name" name='username' value={user.username} onChange={handleInput} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">パスワード</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={user.password} onChange={handleInput} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">確認</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" name='confirm' value={user.confirm} onChange={handleInput} />
                            </div>
                            <button type="submit" class="btn btn-outline-primary w-100 m-4 rounded-pill">登録</button>
                        </form>
                    </div>
                </div>
            </div>
            <FootBar />
        </div>
    )
}
