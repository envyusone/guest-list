import { useState } from "react";

const dummyGuests = [
  { id: 1, name: "Edmond Steuber", email: "Edmond.Steuber@example.com" },
  { id: 2, name: "Nichole Luettgen", email: "Nichole_Luettgen43@example.org" },
  { id: 3, name: "Idell Mayert", email: "Idell_Mayert@example.org" },
];

export default function App() {
  const [guests, setGuests] = useState(dummyGuests);

  return (
    <div className="App">
      <h1>Guest List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => {
            return (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>{guest.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
