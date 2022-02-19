import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
    const [loading, setLoading] = useState(false)
    const [tours, setTours] = useState([])

    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id)
        setTours(newTours)
    }

    const fetchTours = async () => {
        setLoading(true)
        try {

            const tours = await axios(url);
            console.log(tours.data);
            setLoading(false)
            setTours(tours.data)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }


    // Component did Mount

    useEffect(() => {
        fetchTours()
    }, [])


    if (tours.length === 0) {
        return (
            <main>
                <div className='title'>
                    <h2>no tours left</h2>
                    <button className='btn' onClick={() => fetchTours()}>
                        refresh
                    </button>
                </div>
            </main>
        )
    }

    return (
        <div >
            {
                loading ? (<main><Loading /></main>) : ("")
            }
            <Tours tours={tours} removeTour={removeTour} />


        </div>
    )
}

export default App