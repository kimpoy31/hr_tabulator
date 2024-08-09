import React from 'react'

const LoginPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-base-200'>
        
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                {/* <h2 className="card-title"></h2> */}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>

                <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary w-full">Sign in</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default LoginPage