import { useState, useEffect } from "react";

const COHORT = "2601-FTB-CT-WEB-PT"; 
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2601-FTB-CT-WEB-PT/guests`;

export default function App() {
  const [guests, setGuests] = useState([]); 
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setGuests(result.data);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    }
    fetchGuests();
  }, []); 

  useEffect(() => {
    async function fetchSingleGuest() {
      if (!selectedGuestId) {
        setSelectedGuest(null);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/${selectedGuestId}`);
        const result = await response.json();
        setSelectedGuest(result.data);
      } catch (error) {
        console.error("Error fetching guest details:", error);
      }
    }
    fetchSingleGuest();
  }, [selectedGuestId]); 

  return (
    <div className="App">
      <h1>Guest List</h1>

      {selectedGuest ? (
        <div className="details-view">
          <h2>Details for {selectedGuest.name}</h2>
          <p><strong>Email:</strong> {selectedGuest.email}</p>
          <p><strong>Phone:</strong> {selectedGuest.phone}</p>
          <p><strong>Job:</strong> {selectedGuest.job || "N/A"}</p>
          <p><strong>Bio:</strong> {selectedGuest.bio || "No bio available."}</p>
          
          <button onClick={() => setSelectedGuestId(null)}>Back to List</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} onClick={() => setSelectedGuestId(guest.id)}>
                <td>{guest.name}</td>
                <td>{guest.email}</td>
                <td>{guest.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

