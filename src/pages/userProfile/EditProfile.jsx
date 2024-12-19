import { useDispatch } from "react-redux";
import { editProfile } from "../../features/userSlice";
import { useEffect, useState } from "react";
import { handleSuccess } from "../../utilities/utils";

const EditProfile = ({ userDetails }) => {
  const dispatch = useDispatch();

  const [nameOfUser, setNameOfUser] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [sex, setSex] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    if (userDetails) {
      setNameOfUser(userDetails.name);
      setEmail(userDetails.email);
      setUserName(userDetails.userName);
      setDate(userDetails.dob);
      setCity(userDetails.city);
      setSex(userDetails.sex);
      setCountry(userDetails.country);
      setPhone(userDetails.phoneNumber);
      setMaritialStatus(userDetails.maritialStatus);
      setProfession(userDetails.profession);
      setBio(userDetails.bio);
    }
  }, [userDetails]);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameOfUser);
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("dob", date);
    formData.append("city", city);
    formData.append("sex", sex);
    formData.append("country", country);
    formData.append("phoneNumber", phone);
    formData.append("maritialStatus", maritialStatus);
    formData.append("profession", profession);
    formData.append("bio", bio);

    if (profileImage) formData.append("image", profileImage);
    if (coverImage) formData.append("coverImage", coverImage);

    dispatch(editProfile({ id: userDetails._id, updateProfile: formData }));
    handleSuccess("Profile Updated Successfully")
  };

  return (
    <>
      <section>
        <div className="card">
          <div className="card-body ">
            <h5 className="card-title text-center">Edit Profile</h5>
            <div className="container">
              <form onSubmit={submitHandler}>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label>Profile Photo</label>
                  </div>
                  <div className="col">
                    <input className="form-control rounded-pill bg-light" type="file" id="formFile" onChange={handleProfileImageChange} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label>Cover Image</label>
                  </div>
                  <div className="col">
                    <input className="form-control rounded-pill bg-light" type="file" id="formFile2" onChange={handleCoverImageChange} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="col">
                    <input type="text" id="name" placeholder="Name" className="form-control rounded-pill bg-light" value={nameOfUser} onChange={(e) => setNameOfUser(e.target.value)} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="col">
                    <input type="email" placeholder="Email" id="email" className="form-control rounded-pill bg-light w-100" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="userName">User Name</label>
                  </div>
                  <div className="col">
                    <input type="text" id="userName" placeholder="@apple" className="form-control rounded-pill bg-light w-100" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label>Sex</label>
                  </div>
                  <div className="col">
                    <input type="radio" name="sex" value="Male" checked={sex === "Male"} onChange={(e) => setSex(e.target.value)} /> Male {"   "}
                    <input type="radio" name="sex" value="Female" checked={sex === "Female"} onChange={(e) => setSex(e.target.value)} /> Female
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="name" className="">
                      Date Of Birth
                    </label>
                  </div>
                  <div className="col">
                    <input id="startDate" className="form-control rounded-pill bg-light" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="col">
                    <input type="text" id="city" placeholder="City" className="form-control rounded-pill bg-light w-100" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="country">Country</label>
                  </div>
                  <div className="col">
                    <input type="text" id="country" placeholder="Country" className="form-control rounded-pill bg-light w-100" value={country} onChange={(e) => setCountry(e.target.value)} />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text rounded-pill" id="basic-addon1">
                        +91
                      </span>
                      <input type="number" className="form-control rounded-pill bg-light" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label>Maritial Status</label>
                  </div>
                  <div className="col">
                    <select className="form-select rounded-pill bg-light" value={maritialStatus} onChange={(e) => setMaritialStatus(e.target.value)}>
                      <option value="" disabled>
                        Status
                      </option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Separated">Separated</option>
                      <option value="Widow">Widow</option>
                      <option value="Complicated">Complicated</option>
                    </select>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-3">
                    <label htmlFor="profession">Profession</label>
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      id="profession"
                      placeholder="Profession"
                      className="form-control rounded-pill bg-light w-100"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row my-3 align-items-center">
                  <div className="col-md-3">
                    <label htmlFor="bio ">Bio</label>
                  </div>
                  <div className="col">
                    <div className="w-100">
                      <textarea
                        className="form-control pe-4 rounded bg-light"
                        rows="2"
                        placeholder="Share your thoughts..."
                        style={{ resize: "none" }}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button className=" btn btn-success " type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditProfile;
