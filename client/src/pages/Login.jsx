import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaEnvelope, FaLock} from "react-icons/fa";
import {motion} from "framer-motion";
import API from "../services/api";
import "../Styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      );

      navigate("/dashboard", {replace: true});
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <motion.div
      className="auth-page"
      initial={{opacity: 0, x: -80}}
      animate={{opacity: 1, x: 0}}
      transition={{duration: 0.5}}
    >
      <div className="auth-main-card">
        {/* LEFT CONTENT */}
        <div className="auth-banner">
          <div className="banner-content">
            <div className="banner-logo">
              <div className="banner-logo-icon">✓</div>

              <div>
                <h3>TaskFlow</h3>
                <span>Welcome to TaskFlow</span>
              </div>
            </div>

            <h1>
              Your Productivity
              <br />
              Starts Here
            </h1>

            <p>
              Join TaskFlow and start managing projects, tasks, and daily goals
              with a modern and organized workspace.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span>✓</span>
                Create unlimited tasks
              </div>

              <div className="feature-item">
                <span>✓</span>
                Track progress visually
              </div>

              <div className="feature-item">
                <span>✓</span>
                Manage deadlines efficiently
              </div>

              <div className="feature-item">
                <span>✓</span>
                Increase daily productivity
              </div>
            </div>

            <div className="banner-stats">
              <div>
                <h3>Simple</h3>
                <span>Interface</span>
              </div>

              <div>
                <h3>Secure</h3>
                <span>Authentication</span>
              </div>

              <div>
                <h3>Modern</h3>
                <span>Workspace</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form-section">
          <div className="auth-card">
            <div className="mobile-auth-header">
              <div className="mobile-logo">✓</div>
              <h1>TaskFlow</h1>
              <p>Manage tasks, track progress and stay productive every day.</p>
            </div>
            <h2>Login</h2>
            <p>Access your TaskFlow workspace</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock className="input-icon" />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">Login</button>
            </form>

            <div className="auth-link">
              Don't have an account?
              <Link to="/register" className="switch-link">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
