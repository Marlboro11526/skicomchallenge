import { useEffect, useState } from "react";
import { Redirect } from "react-router";

function Form() {
  const basePath = process.env.REACT_APP_API_BASE_URL;
  const usersController = "/users";
  const resortsController = "/resorts";

  const [resorts, setResorts] = useState([]);
  const [redirect, setRedirect] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let newUser = {
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      email: e.target[2].value,
      favorite_resort: e.target[3].value,
    };

    await fetch(`${basePath + usersController}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => setRedirect(`/thankyou/${data.$oid}`))
      .catch(console.log);
  }

  useEffect((_) => {
    const fetchData = async () => {
      fetch(`${basePath + resortsController}`)
        .then((res) => res.json())
        .then((data) => setResorts(data))
        .catch(console.log);
    };

    fetchData();
  }, []);

  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <div className="mt-10 sm:mt-0 wrapper">
        <div className="md:grid md:grid-cols-3 md:gap-6 container">
          <div className="md:col-span-1 form-information">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Customer Registration
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please fill your information to register into SkiCom. <br />
                <span style={{ color: "red" }}>All fields are required.</span>
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        required
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        required
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        required
                        type="email"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="resort"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Resort
                      </label>
                      <select
                        required
                        id="resort"
                        name="resort"
                        autoComplete="resort"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {resorts &&
                          resorts.map((item) => (
                            <option key={item._id.$oid} value={item._id.$oid}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
