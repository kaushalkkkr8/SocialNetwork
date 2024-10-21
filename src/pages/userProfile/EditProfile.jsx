import { useDispatch, useSelector } from "react-redux";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { editProfile, fetchLogInUser } from "../../features/userSlice";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const data = user?.profile || [];
  const userData = data.find((user) => user.logIn === true);
 

  const [nameOfUser, setNameofUser] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");



  useEffect(() => {
    if (!userData) { // Ensure userData exists
      dispatch(fetchLogInUser());
    }
    if (userData) {
      setNameofUser(userData.name);
      setEmail(userData.email);
      setUserName(userData.userName);
      setDate(userData.dob)
      setCity(userData.city);
      setCountry(userData.country);
      setPhone(userData.phoneNumber);
      setMaritialStatus(userData.maritialStatus);
      setProfession(userData.profession);
      setBio(userData.bio);
    }
  }, [dispatch,userData]);

  const submitHandler=(e)=>{
e.preventDefault()
    const updateData={name:nameOfUser,email:email,userName:userName,dob:date,city,country,phoneNumber:phone,maritialStatus,profession,bio}
    dispatch(editProfile({id:userData._id,updateProfile:updateData}))
    
  }

  return (
    <>
      <div className="container-fluid">
        <UserProfileTop />

        <div className=" my-4">
          <div className="row">
            <div className="col-md-3">
              <UserProfileLeft />
            </div>
            <div className="col-md-6">
              <section>
                <div className="card">
                  <div className="card-body ">
                    <h5 className="card-title text-center">Edit Profile</h5>
                    <div className="container">
                      <form action="">
                        <div className="row my-3">
                          <div className="col-md-3">
                            <label>Profile Photo</label>
                          </div>
                          <div className="col">
                            <input class="form-control rounded-pill bg-light" type="file" id="formFile" />
                          </div>
                        </div>
                        <div className="row my-3">
                          <div className="col-md-3">
                            <label>Cover Image</label>
                          </div>
                          <div className="col">
                            <input class="form-control rounded-pill bg-light" type="file" id="formFile2" />
                          </div>
                        </div>
                        <div className="row my-3">
                          <div className="col-md-3">
                            <label htmlFor="name">Name</label>
                          </div>
                          <div className="col">
                            <input type="text" id="name" placeholder="Name" className="form-control rounded-pill bg-light" value={nameOfUser} onChange={(e) => setNameofUser(e.target.value)} />
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
                            <input type="radio" name="sex" value="Male" /> Male {"   "}
                            <input type="radio" name="sex" value="Female" /> Female
                          </div>
                        </div>
                        <div className="row my-3">
                          <div className="col-md-3">
                            <label htmlFor="name" className="">
                              Date Of Birth
                            </label>
                          </div>
                          <div className="col">
                            <input id="startDate" class="form-control rounded-pill bg-light" type="date" value={date} onChange={e=>setDate(e.target.value)}  />
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
                            <div class="input-group mb-3">
                              <span class="input-group-text rounded-pill" id="basic-addon1">
                                +91
                              </span>
                              <input type="number" class="form-control rounded-pill bg-light" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="row my-3">
                          <div className="col-md-3">
                            <label>Maritial Status</label>
                          </div>
                          <div className="col">
                            <select className="form-select rounded-pill bg-light" value={maritialStatus} onChange={(e) => setMaritialStatus(e.target.value)}>
                              <option value="" disabled selected>
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
                            <form className="w-100">
                              <textarea
                                className="form-control pe-4 rounded bg-light"
                                rows="2"
                                placeholder="Share your thoughts..."
                                style={{ resize: "none" }}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                              ></textarea>
                            </form>
                          </div>
                        </div>
                        <div className="text-center">
                          <button className=" btn btn-success " onClick={submitHandler}>Update</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-md-3 ">
              <UserProfileRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
