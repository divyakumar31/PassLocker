import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Pass = () => {
  const [passForm, setPassForm] = useState({
    webUrl: "",
    username: "",
    password: "",
  });
  const [passwords, setPasswords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      passForm.webUrl.length >= 12 &&
      passForm.username.length >= 3 &&
      passForm.password.length >= 6
    ) {
      // Add the data to local storage
      setPasswords([...passwords, { ...passForm, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwords, { ...passForm, id: uuidv4() }])
      );
      console.log([...passwords, { ...passForm, id: uuidv4() }]);
      toast.success("Password saved successfully");
      setPassForm({
        webUrl: "",
        username: "",
        password: "",
      });
    } else {
      toast.error("There is some error");
    }
  };

  // To get all passwords from local storage on page load
  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswords(JSON.parse(passwords));
    }
  }, []);

  const editPassword = (id) => {
    setPassForm(passwords.filter((password) => password.id === id)[0]);
    setPasswords(passwords.filter((password) => password.id !== id));
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter((password) => password.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwords.filter((password) => password.id !== id))
    );
    toast.success("Password deleted successfully");
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard!");
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        draggable={true}
        pauseOnHover={false}
        theme="dark"
      />
      <div>
        <Navbar />
      </div>

      {/* Heading */}
      <div className="pt-20 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold flex items-center">
          PassLocker{" "}
          <img src="padlock.png" alt="Lock Image" className="h-8 ml-1" />
        </h1>
        <p className="text-lg">Save your password locally</p>
      </div>

      {/* Form */}
      <div className="py-2">
        <form className="w-6/12 mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col py-2 gap-2">
            <label htmlFor="web-url" className="px-2.5 font-medium">
              Enter website url
            </label>
            <input
              type="url"
              name="web-url"
              id="web-url"
              value={passForm.webUrl}
              placeholder="Ex. https://www.facebook.com/"
              required
              className="p-2.5 rounded-md border border-blue-400 outline-blue-500 bg-white"
              onChange={(e) =>
                setPassForm({ ...passForm, webUrl: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col py-2 gap-2">
              <label htmlFor="username" className="px-2.5 font-medium">
                Enter username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={passForm.username}
                required
                placeholder="Ex. divyakumar31"
                className="p-2.5 rounded-md border border-blue-400 outline-blue-500 bg-white"
                onChange={(e) =>
                  setPassForm({ ...passForm, username: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-2 gap-2">
              <label htmlFor="password" className="px-2.5 font-medium">
                Enter password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={passForm.password}
                required
                placeholder="Ex. yourpassword"
                className="p-2.5 rounded-md border border-blue-400 outline-blue-500 bg-white"
                onChange={(e) =>
                  setPassForm({ ...passForm, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="text-center py-2">
            <button
              className="p-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 w-full"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Passwords */}
      <div className="w-8/12 mx-auto">
        <h2 className="text-xl font-semibold my-2.5">Your Passwords</h2>
        {passwords.length === 0 ? (
          <div>No Passwords to Show</div>
        ) : (
          <table className="table-auto border-collapse w-full rounded-md overflow-hidden mb-3 text-left">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                <th className="p-2 border border-blue-600 border-r-blue-300 w-5/12">
                  Website
                </th>
                <th className="p-2 border border-blue-600 border-r-blue-300">
                  Username
                </th>
                <th className="p-2 border border-blue-600 border-r-blue-300">
                  Password
                </th>
                <th className="p-2 border border-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-blue-100">
              {/* TODO: Change icons for edit and delete button and add logic to them */}
              {passwords.map((password) => (
                <tr key={password.id} className="hover:bg-blue-200">
                  <td className="p-2 border border-blue-300">
                    <a href={password.webUrl} target="_blank">
                      {password.webUrl}
                    </a>
                  </td>
                  <td className="p-2 border border-blue-300">
                    <div className="flex gap-2">
                      <div className="w-9/12">{password.username}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => copyText(password.username)}
                      >
                        📄
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border border-blue-300">
                    <div className="flex gap-2">
                      <div className="w-9/12">{password.password}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => copyText(password.password)}
                      >
                        📄
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border border-blue-300">
                    <div className="flex gap-2">
                      <button
                        className="p-2.5 w-fit"
                        onClick={() => editPassword(password.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2.5 w-fit"
                        onClick={() => deletePassword(password.id)}
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {passwords.map((password) => (
          <div
            key={password.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-2"
          ></div>
        ))}
      </div>
    </>
  );
};

export default Pass;
