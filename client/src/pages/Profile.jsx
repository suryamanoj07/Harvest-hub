import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  // State for form fields
  const [userName, setUserName] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [personalPhone, setPersonalPhone] = useState("");
  const [personalAddress, setPersonalAddress] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const [logo, setLogo] = useState(null);
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [userRole, setUserRole] = useState("");

  const userAuthToken = localStorage.getItem("user_auth_token");
  const authFormData = new FormData();
  authFormData.append("user_auth_token", userAuthToken);

  useEffect(() => {
    // Fetch user profile data
    fetch("http://localhost:3000/api/user/get-user-profile", {
      method: "POST",
      body: authFormData,
    })
      .then((response) => response.json())
      .then((data) => {
        const userDetails = data.user_details;
        const businessInfo = data.business_info;

        setUserName(userDetails.user_name);
        setPersonalEmail(userDetails.personal_email);
        setPersonalPhone(userDetails.personal_contact_number);
        setPersonalAddress(userDetails.personal_address);
        setUserRole(userDetails.role);

        if (userDetails.role === "farmer") {
          setBusinessName(businessInfo.business_name);
          setBusinessEmail(businessInfo.business_email);
          setBusinessPhone(businessInfo.business_contact_number);
          setBusinessAddress(businessInfo.business_address);
          setAccountNumber(businessInfo.business_account_number);
          setGstin(businessInfo.business_gstin);
          setAboutBusiness(businessInfo.business_about);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Fetch profile image
    fetch("http://localhost:3000/api/user/profile-image", {
      method: "POST",
      body: authFormData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching profile image");
        }
        return response.blob();
      })
      .then((blob) => {
        const imgUrl = URL.createObjectURL(blob);
        setLogo(imgUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }, []);

  const handleLogoUpload = (event) => {
    setLogo(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_auth_token", userAuthToken);
    formData.append("user_name", userName);
    formData.append("personal_email", personalEmail);
    formData.append("personal_contact_number", personalPhone);
    formData.append("personal_address", personalAddress);

    if (userRole === "farmer") {
      formData.append("business_name", businessName);
      formData.append("business_email", businessEmail);
      formData.append("business_contact_number", businessPhone);
      formData.append("business_address", businessAddress);
      formData.append("business_account_number", accountNumber);
      formData.append("business_gstin", gstin);
      formData.append("business_about", aboutBusiness);
    }

    fetch("http://localhost:3000/api/user/update-profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="top-blur"></div>

      <div className="w-80 h-36 mt-48 flex ml-8">
        <img
          id="profile-image"
          className="rounded-full w-36 h-36 mr-9"
          src={logo || "/images/avatar.jpg"}
          alt="profile"
        />
        <div className="relative mt-16">
          <p
            className="mt-4 to-black text-base tracking-tight leading-relaxed whitespace-nowrap"
            style={{ fontWeight: "normal", color: "#000000" }}
          >
            Hello,
          </p>
          <p
            className="text-xl"
            style={{ fontWeight: "semi-bold", color: "#000000" }}
          >
            {userName}
          </p>
        </div>
      </div>

      <div className="class-1140 block" style={{ marginTop: "4rem" }}>
        <p className="pb-4 text-xl font-normal font-sans">Personal info</p>
        <div className="border-dotted border-2 border-gray-700 mr-7 rounded-2xl glass-mor">
          <div className="m-8">
            <form>
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
                    required
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
                    required
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
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    value={personalPhone}
                    onChange={(e) => setPersonalPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="Address"
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
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {userRole === "farmer" && (
        <div className="class-1140 block" style={{ marginTop: "4rem" }}>
          <p className="pb-4 text-xl font-normal">Business info</p>
          <div className="border-dotted border-2 mr-7 rounded-2xl mb-11 glass-mor">
            <div className="m-8 h-auto">
              <form onSubmit={handleSubmit}>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="abc"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  <div></div>
                  <div>
                    <label
                      htmlFor="email_2"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="business-email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="abc@gmail.com"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      Contact
                    </label>
                    <input
                      type="tel"
                      id="business-contact-number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="123-45-678"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address_2"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="business-address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="account_number"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      Account number
                    </label>
                    <input
                      type="text"
                      id="account-number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gstin"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      GSTIN
                    </label>
                    <input
                      type="text"
                      id="gstin"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="gstin"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="about_business"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      About business
                    </label>
                    <textarea
                      id="about-business"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="about business"
                      value={aboutBusiness}
                      onChange={(e) => setAboutBusiness(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="logo"
                      className="block mb-2 text-sm to-black font-bold"
                    >
                      Logo
                    </label>
                    <input
                      type="file"
                      id="logo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={handleLogoUpload}
                    />
                  </div>
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
      )}
    </div>
  );
}
