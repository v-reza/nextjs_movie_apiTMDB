import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const Home = (props) => {
  const { results } = props.data
  const imgUrl = "https://image.tmdb.org/t/p/w500"
  const [movie, setMovie] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm != "") {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=36bbe004dbbf9b65e693f8d09cab0065&language=en-US&query=' + searchTerm)
        .then(response => {
          setMovie(response.data.results)
        }).catch(error => {
          console.log(error);
        })
    } else {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=36bbe004dbbf9b65e693f8d09cab0065&language=en-US&query=a')
        .then(response => {
          setMovie(response.data.results)
        }).catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    setMovie(results)
  }, [])

  return (
    <div>
      <Navbar searchHandler={searchHandler} term={searchTerm} />
      <br /><br /><br />
      <div className='container'>
        <h2 style={{ color: "#FFF" }}>Popular Movie</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {
            movie && movie.length > 0 ? movie.map((item) => (
              <div className="col" key={item.id}>
                <Link href={`detail/${item.id}`}>
                  <div className="card h-100 hoverable">
                    <img src={imgUrl + item.poster_path} className="card-img-top" alt="Skyscrapers" />
                    <div className='img_description_layer'>
                      <p className='img_description'><i className="bi bi-eye-fill"></i>&nbsp;Preview</p>
                    </div>
                    <div className="card-body bg-dark-card">
                      <h5 className="card-title">{item.original_title}</h5>
                      <p className="card-text">{item.overview}</p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">Release Date {item.release_date}</small>
                    </div>
                  </div>
                </Link>
              </div>
            )) :
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const fetchMoviePopular = await
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=36bbe004dbbf9b65e693f8d09cab0065&language=en-US&query=a")

  const [dataPopular] = await Promise.all([
    fetchMoviePopular
  ])

  return {
    props: {
      data: dataPopular.data
    },
  }
}
