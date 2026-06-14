import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaUser, FaEnvelope, FaLock} from "react-icons/fa";
import {motion} from "framer-motion";
import API from "../services/api";
import "../Styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);

      navigate("/login", {replace: true});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="auth-page register-page"
      initial={{opacity: 0, x: -80}}
      animate={{opacity: 1, x: 0}}
      transition={{duration: 0.5}}
    >
      <div className="auth-main-card">
        {/* LEFT FORM */}

        <div className="auth-form-section">
          <div className="mobile-auth-header">
            <div className="mobile-logo">✓</div>
            <h1>TaskFlow</h1>
            <p>Manage tasks, track progress and stay productive every day.</p>
          </div>
          <div className="auth-card">
            <h2>Create Account</h2>
            <p>Join TaskFlow today</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="input-icon" />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>

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

              <button type="submit">Register</button>
            </form>

            <div className="auth-link">
              Already have an account?
              <Link to="/login" className="switch-link">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="auth-banner">
          <div className="banner-content">
            <div className="banner-logo">
              <div className="banner-logo-icon">✓</div>

              <div>
                <h3>TaskFlow</h3>
                <span>Task Management Platform</span>
              </div>
            </div>

            <h1>
              Manage Work Smarter,
              <br />
              Not Harder
            </h1>

            <p>
              TaskFlow helps teams and individuals organize tasks, track
              progress, meet deadlines and stay productive.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span>✓</span>
                Create and manage tasks effortlessly
              </div>

              <div className="feature-item">
                <span>✓</span>
                Track task progress in real time
              </div>

              <div className="feature-item">
                <span>✓</span>
                Organize work with due dates & statuses
              </div>

              <div className="feature-item">
                <span>✓</span>
                Stay focused with productivity insights
              </div>
            </div>

            <div className="banner-stats">
              <div>
                <h3>100%</h3>
                <span>Organized</span>
              </div>

              <div>
                <h3>24/7</h3>
                <span>Available</span>
              </div>

              <div>
                <h3>Fast</h3>
                <span>Workflow</span>
              </div>
            </div>

            <div className="banner-trust">
              Trusted for daily task management and productivity.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
