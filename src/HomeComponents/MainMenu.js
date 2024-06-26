import React, { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './login';
import AdminMenu from '../AdminComponents/AdminMenu';
import AdminHome from '../AdminComponents/AdminHome';
import Navbar from './Navbar';
import AdminLogin from './AdminLogin';
import DoctorLogin from './DoctorLogin';
import Logout from '../AdminComponents/Logout';
import DoctorMenu from '../DoctorComponents/DoctorMenu';
import DoctorHome from '../DoctorComponents/DoctorHome';
import UserLogin from './UserLogin';
import UserMenu from '../UserComponents.js/UserMenu';
import UserHome from '../UserComponents.js/UserHome';
import PharmacyMenu from '../PharmacyComponents/PharmacyMenu';
import PharmacyLogin from './PharmacyLogin';
import PharmacyHome from '../PharmacyComponents/PharmacyHome';
import DoctorRegistration from './DoctorRegistration';
import UserRegistration from './UserRegistration';
import PharmacyRegistration from './PharmacyRegistration';
import ViewDoctors from '../AdminComponents/viewDoctors';
import ViewUsers from '../AdminComponents/viewUsers';
import ViewPharmacy from '../AdminComponents/viewPharmacy';
import AddSchedule from '../DoctorComponents/AddSchedule';
import ViewSchedules from '../DoctorComponents/ViewSchedules';
import DoctorProfile from '../DoctorComponents/DoctorProfile';
import ViewAppointments from '../AdminComponents/viewAppointments';
import ViewDoctorAppointments from '../DoctorComponents/ViewDoctorAppointments';
import AddMedicalHistory from '../UserComponents.js/AddMedicalHistory';
import UserProfile from '../UserComponents.js/UserProfile';
import ViewMedicalHistory from '../UserComponents.js/ViewMedicalHistory';
import AddBankAccount from '../UserComponents.js/AddBankAccount';
import EditProfileForm from '../DoctorComponents/EditProfileForm'; // Adjusted import path


import ViewMedicalHistoryByUser from '../UserComponents.js/ViewMedicalHistoryByUer';
import ProfilePictureModal from '../DoctorComponents/ProfilePictureModal';
import PrescriptionModal from '../DoctorComponents/AddPrescription';
import UserAppointments from '../UserComponents.js/UserAppointments';
import PharmacyPrescriptionView from '../PharmacyComponents/PharmacyPrescriptionView';
import PharmacyProfile from '../PharmacyComponents/PharmacyProfile';
import EditPharmacyProfile from '../PharmacyComponents/EditPharmacyProfile';
import ViewReviews from '../AdminComponents/viewReviews';
import ViewUserReviews from './ViewUserReviews';

export default function MainMenu() {
  const [loginState, setLoginState] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  
  return (
    <BrowserRouter>
      <main>
        {loginState === "Admin" ? <AdminMenu /> : loginState === "Doctor" ? <DoctorMenu /> : loginState === "User" ? <UserMenu /> :
          loginState === "Pharmacy" ? <PharmacyMenu /> : <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-login' element={<AdminLogin setLoginState={setLoginState} />} />
          {/* Other routes */}
          {loginState === "Admin" && (
            <>
              <Route path="/admin/adminmenu" element={<AdminMenu />} />
              <Route path="/admin/adminhome" element={<AdminHome />} />
              <Route path="/admin/viewdoctors" element={<ViewDoctors />} />
              <Route path="/admin/viewusers" element={<ViewUsers />} />
              <Route path="/admin/viewpharmacy" element={<ViewPharmacy />} />
              <Route path="/admin/viewAppointments" element={<ViewAppointments />} />
              <Route path="/admin/viewReviews" element={<ViewReviews/>} />
              <Route path='/admin/logout' element={<Logout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}
          <Route path='/doctor-login' element={<DoctorLogin setLoginState={setLoginState} />} />
          {loginState === "Doctor" && (
            <>
              <Route path="/doctor/doctormenu" element={<DoctorMenu />} />
              <Route path="/doctor/doctorhome" element={<DoctorHome />} />
              <Route path="/doctor/addschedule" element={<AddSchedule />} />
              <Route path="/doctor/viewprofile" element={<DoctorProfile />} />
              <Route path="/doctor/edit-profile" element={<EditProfileForm />} />
              <Route path="/doctor/viewschedules" element={<ViewSchedules />} />
              <Route path="/doctor/viewappointments" element={<ViewDoctorAppointments />} />
              <Route path="/UserComponents/ViewMedicalHistory/:userId" element={<ViewMedicalHistory />} />
              <Route path="/doctor/viewreviews" element={<ViewUserReviews />} /> 
              <Route path='/doctor/logout' element={<Logout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          <Route path='/user-login' element={<UserLogin setLoginState={setLoginState} />} />
          {/* Other routes */}
          {loginState === "User" && (
            <>
              <Route path="/user/usermenu" element={<UserMenu />} />
              <Route path="/user/userhome" element={<UserHome  />} />
              <Route path="/user/viewprofile" element={<UserProfile />} />
              <Route path="/user/addmedicalhistory" element={<AddMedicalHistory />} />
              <Route path="/user/viewmedicalhistory/:userId" element={<ViewMedicalHistoryByUser />} />
              <Route path="/user/addbankaccount" element={<AddBankAccount />} />
              <Route path="/user/userappointments/:userId" element={<UserAppointments />} />
              <Route path='/user/logout' element={<Logout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          <Route path='/pharmacy-login' element={<PharmacyLogin setLoginState={setLoginState} />} />
          {/* Other routes */}
          {loginState === "Pharmacy" && (
            <>
              <Route path="/pharmacy/pharmacymenu" element={<PharmacyMenu />} />
              <Route path="/pharmacy/pharmacyhome" element={<PharmacyHome />} />
              <Route path="/pharmacy/profile" element={<PharmacyProfile />} />
              <Route path="/pharmacy/edit-profile" element={<EditPharmacyProfile />} />
              <Route path="/pharmacy/viewprescriptions" element={<PharmacyPrescriptionView />} />
              <Route path='/pharmacy/logout' element={<Logout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          <Route path='/doctor-signup' element={<DoctorRegistration />} />
          <Route path='/user-signup' element={<UserRegistration />} />
          <Route path='/pharmacy-signup' element={<PharmacyRegistration />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}
