"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const [identityColor, setIdentityColor] = useState("#000000");

  useEffect(() => {
    if (clientId) {
      fetch(`api/user/${clientId}`)
        .then((response) => response.json())
        .then((data) => setIdentityColor(data.identityColor))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [clientId]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentityColor(event.target.value);
  };

  const saveColor = () => {
    if (clientId) {
      fetch(`/api/user/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identityColor }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Color updated:", data);
        })
        .catch((error) => console.error("Error updating color:", error));
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <label htmlFor="colorInput">Identity Color:</label>
        <input
          type="color"
          id="colorInput"
          value={identityColor}
          onChange={handleColorChange}
        />
        <Button variant="outline" onClick={saveColor}>
          Save Color
        </Button>
      </div>
    </div>
  );
}
