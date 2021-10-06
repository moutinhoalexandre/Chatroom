import React from 'react'

export default function RegisterPage() {
    return (
      <div className="card">
        <div className="cardHeader">Registration</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="texte"
              name="name"
              id="name"
              placeholder="John Smith"
            />
          </div>
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
        <button>Register</button>
      </div>
    );
}
