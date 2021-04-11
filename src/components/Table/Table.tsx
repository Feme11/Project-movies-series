import React from 'react'
import TableHead from './TableHead'
import TableRow from './TableRow'

export type columnType = {
    value: any,
    type: string,
}

type TableProps = {
    tableData: any,
    tableDataHeads: string[]
}



const Table:React.FunctionComponent<TableProps> = (props) => {

    return (
        <div className="contenedor-tabla container-fluid m-auto">
            <div className="table-responsive-sm">
                <table className="table table-success table-hover">
                    <thead>
                        {
                            props.tableDataHeads != undefined ?
                            <TableHead 
                                headers={props.tableDataHeads}
                            />
                            :
                            null
                        }
                    </thead>
            
                    <tbody>
                        {
                            props.tableData != undefined ? props.tableData.map((tData:any, nData: number) => 
                                <TableRow
                                    colData={tData}
                                    key={`tableRow-${nData}`}
                                />
                            ):null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Table