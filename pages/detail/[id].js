import axios from 'axios'
import Link from 'next/link'
import React, {useState} from 'react'
import Navbar from '../../components/Navbar'

const DetailMovies = ({ data }) => {
  // console.log(data)
  const imgUrl = "https://image.tmdb.org/t/p/w500"
  return (
    <div>
      <Navbar />
      <br /><br />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm'>
            <div className='d-flex justify-content-start px-2'>
              <div className="card mt-3 hoverable" style={{ width: "18rem", height: "100%" }}>
                <img className="card-img-top" src={imgUrl + data.poster_path} alt="Card image cap"></img>
                <div className="card-body">
                  <h5 className="card-title">{data.original_title}</h5>
                  <p className="card-text">{data.overview}</p>
                </div>
              </div>
              <div className='mt-3 px-2'>
                <h3 style={{ color: "#fff" }}>Genre</h3>
                <nav aria-label="breadcrumb" className='px-1'>
                  <ol className="breadcrumb" style={{ color: "blueviolet" }}>
                    {data.genres.map((genre) => (
                      <li className="breadcrumb-item" key={genre.name}><Link passHref href={`/`}><a>{genre.name}</a></Link></li>
                    ))}
                  </ol>
                </nav>
                <div className='mt-2'>
                  <h3 style={{ color: "#fff" }}>Home Page</h3>
                  <Link passHref href={data.homepage}><span style={{ color: "blue", cursor: "pointer" }}>{data.homepage}</span></Link>
                </div>

                <div className='mt-3'>
                  <h3 style={{ color: "#fff" }}>Popularity</h3>
                  <span style={{ color: "#fff" }}>{data.popularity} Views</span>
                </div>
                <div className='mt-3'>
                  <h3 style={{ color: "#fff" }}>Status</h3>
                  <span style={{ color: "#fff" }}>{data.status}</span>
                </div>
                <div className='mt-3'>
                  <h3 style={{ color: "#fff" }}>Tagline</h3>
                  <span style={{ color: "#fff" }}>{data.tagline}</span>
                </div>
                <div className='mt-3'>
                  <h3 style={{ color: "#fff" }}>Vote Average</h3>
                  <span style={{ color: "#fff" }}>{data.vote_average}</span>
                </div>
                <div className='mt-3'>
                  <h3 style={{ color: "#fff" }}>Vote Count</h3>
                  <span style={{ color: "#fff" }}>{data.vote_count}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm'>
            <div className='d-flex-justify-content-start px-2'>
              <div className='mt-3'>
                <h3 style={{ color: "#fff" }}>Revenue</h3>
                <span style={{ color: "#fff" }}>{data.revenue}</span>
              </div>
              <div className='mt-3'>
                <h3 style={{ color: "#fff" }}>Budget</h3>
                <span style={{ color: "#fff" }}>${data.Budget}</span>
              </div>
              <div className='mt-3'>
                <h3 style={{ color: "#fff" }}>Runtime</h3>
                <span style={{ color: "#fff" }}>{data.runtime}</span>
              </div>
              <div className='mt-3'>
                <h3 style={{ color: "#fff" }}>Release Date</h3>
                <span style={{ color: "#fff" }}>{data.release_date}</span>
              </div>
              <div className='mt-3'>
                <h3 style={{ color: "#fff" }}>Original Language</h3>
                <span style={{ color: "#fff" }}>{data.original_language.toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className='col-sm'>
            <div className='d-flex justify-content-start'>
              <div className='mt-3'>
                <h3 style={{ color: "#fff" }}>Production Countries</h3>
                <ol style={{ color: "#fff" }}>
                  {data.production_countries.map((production) => (
                    <li key={production.name}><span style={{ color: "#fff" }}>{production.name}</span></li>
                  ))}
                </ol>
                <div className='mt-3'>
                  <h3 style={{ color: "#fff" }}>Production Companies</h3>
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                        <ol style={{color: "#fff"}} >
                          {data.production_companies.map((production_comp) => (
                            <li key={production_comp.name}><span style={{ color: "#fff" }}>{production_comp.name}</span></li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailMovies

export async function getServerSideProps(context) {
  const params = context.params

  const fetchMoviePopularById = await
    axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=36bbe004dbbf9b65e693f8d09cab0065&language=en-US`)

  const [dataPopularById] = await Promise.all([
    fetchMoviePopularById
  ])

  return {
    props: {
      data: dataPopularById.data
    },
  }
}
