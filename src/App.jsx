import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [continents, setContinents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.post("https://countries.trevorblades.com/", {
        query: `
          {
            continents {
              name
              countries {
                name
                emoji
              }
            }
          }
        `,
      });

      const data = response.data.data;

      //Sort Continents A-Z
      const sortContinents = data.continents.map((continent) => ({
        ...continent,
        countries: continent.countries.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      }));

      setContinents(sortContinents);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="pt-2 pb-2 text-lg font-bold">World Countries</h1>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        <div className="flex flex-row justify-center items-start space-x-4">
          {continents.map((continent) => (
            <div
              className="border border-slate-600 w-[250px] rounded-md"
              key={continent.name}
            >
              <h1 className="text-lg text-center pt-2 pb-2">
                {continent.name}
              </h1>
              {continent.countries.map((country) => (
                <div key={country.name}>
                  <span
                    className="p-2 font-noto"
                    role="img"
                    aria-label={country.name}
                  >
                    {country.emoji}
                  </span>
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
