import { useState } from "react";
import { hobbies } from "../pages/home/Profile/HobbyList";

export function useHobbyState() {
  const [activeId, setActiveId] = useState(hobbies[0].id);
  const [tuple, setTuple] = useState([0, 0]);

  const activeHobby = hobbies.find((h) => h.id === activeId);

  const handleHover = (newId, newIndex) => {
    if (newId === activeId) return;
    const currentDirection = newIndex > tuple[0] ? 1 : -1;
    setTuple([newIndex, currentDirection]);
    setActiveId(newId);
  };

  return {
    activeId,
    activeHobby,
    direction: tuple[1],
    handleHover,
  };
}
