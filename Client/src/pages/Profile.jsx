import React, { useEffect, useState } from "react";
import userApi from "../api/userApi";
import targetApi from "../api/targetApi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await userApi.getMe();
        setUser(userRes.data.data);

        const targetRes = await targetApi.getTarget();
        if (targetRes.data.data) {
          setTarget(targetRes.data.data);
          setFormData(targetRes.data.data);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await targetApi.updateTarget(formData);
      setTarget(res.data.data);
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
      setTarget(res.data.data);
      setMessage("Target created successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error creating target:", error);
      setMessage("Failed to create target.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-obsessive-cyan animate-pulse">
        LOADING_SUBJECT_DATA...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="border-b border-obsessive-dim pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-white mb-2">
            SUBJECT_DOSSIER
          </h1>
          <p className="text-xs text-obsessive-text/50">
            CLASSIFICATION: RESTRICTED
          </p>
        </div>
        <div className="text-right text-xs text-obsessive-text/50">
          <p>ID: {user?.id?.slice(-8).toUpperCase()}</p>
          <p>STATUS: ACTIVE</p>
        </div>
      </div>

      {user && (
        <div className="mb-8 border border-obsessive-dim bg-obsessive-dim/5 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 text-[10px] text-obsessive-text/30 border-l border-b border-obsessive-dim">
            ACCOUNT_METADATA
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-obsessive-text/40 mb-1">
                CODENAME
              </span>
              <span className="text-lg text-obsessive-cyan font-bold">
                {user.username}
              </span>
            </div>
            <div>
              <span className="block text-xs text-obsessive-text/40 mb-1">
                COMM_LINK
              </span>
              <span className="text-lg text-obsessive-text font-mono">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="border border-obsessive-dim bg-obsessive-black/40 p-6 relative">
        <div className="flex justify-between items-center mb-6 border-b border-obsessive-dim pb-4">
          <h2 className="text-xl text-obsessive-accent font-bold tracking-wider">
            BIOMETRIC_DATA
          </h2>
          {target && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs border border-obsessive-text/30 px-3 py-1 hover:bg-obsessive-text/10 hover:text-white transition-colors"
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

        {!target && !editing ? (
          <div className="text-center py-12 border border-dashed border-obsessive-dim">
            <p className="text-obsessive-text/50 mb-4">
              NO BIOMETRIC DATA FOUND FOR THIS SUBJECT.
            </p>
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-obsessive-cyan text-black font-bold hover:bg-white transition-colors"
            >
              INITIALIZE_RECORD
            </button>
          </div>
        ) : !editing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="border-b border-obsessive-dim/30 pb-2">
              <span className="block text-xs text-obsessive-text/40 mb-1">
                FULL_NAME
              </span>
              <span className="text-lg">
                {target.name?.fisrtName} {target.name?.middleName}{" "}
                {target.name?.lastName}
              </span>
            </div>
            <div className="border-b border-obsessive-dim/30 pb-2">
              <span className="block text-xs text-obsessive-text/40 mb-1">
                DATE_OF_ORIGIN
              </span>
              <span className="text-lg">{target.dob}</span>
            </div>
            <div className="border-b border-obsessive-dim/30 pb-2">
              <span className="block text-xs text-obsessive-text/40 mb-1">
                TEMPORAL_MARKER
              </span>
              <span className="text-lg">{target.birthTime}</span>
            </div>
            <div className="border-b border-obsessive-dim/30 pb-2">
              <span className="block text-xs text-obsessive-text/40 mb-1">
                GEOGRAPHIC_ORIGIN
              </span>
              <span className="text-lg">{target.birthPlace}</span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={target ? handleUpdate : handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-xs text-obsessive-text/40 mb-1">
                FIRST_NAME
              </label>
              <input
                type="text"
                name="fisrtName"
                value={formData.name?.fisrtName || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, fisrtName: e.target.value },
                  })
                }
                className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-obsessive-text/40 mb-1">
                LAST_NAME
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.name?.lastName || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, lastName: e.target.value },
                  })
                }
                className="w-full bg-obsessive-dim border border-obsessive-dim p-2 text-white focus:border-obsessive-cyan outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-obsessive-text/40 mb-1">
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
              <label className="block text-xs text-obsessive-text/40 mb-1">
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
              <label className="block text-xs text-obsessive-text/40 mb-1">
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

            <div className="md:col-span-2 flex gap-4 mt-4">
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
                  if (target) setFormData(target);
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
  );
};

export default Profile;
