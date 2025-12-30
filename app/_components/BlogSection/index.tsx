"use client";

import { useState } from "react";
import BlogList from "../BlogList";
import DraggableWindow from "../DraggableWindow";
import { Blog } from "@/app/_libs/microcms";
import styles from "./index.module.css";

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleSelect = (blog: Blog, pos: { x: number; y: number }) => {
    setSelectedBlog(blog);
    setPosition(pos);
  };

  return (
    <>
      <BlogList blogs={blogs} onSelect={handleSelect} />
      {selectedBlog && (
        <DraggableWindow
          title={selectedBlog.title}
          onClose={() => setSelectedBlog(null)}
          defaultPosition={position}
          style={{ top: 0, left: 0, width: "600px", maxWidth: "90vw" }}
        >
          <div className={styles.blogContent}>
            <div
              dangerouslySetInnerHTML={{ __html: selectedBlog.content || "" }}
            />
          </div>
        </DraggableWindow>
      )}
    </>
  );
}
