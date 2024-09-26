import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./Profile.css";

export default function Profile() {
  const token = localStorage.getItem("token");
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(currentUser?.username || "");
  const [personalEmail, setPersonalEmail] = useState(currentUser?.email || "");
  const [personalPhone, setPersonalPhone] = useState(currentUser?.contact_number || "");
  const [personalAddress, setPersonalAddress] = useState(currentUser?.personal_address || "");

  const [businessName, setBusinessName] = useState(currentUser?.business_name || "");
  const [businessEmail, setBusinessEmail] = useState(currentUser?.business_email || "");
  const [businessPhone, setBusinessPhone] = useState(currentUser?.business_contact_number || "");
  const [businessAddress, setBusinessAddress] = useState(currentUser?.business_address || "");
  const [accountNumber, setAccountNumber] = useState(currentUser?.business_account_number || "");
  const [gstin, setGstin] = useState(currentUser?.business_gstin || "");
  const [aboutBusiness, setAboutBusiness] = useState(currentUser?.business_about || "");
  const [userRole, setUserRole] = useState(currentUser?.role || "");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Fetch user profile only when the component mounts
  useEffect(() => {
    fetchUserProfile();
  }, [token]); // Depend on token to refetch if it changes

  const fetchUserProfile = () => {
    fetch("http://localhost:3000/api/user/get-user-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_auth_token: token }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          // Update Redux store with user details
          dispatch({ type: 'UPDATE_USER', payload: data.user_details });
        } else {
          console.error("Failed to fetch user profile.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Sync local state with Redux store on user update
    setUserName(currentUser?.username || "");
    setPersonalEmail(currentUser?.email || "");
    setPersonalPhone(currentUser?.contact_number || "");
    setPersonalAddress(currentUser?.personal_address || "");
    setBusinessName(currentUser?.business_name || "");
    setBusinessEmail(currentUser?.business_email || "");
    setBusinessPhone(currentUser?.business_contact_number || "");
    setBusinessAddress(currentUser?.business_address || "");
    setAccountNumber(currentUser?.business_account_number || "");
    setGstin(currentUser?.business_gstin || "");
    setAboutBusiness(currentUser?.business_about || "");
    setUserRole(currentUser?.role || "");
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      user_auth_token: localStorage.getItem("token"),
      user_name: userName,
      personal_email: personalEmail,
      personal_contact_number: personalPhone,
      personal_address: personalAddress,
      ...(userRole === "farmer" && {
        business_name: businessName,
        business_email: businessEmail,
        business_contact_number: businessPhone,
        business_address: businessAddress,
        business_account_number: accountNumber,
        business_gstin: gstin,
        business_about: aboutBusiness,
      }),
    };

    fetch("http://localhost:3000/api/user/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          // Update Redux store with new user details directly
          dispatch({ type: 'UPDATE_USER', payload: data.user_details });
          setNotificationMessage("Profile updated successfully!");
        } else {
          setNotificationMessage("Failed to update profile.");
        }
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotificationMessage("Failed to update profile.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      });
  };

  return (
    <div>
      <div className="top-blur"></div>

      <div className="hello-container">
        <p className="hello-text">Hello,</p>
        <p className="username-text">{userName}</p>
      </div>

      <div className="class-1140 block" style={{ marginTop: "4rem" }}>
        <p className="pb-4 text-xl font-normal font-sans">Personal info</p>
        <div className="border-dotted border-2 border-gray-700 mr-7 rounded-2xl glass-mor">
          <div className="m-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-9 mb-6 md:grid-cols-1">
                <div>
                  <label
                    htmlFor="user_name"
                    className="block mb-2 text-sm to-black font-bold"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="JohnDoe"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-9 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm to-black font-bold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="personal-email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="ps@gmail.com"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm to-black font-bold"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="personal-contact-number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-45-678"
                    value={personalPhone}
                    onChange={(e) => setPersonalPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="personal-address"
                  className="block mb-2 text-sm to-black font-bold"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="personal-address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="address"
                  value={personalAddress}
                  onChange={(e) => setPersonalAddress(e.target.value)}
                />
              </div>

              {currentUser?.role.toLowerCase() === 'farmer' && (
                <div className="class-1140 block" style={{ marginTop: "4rem" }}>
                  <p className="pb-4 text-xl font-normal">Business info</p>
                  <div className="border-dotted border-2 mr-7 rounded-2xl mb-11 glass-mor">
                    <div className="m-8 h-auto">
                      <div className="grid gap-9 mb-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="business_name"
                            className="block mb-2 text-sm to-black font-bold"
                          >
                            Business/shop name
                          </label>
                          <input
                            type="text"
                            id="business-name"
                            className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="abc"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="business_email"
                            className="block mb-2 text-sm to-black font-bold"
                          >
                            Business Email
                          </label>
                          <input
                            type="email"
                            id="business-email"
                            className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="business_email@gmail.com"
                            value={businessEmail}
                            onChange={(e) => setBusinessEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-9 mb-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="business_phone"
                            className="block mb-2 text-sm to-black font-bold"
                          >
                            Business Phone Number
                          </label>
                          <input
                            type="tel"
                            id="business-contact-number"
                            className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="123-45-678"
                            value={businessPhone}
                            onChange={(e) => setBusinessPhone(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="business_address"
                            className="block mb-2 text-sm to-black font-bold"
                          >
                            Business Address
                          </label>
                          <input
                            type="text"
                            id="business-address"
                            className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="address"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-9 mb-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="account_number"
                            className="block mb-2 text-sm to-black font-bold"
                          >
                            Business Account Number
                          </label>
                          <input
                            type="text"
                            id="business-account-number"
                            className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="account_number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="business_gstin"
                            className="block mb-2 text-sm to-black font-bold"
                          >
                            Business GSTIN
                          </label>
                          <input
                            type="text"
                            id="business-gstin"
                            className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="GSTIN"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="business_about"
                          className="block mb-2 text-sm to-black font-bold"
                        >
                          About your Business
                        </label>
                        <input
                          type="text"
                          id="business-about"
                          className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="About your business"
                          value={aboutBusiness}
                          onChange={(e) => setAboutBusiness(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center mb-6">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
    </div>
  );
}
