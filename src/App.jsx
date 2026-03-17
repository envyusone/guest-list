import { useState, useEffect } from "react";

const COHORT = "2601-FTB-CT-WEB-PT"; 
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2601-FTB-CT-WEB-PT/guests`;

async function getAllGuests() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

async function getSingleGuest(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllGuests();
      setGuests(data || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!selectedGuestId) {
        setSelectedGuest(null);
        return;
      }
      const data = await getSingleGuest(selectedGuestId);
      setSelectedGuest(data);
    }
    fetchData();
  }, [selectedGuestId]);

  return (
    <div className="App">
      {selectedGuest ? (
        <div className="details-view">
          <h2>{selectedGuest.name}</h2>
          <p><b>Email:</b> {selectedGuest.email}</p>
          <p><b>Phone:</b> {selectedGuest.phone}</p>
          <p><b>Job:</b> {selectedGuest.job || "N/A"}</p>
          <p><b>Bio:</b> {selectedGuest.bio || "N/A"}</p>
          <button onClick={() => setSelectedGuestId(null)}>Back</button>
        </div>
      ) : (
        <div className="guest-list-box">
          <h1 className="main-header">Guest List</h1>
          
          <div className="guest-header-row">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
          </div>

          <div className="guest-list-container">
            {guests.map((guest) => (
              <div 
                key={guest.id} 
                className={`guest-row ${selectedGuestId === guest.id ? "selected" : ""}`}
                onClick={() => setSelectedGuestId(guest.id)}
              >
                <div>{guest.name}</div>
                <div>{guest.email}</div>
                <div>{guest.phone}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}