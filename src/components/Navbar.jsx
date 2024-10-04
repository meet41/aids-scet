import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector('.dropdown-content').style.display = 'flex';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector('.dropdown-content').style.display = 'none';
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-home-alt icon'></i>
                  <span className="text nav-text">About Us</span>
                </a>
                <div className="dropdown-content">
                  <a href="/Aboutus">About the Department</a>
                  <a href="/Message">Message from Head</a>
                  <a href="/Vision">Vision</a>
                  <a href="/Mission">Mission</a>
                  <a href="/Peo">PEOs</a>
                  <a href="/Po">POs</a>
                  <a href="/Pso">PSOs</a>
                  <a href="https://scet.ac.in/department/information-technology/#gsc.tab=0">Staff Information</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-bar-chart-alt-2 icon'></i>
                  <span className="text nav-text">Academics</span>
                </a>
                <div className="dropdown-content">
                  <a href="/Syllabus">Syllabus - AIDS</a>
                  <a href="/showanalysis">Result Analysis</a>
                  <a href="/showcalender">Academics Calender</a>
                  <a href="/showtable">Class & Faculty Time Table</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-bell icon'></i>
                  <span className="text nav-text">Exams</span>
                </a>
                <div className="dropdown-content">
                  <a href="https://itai.escet.online/docs/ContEvaluation/Norms_2023-24.pdf">Continous Evaluation Scheme</a>
                  <a href="/results">Schedules</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-pie-chart-alt icon'></i>
                  <span className="text nav-text">Industrial Interaction</span>
                </a>
                <div className="dropdown-content">
                  <a href="https://docs.google.com/spreadsheets/d/1cT2mOLGMFz_1KXDbimMNzvD58IXe4afwi2dU_RN6PDM/edit?usp=sharing">T&P Data</a>
                  <a href="/showind">Industrial Visit</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-heart icon'></i>
                  <span className="text nav-text">Student Corner</span>
                </a>
                <div className="dropdown-content">
                  <a href="/showstud">Student Information</a>
                  <a href="/showstud">Student Achievements</a>
                  <a href="/scholar">Scholarships</a>
                  <a href="/showalumini">Alumini Data</a>
                  <a href="/iep">IEP Students</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-wallet icon'></i>
                  <span className="text nav-text">Events</span>
                </a>
                <div className="dropdown-content dropdown-content-upwards">
                  <a href="/Converse">Converse</a>
                  <a href="/Converse">Expert Talks/ Workshops/ STTPs</a>
                  <a href="/showathletics">AIDS Athletics</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-wallet icon'></i>
                  <span className="text nav-text">Library</span>
                </a>
                <div className="dropdown-content dropdown-content-upwards">
                  <a href="/172.16.13.24">Central Library Access</a>
                  <a href="https://docs.google.com/spreadsheets/d/1gWMAQb8wakv0Tp4Hq1Y3L_ldzQZtbEBG/edit#gid=2055710262">Books in Dept</a>
                  <a href="https://docs.google.com/document/d/1sBS_0wIFJhIl-GFofH6kntVjEjtke4w4/edit">CDs in Dept</a>
                  <a href="https://itai.escet.online/docs/library/central_library_info.pdf">Central Library Info</a>
                  <a href="https://itai.escet.online/docs/library/manual_central.pdf">Library Manual</a>
                </div>
              </li>
              <li className="nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="#">
                  <i className='bx bx-wallet icon'></i>
                  <span className="text nav-text">Quick Links</span>
                </a>
                <div className="dropdown-content dropdown-content-upwards">
                  <a href="https://itai.escet.online/docs/holiday/holidays.pdf">List of Holidays</a>
                  <a href="https://itai.escet.online/docs/committees/list/2024-2025.pdf">Department Committee: 2024-25</a>
                  <a href="https://itai.escet.online/docs/classteachers/2024-2025.pdf">Class Teachers : 2024-25</a>
                  <a href="https://itai.escet.online/docs/CR-LR-Form.pdf">CR LR Candidate Form</a>
                  <a href="https://www.scetlms.in/">SCET Leave Management</a>
                  <a href="https://itai.escet.online/docs/intra.pdf">Intra Phone Directory</a>
                  <a href="http://172.16.11.2/">College Intranet</a>
                  <a href="http://172.16.3.1:4080/login/index.php">Kerio Firewall</a>
                  <a href="https://itai.escet.online/docs/internet_policy.pdf">Policy for Internet Usage</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="home">
        {/* <div className="text">Dashboard Sidebar</div> */}
      </section>
    </div>
  );
};

export default Navbar;