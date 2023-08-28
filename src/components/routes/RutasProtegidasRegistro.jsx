import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Registro from "../view/Registro"

function RutasProtegidas() {
  return (
    <Routes>
        <Route exact path="/" element={<Registro></Registro>}></Route>
    </Routes>
  )
}

export default RutasProtegidas