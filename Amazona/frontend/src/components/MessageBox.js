import React from "react";
//  * Component de message en cas d'erreur ou autre
export default function MessageBox(props) {
  return (
    <div className={`center alert alert-${props.variant || "center info"}`}>
      {props.children}
    </div>
  );
}
