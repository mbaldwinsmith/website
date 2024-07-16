import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/blog">Musings</Link></li>
      <li><Link to="/prayer">Prayer</Link></li>
      <li><Link to="/poetry">Poetry</Link></li>
    </ul>
  </nav>
)

export default Navigation
