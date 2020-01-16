import React from "react"
import "../styles/layout.css"
import Header from "./header"

export default ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
)
