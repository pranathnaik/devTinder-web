import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import Alert from "./Alert";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "other");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex items-center justify-center mx-10">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title mb-4">Update profile</h2>
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  defaultValue={gender}
                  className="select"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled={true}>Gender</option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </div>
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  className="textarea"
                  placeholder="About"
                  value={about}
                  maxLength={200}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Photo url</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Set photo url"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <p className="text-red-500">{error}</p>
              <div className="form-control w-full max-w-xs mb-4">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
        <Alert errorMessage={error} />
      </div>
    </>
  );
};

export default EditProfile;
