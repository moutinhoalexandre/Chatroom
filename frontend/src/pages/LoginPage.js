import React from 'react'

export default function LoginPage() {
    return (
      <div className="card">
        <div className="cardHeader">Login</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemple@mail.com"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
            />
          </div>
        </div>
        <button>Login</button>
      </div>
    );
}
