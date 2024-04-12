import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [job, setJob] = useState("Web Developer");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [location, setLocation] = useState("City, Country");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile Updated!");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <header className="bg-gray-800 text-white text-center p-4 w-full">
        <h1 className="text-3xl font-bold">User Profile</h1>
      </header>
      <main className="flex-1 p-10 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Information Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Profile content here */}
              <img
                src="https://via.placeholder.com/150"
                alt="Profile Picture"
                className="rounded-full h-24 w-24 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-center text-gray-800">
                {name}
              </h2>
              <p className="text-lg text-center text-gray-600">{job}</p>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Bio:</p>
                <p className="text-gray-600">{bio}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Location:</p>
                <p className="text-gray-600">{location}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Email:</p>
                <p className="text-gray-600">{email}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Phone:</p>
                <p className="text-gray-600">{phone}</p>
              </div>
            </div>

            {/* Update Profile Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Form content here */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-gray-700 font-semibold">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="job" className="text-gray-700 font-semibold">
                    Job:
                  </label>
                  <input
                    type="text"
                    id="job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="text-gray-700 font-semibold">
                    Bio:
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="text-gray-700 font-semibold"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-700 font-semibold"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-gray-700 font-semibold"
                  >
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white rounded-md py-2 mt-4 hover:bg-indigo-600"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
