import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body" style={{ padding: 0 }}>
        <div className="container" style={{ width: "100%" }}>
          <div className="columns is-gapless" style={{ display: "flex" }}>
            
            {/* Kolom kiri dengan gambar full */}
            <div className="column is-half">
            <div
              className="column"
              style={{
                width: "50vw",
                height: "100vh",
                backgroundImage: `url("/img/gambar-login.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "fixed",
                left: "0",
                top: "0",
              }}
            ></div>
             {/* Logo di luar form */}
             <img
                src="/img/gambar-login.jpg" // Ganti dengan path logo Anda
                alt="Logo"
                style={{ width: "150px", marginBottom: "650px",marginLeft: "1070px"  }}
              />
            </div>

               


            <div className="column is-half" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft:"150px"}}>
              <div className="box" style={{ maxWidth: "400px", width: "100%" }}>
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2 has-text-centered" style={{color: "#5092f5"}}>Log In</h1>
                <form onSubmit={Auth}>
                  <div className="field">
                    <label className="label" style={{color: "#5092f5"}}>Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={{borderColor: "#5092f5"}}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" style={{color: "#5092f5"}}>Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                        style={{borderColor: "#5092f5"}}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button type="submit" className="button is-fullwidth" style={{backgroundColor: "#5092f5", color: "white"}}>
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </form>
                <p className="has-text-centered mt-3">
                  Belum punya akun? <a href="#" style={{color: "#5092f5"}}>Daftar Sekarang</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
