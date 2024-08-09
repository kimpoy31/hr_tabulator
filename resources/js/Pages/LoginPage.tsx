import { router } from '@inertiajs/react';
import React, { useState } from 'react'

const LoginPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = async() => {
        try {
            await router.post(route('login', { username, password }))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-base-200'>
        
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                {/* <h2 className="card-title"></h2> */}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full max-w-xs" 
                    />
                </label>

                <div className="card-actions justify-end mt-2">
                    <button className="btn btn-primary w-full" onClick={() => onSubmit()}>Sign in</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default LoginPage