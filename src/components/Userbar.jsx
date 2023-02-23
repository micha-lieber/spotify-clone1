import React from "react";

export default function Userbar() {
  return (
    <div className="w-full h-[6%] bg-black flex justify-end gap-4 p-2">
      <button className="border border-white rounded-md p-1 font-semibold">
        username
      </button>
      <button className="border p-1 rounded-md font-semibold">signout</button>
    </div>
  );
}
