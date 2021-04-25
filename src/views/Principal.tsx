import React, {useState, useEffect} from 'react'
//mis componentes
import Table from '../components/Table/Table'
import Navbar from '../components/Navbar/Navbar'
import Input from '../components/Input/Input'

import { Route, Switch, useHistory } from 'react-router-dom'

import { MovieType } from '../types/types'

import 'bootstrap/dist/css/bootstrap.min.css'

const PrincipalView:React.FunctionComponent = () => {
    const newMovEmpty:MovieType = {
        Title: '',
        Year: '',
        imdbID: '',
        Type: '',
        Poster: '',
      }

    const [movies, setMovies] = useState<any>(undefined)
    const [page, setPage] = useState<number>(1)
    const [newMov, setNewMov] = useState<MovieType>(newMovEmpty)
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
        if (history.location.pathname.split('/')[1] != '' && page == 1) { 
            setPage(parseInt(history.location.pathname.split('/')[1]))
        }
        history.push(`/${page}`)
      }, []) 

    useEffect(() => {
        getData()
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
                        //render: formattedMoviesHeads[4] == "Poster" ? <img src="${propierties[4]}"/> : null
                    })
                }
                formattedMovies.push(dataMovie)
            }
            let dataMovie:any[] = []
            for (let x = 0; x < Object.keys(newMov).length; x++){
                let propierties = Object.values(newMov)
                dataMovie.push({
                value:  propierties[x],
                type: typeof propierties[x],
                propiertyName: Object.keys(newMov)[x]
                })
            }
            formattedMovies.push(dataMovie)
        }
        return [formattedMovies, formattedMoviesHeads]
    }

    const getChangedValue = (val:string[]) => {
        let userArray:string[] = val[1].split(',') 
        switch (val[0]) {
            case 'Title':
                setNewMov({
                    Title: val[1], Year: newMov.Year, imdbID: newMov.imdbID, Type: newMov.Type , Poster: newMov.Poster
                })
            break
            case 'Year':
                setNewMov({
                    Title: newMov.Title, Year: val[1], imdbID: newMov.imdbID, Type: newMov.Type , Poster: newMov.Poster
                })
            break
            case 'imdbID':
                setNewMov({
                    Title: newMov.Title, Year: newMov.Year, imdbID: val[1], Type: newMov.Type , Poster: newMov.Poster
                })
            break
            case 'Type':
                setNewMov({
                    Title: newMov.Title, Year: newMov.Year, imdbID: newMov.imdbID, Type: val[1], Poster: newMov.Poster
                })
            break
            case 'Poster':
                setNewMov({
                    Title: newMov.Title, Year: newMov.Year, imdbID: newMov.imdbID, Type: newMov.Type, Poster: val[1]
                })
            break
        }
    }
    
    useEffect(() => {
    }, [newMov])


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
            <h3>Agrega una nueva película</h3>
            <Input 
                readonly={false}
                placeholder='Title'
                disabled={false}
                name='Title'
                value=''
                onChange={getChangedValue}
            />
            <Input 
                readonly={false}
                placeholder='Year'
                disabled={false}
                name='Year'
                value=''
                onChange={getChangedValue}
            />
            <Input 
                readonly={false}
                placeholder='imdbID'
                disabled={false}
                name='imdbID'
                value=''
                onChange={getChangedValue}
            />
            <Input 
                readonly={false}
                placeholder='Type'
                disabled={false}
                name='Type'
                value='movie'
                onChange={getChangedValue}
            />

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
