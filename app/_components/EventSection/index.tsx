"use client";

import { useState } from "react";
import EventList from "../EventList";
import DraggableWindow from "../DraggableWindow";
import Article from "../Article";
import { Event } from "@/app/_libs/microcms";
import styles from "./index.module.css";

export default function EventSection({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleSelect = (event: Event, pos: { x: number; y: number }) => {
    setSelectedEvent(event);
    setPosition(pos);
  };

  return (
    <>
      <EventList events={events} onSelect={handleSelect} />
      {selectedEvent && (
        <DraggableWindow
          title={selectedEvent.title}
          onClose={() => setSelectedEvent(null)}
          defaultPosition={position}
          style={{ top: 0, left: 0, width: "600px", maxWidth: "90vw" }}
        >
          <div className={styles.eventContent}>
            <Article data={selectedEvent} />
          </div>
        </DraggableWindow>
      )}
    </>
  );
}
