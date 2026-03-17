import { useState } from "react";

const dummyGuests = [
  { id: 1, name: "Edmond Steuber", email: "Edmond.Steuber@example.com", phone: "466-489-9248 x348" },
  { id: 2, name: "Nichole Luettgen", email: "Nichole_Luettgen43@example.org", phone: "1-333-579-6094 x83316" },
  { id: 3, name: "Idell Mayert", email: "Idell_Mayert@example.org", phone: "583-250-0421 x9996" },
];

export default function App() {
  const [guests, setGuests] = useState(dummyGuests);
  const [selectedGuestId, setSelectedGuestId] = useState(null);

  return (
    <div className="App">
      <h1>Guest List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => {
            return (
              <tr 
                key={guest.id} 
                onClick={() => setSelectedGuestId(guest.id)}
                className={selectedGuestId === guest.id ? "selected" : ""}
              >
                <td>{guest.name}</td>
                <td>{guest.email}</td>
                <td>{guest.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
