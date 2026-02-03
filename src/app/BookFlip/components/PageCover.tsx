import React from "react"

export const PageCover = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page cover">
    <h1>Pokédex</h1>
    <p>Flip to explore</p>
  </div>
))
PageCover.displayName = 'PageCover'

export const PageBack = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page back">
    <h2>The End</h2>
  </div>
))
PageBack.displayName = 'PageBack'
