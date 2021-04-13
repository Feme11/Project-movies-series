import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
//mis componentes
import Table from '../components/Table/Table'
import Navbar from '../components/Navbar/Navbar'

import { Route, Switch, useHistory } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

const PrincipalView:React.FunctionComponent = () => {
    const [movies, setMovies] = useState<any>(undefined)
    const [page, setPage] = useState<number>(1)
    const history = useHistory()


    const url = `https://www.omdbapi.com/?s=movie&page=${page}&apikey=bfb19173`

    //función para consumir datos de api
    const getData = async () => {
        const res = await fetch(url)
        const data = await res.json()
        const newData = data.Search
        setMovies(newData)
    }


    useEffect(() => {
        getData()
        if (history.location.pathname.split('/')[1] != '' && page == 1 ) {
            setPage(parseInt(history.location.pathname.split('/')[1]))
        }
        history.push(`/${page}`)
    },[page])

    const prepareData = () => {
        let formattedMovies:any = []
        let formattedMoviesHeads:any = []
        
        if (movies != undefined) {

            formattedMoviesHeads = Object.keys(movies[0])
            for (let n = 0; n < movies.length; n++) {
                let dataMovie:any[] =[]
                let propierties = Object.values(movies[n])
                for(let moviesPropierty = 0; moviesPropierty < propierties.length; moviesPropierty++){
                    dataMovie.push({
                        value: propierties[moviesPropierty],
                        type: typeof propierties[moviesPropierty],
                    })
                }
                formattedMovies.push(dataMovie)
            }
        }
        return [formattedMovies, formattedMoviesHeads]
    }


    return(
        <div>
            <Navbar/>
            <Switch>
                <Route path={`/:page`}>
                    <Table
                        tableData={prepareData()[0]}
                        tableDataHeads={prepareData()[1]}
                    />
                </Route>
            </Switch>  
            <div className="botones">
                <button
                    onClick={ () => setPage(page > 1 ? page - 1 : 1 ) }
                    className="btn"
                ><i className="fas fa-long-arrow-alt-left"></i></button>
                <h6 className="p-2 m-0">{page}</h6>
                <button 
                    onClick={ () => setPage(page + 1) }
                    className="btn"><i className="fas fa-long-arrow-alt-right"></i></button>
            </div>
        </div>  
    )
}

export default PrincipalView
