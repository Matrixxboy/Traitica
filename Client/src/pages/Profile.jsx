import React, { useEffect, useState } from "react";
import userApi from "../api/userApi";
import targetApi from "../api/targetApi";
import TerminalHero from "../components/TerminalHero";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [targets, setTargets] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await userApi.getMe();
        setUser(userRes.data.data);

        const targetsRes = await targetApi.getTargets();
        if (targetsRes.data.data) {
          setTargets(targetsRes.data.data);
          if (targetsRes.data.data.length > 0) {
            setSelectedTarget(targetsRes.data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: { ...formData.name, [e.target.name]: e.target.value },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await targetApi.updateTarget(selectedTarget._id, formData);
      const updatedTarget = res.data.data;

      const updatedTargets = targets.map((t) =>
        t._id === updatedTarget._id ? updatedTarget : t
      );

      setTargets(updatedTargets);
      setSelectedTarget(updatedTarget);
      setEditing(false);
      setMessage("Target updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating target:", error);
      setMessage("Failed to update target.");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await targetApi.createTarget(formData);
      const newTarget = res.data.data;

      setTargets([...targets, newTarget]);
      setSelectedTarget(newTarget);
      setEditing(false);
      setMessage("Target created successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error creating target:", error);
      setMessage("Failed to create target.");
    }
  };

  const startEditing = () => {
    setFormData(selectedTarget || {});
    setEditing(true);
  };

  const startCreating = () => {
    setSelectedTarget(null);
    setFormData({});
    setEditing(true);
  };

  const selectTarget = (target) => {
    setSelectedTarget(target);
    setEditing(false);
    setMessage("");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-obsessive-cyan animate-pulse">
        LOADING_SUBJECT_DATA...
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto pb-12 px-4">
      <div className="border-b border-obsessive-dim pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
            SUBJECT_DOSSIER
          </h1>
          <p className="text-sm text-obsessive-text/50">
            CLASSIFICATION: RESTRICTED
          </p>
        </div>
        <div className="text-right text-sm text-obsessive-text/50">
          <p>ID: {user?._id?.slice(-8).toUpperCase()}</p>

          <p>STATUS: ACTIVE</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm bg-obsessive-cyan/10 hover:bg-obsessive-cyan hover:text-black border border-obsessive-cyan px-2 py-1 transition-colors"
        >
          Terminal
        </button>
        {open && (
          <div className="terminal mt-4">
            <TerminalHero />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between items-start mb-4 border border-obsessive-dim p-4">
        <p className="text-2xl font-bold text-obsessive-cyan">USER_DETAILS</p>
        <div className="flex flex-col items-start">
          <p>NAME: {user?.username}</p>
          <p>EMAIL: {user?.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Subject List */}
        <div className="lg:col-span-1 border border-obsessive-dim bg-obsessive-black/40 p-4 h-fit">
          <div className="flex justify-between items-center mb-4 border-b border-obsessive-dim pb-2">
            <h3 className="text-sm font-bold text-obsessive-cyan">SUBJECTS</h3>
            <button
              onClick={startCreating}
              className="text-sm bg-obsessive-cyan/10 hover:bg-obsessive-cyan hover:text-black border border-obsessive-cyan px-2 py-1 transition-colors"
            >
              + NEW
            </button>
          </div>

          <div className="space-y-2">
            {targets.map((target) => (
              <div
                key={target._id}
                onClick={() => selectTarget(target)}
                className={`p-2 cursor-pointer border-l-2 transition-all ${
                  selectedTarget?._id === target._id
                    ? "border-obsessive-cyan bg-obsessive-cyan/5 text-white"
                    : "border-transparent hover:border-obsessive-dim hover:bg-obsessive-dim/5 text-obsessive-text/70"
                }`}
              >
                <div className="font-bold text-sm truncate">
                  {target.name?.firstName} {target.name?.lastName}
                </div>
                <div className="text-[10px] opacity-60">
                  {target.dob || "UNKNOWN_DATE"}
                </div>
              </div>
            ))}

            {targets.length === 0 && (
              <div className="text-sm text-obsessive-text/40 italic text-center py-4">
                NO_SUBJECTS_FOUND
              </div>
            )}
          </div>
        </div>

        {/* Main Content: Details or Form */}
        <div className="lg:col-span-3 border border-obsessive-dim bg-obsessive-black/40 p-6 relative min-h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-obsessive-dim pb-4">
            <h2 className="text-xl text-obsessive-accent font-bold tracking-wider">
              {editing
                ? selectedTarget
                  ? "EDIT_RECORD"
                  : "NEW_RECORD"
                : "BIOMETRIC_DATA"}
            </h2>
            {selectedTarget && !editing && (
              <button
                onClick={startEditing}
                className="text-sm border border-obsessive-text/30 px-3 py-1 hover:bg-obsessive-text/10 hover:text-white transition-colors"
              >
                [ EDIT_RECORD ]
              </button>
            )}
          </div>

          {message && (
            <div
              className={`mb-4 p-2 text-sm border ${
                message.includes("Failed")
                  ? "border-red-500/50 text-red-500 bg-red-500/10"
                  : "border-green-500/50 text-green-500 bg-green-500/10"
              }`}
            >
              &gt; {message}
            </div>
          )}

          {!selectedTarget && !editing ? (
            <div className="text-center py-12 border border-dashed border-obsessive-dim">
              <p className="text-obsessive-text/50 mb-4">
                SELECT A SUBJECT TO VIEW DATA OR CREATE A NEW RECORD.
              </p>
              <button
                onClick={startCreating}
                className="px-6 py-2 bg-obsessive-cyan text-black font-bold hover:bg-white transition-colors"
              >
                INITIALIZE_RECORD
              </button>
            </div>
          ) : !editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="border-b border-obsessive-dim/30 pb-2">
                <span className="block text-sm text-obsessive-text/40 mb-1">
                  FULL_NAME
                </span>
                <span className="text-lg">
                  {selectedTarget.name?.firstName}{" "}
                  {selectedTarget.name?.middleName}{" "}
                  {selectedTarget.name?.lastName}
                </span>
              </div>
              <div className="border-b border-obsessive-dim/30 pb-2">
                <span className="block text-sm text-obsessive-text/40 mb-1">
                  DATE_OF_ORIGIN
                </span>
                <span className="text-lg">{selectedTarget.dob}</span>
              </div>
              <div className="border-b border-obsessive-dim/30 pb-2">
                <span className="block text-sm text-obsessive-text/40 mb-1">
                  TEMPORAL_MARKER
                </span>
                <span className="text-lg">{selectedTarget.birthTime}</span>
              </div>
              <div className="border-b border-obsessive-dim/30 pb-2">
                <span className="block text-sm text-obsessive-text/40 mb-1">
                  GEOGRAPHIC_ORIGIN
                </span>
                <span className="text-lg">{selectedTarget.birthPlace}</span>
              </div>
            </div>
          ) : (
            <form
              onSubmit={selectedTarget ? handleUpdate : handleCreate}
              className="space-y-8"
            >
              {/* Basic Details */}
              <div>
                <h5 className="text-obsessive-cyan font-bold mb-4 border-b border-obsessive-dim pb-2 tracking-wider">
                  BASIC_DETAILS
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      FIRST_NAME
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.name?.firstName || ""}
                      onChange={handleNameChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      Middle_NAME
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.name?.middleName || ""}
                      onChange={handleNameChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      LAST_NAME
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.name?.lastName || ""}
                      onChange={handleNameChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      DATE_OF_BIRTH
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      BIRTH_TIME
                    </label>
                    <input
                      type="time"
                      name="birthTime"
                      value={formData.birthTime || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      BIRTH_PLACE
                    </label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <h5 className="text-obsessive-cyan font-bold mb-4 border-b border-obsessive-dim pb-2 tracking-wider">
                  ADDRESS_DATA
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      ADDRESS
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      STATE
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      COUNTRY
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      PINCODE
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h5 className="text-obsessive-cyan font-bold mb-4 border-b border-obsessive-dim pb-2 tracking-wider">
                  CONTACT_DATA
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      PHONE
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Family Details */}
              <div>
                <h5 className="text-obsessive-cyan font-bold mb-4 border-b border-obsessive-dim pb-2 tracking-wider">
                  FAMILY_DATA
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      FATHER_NAME
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      FATHER_OCCUPATION
                    </label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      value={formData.fatherOccupation || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      MOTHER_NAME
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      MOTHER_OCCUPATION
                    </label>
                    <input
                      type="text"
                      name="motherOccupation"
                      value={formData.motherOccupation || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div>
                <h5 className="text-obsessive-cyan font-bold mb-4 border-b border-obsessive-dim pb-2 tracking-wider">
                  FINANCIAL_DATA
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      JOB_ROLE
                    </label>
                    <input
                      type="text"
                      name="jobRole"
                      value={formData.jobRole || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      JOB_TYPE
                    </label>
                    <input
                      type="text"
                      name="jobType"
                      value={formData.jobType || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      INCOME
                    </label>
                    <input
                      type="text"
                      name="income"
                      value={formData.income || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      ASSETS
                    </label>
                    <input
                      type="text"
                      name="assets"
                      value={formData.assets || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      LIABILITIES
                    </label>
                    <input
                      type="text"
                      name="liabilities"
                      value={formData.liabilities || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Health Details */}
              <div>
                <h5 className="text-obsessive-cyan font-bold mb-4 border-b border-obsessive-dim pb-2 tracking-wider">
                  BIOLOGICAL_DATA
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      HEIGHT
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      WEIGHT
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-obsessive-text/40 mb-1">
                      BLOOD_GROUP
                    </label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={formData.bloodGroup || ""}
                      onChange={handleInputChange}
                      className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-4 border-t border-obsessive-dim">
                <button
                  type="submit"
                  className="px-6 py-2 bg-obsessive-cyan text-black font-bold hover:bg-white transition-colors"
                >
                  SAVE_RECORD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    if (selectedTarget) {
                      setFormData(selectedTarget);
                    } else if (targets.length > 0) {
                      setSelectedTarget(targets[0]);
                    }
                  }}
                  className="px-6 py-2 border border-obsessive-dim text-obsessive-text/60 hover:text-white transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
