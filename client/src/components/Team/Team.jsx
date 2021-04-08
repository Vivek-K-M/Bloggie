import React from "react";
import "./team.css";
import ashish from "./ashish.jpeg";

function Team() {
  return (
    <section className="section-team">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header-section">
            </div>
          </div>
        </div>

        <div className="team-row row">
          <div className="team-col w-col col-sm-6 col-lg-4">
            <div className="single-person">
              <div className="person-image">
                <a href="https://www.linkedin.com/in/ashish-singh-b6928a1b0/">
                  <img src={ashish} alt=""/>
                </a>
                <span className="icon">
                  <i className="fab fa-js"></i>
                </span>
              </div>
              <div className="person-info">
                <h3 className="full-name">Ashish Singh</h3>
                <span className="speciality">Front End Lead</span>
              </div>
            </div>
          </div>
          
          <div className="team-col col-sm-6 col-lg-4 col-xl-4">
            <div className="single-person">
              <div className="person-image">
                <a href="https://www.linkedin.com/in/vivek-k-m/">
                  <img
                    src="https://media-exp1.licdn.com/dms/image/C5603AQHms39GDi0qig/profile-displayphoto-shrink_400_400/0/1596888096223?e=1620864000&v=beta&t=Mk1HFB9OlTVbKnIV5GocHdW-Du7idgG7L5tIE98DO3A"
                    alt=""
                  />
                </a>
                <span className="icon">
                  <i className="fab fa-node"></i>
                </span>
              </div>
              <div className="person-info">
                <h3 className="full-name">Vivek Kr. Mishra</h3>
                <span className="speciality">Backend Integration Lead</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Team;
