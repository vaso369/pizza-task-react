import React from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { Text } from './UI/Text/Text'

function App() {
  const title = useSelector((state) => state.global.title)
  return (
    <>
      <div>
        <p>
          <span>
            <Text spreadText="This is" text={title} />
          </span>
        </p>
      </div>
    </>
  )
}

export default App
