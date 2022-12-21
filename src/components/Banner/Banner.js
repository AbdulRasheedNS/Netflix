import React, { useEffect, useState } from 'react'
import { API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
import Youtube from 'react-youtube'

function Banner() {
  const [movie, setMovie,] = useState()
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results[0]);
      setMovie(response.data.results[0])
    })
  }, [])
  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-U`).then(response => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0])
      } else {
        console.log('Array Empty');
      }
    })

  }
  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})` }}
      className='banner' >

      <div className='video'>
        {/* {urlId ? 
        <iframe src={<Youtube opts={opts} videoId={urlId.key} /> } frameborder="0" title='a'></iframe> : ''} */}
        {urlId && <Youtube opts={opts} videoId={urlId.key} />}
      </div>
      <div className='content'>
        <h1 className='title'>{movie ? movie.title : ""}</h1>
        <div className='banner_buttons'>
          <button className='button' onClick={() => handleMovie(movie.id)}>Play</button>
          <button className='button'>My List</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner