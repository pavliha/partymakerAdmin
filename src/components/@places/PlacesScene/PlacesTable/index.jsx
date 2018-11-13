/* eslint-disable function-paren-newline,jsx-a11y/anchor-is-valid,no-mixed-operators,react/no-array-index-key  */
import React from 'react'
import { func, object } from 'prop-types'
import { Link } from 'react-router-dom'
import CreateIcon from 'mdi-react/CreateIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import difference from 'lodash/difference'
import { IconButton, Table, TableBody, TableCell, TablePagination, TableRow, withStyles } from '@material-ui/core'
import TableHead from './TableHead'
import Toolbar from './Toolbar'
import connector from './connector'

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  xsHidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
})

class PlacesTable extends React.Component {

  changePage = (event, page) => {
    const { actions } = this.props
    actions.placesTable.changePage(page)
  }

  changeRowsPerPage = (e) => {
    const { actions } = this.props
    actions.placesTable.changeRowsPerPage(e.target.value)
  }

  render() {
    const { classes, places: { places }, placesTable, onDelete } = this.props
    const { filtered, selected, rowsPerPage, order, orderBy, page } = placesTable

    const placesIds = Object.keys(places)

    const filteredPlaces = difference(placesIds, filtered).map(id => places[id])
    const sortedPlaces = filteredPlaces.sort((prev, next) => (prev[orderBy].localeCompare(next[orderBy])))
    const sortedReverse = order === 'asc' ? sortedPlaces : sortedPlaces.reverse()
    const paginatedPlaces = sortedReverse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    return (
      <div className={classes.root}>
        <Toolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead />
            <TableBody>
              {paginatedPlaces.map((place, index) =>
                <TableRow key={index} hover>
                  <TableCell padding="dense">
                    <Link to={`/places/${place.id}`}>{place.title}</Link>
                  </TableCell>
                  <TableCell>
                    {place.working_day}
                  </TableCell>
                  <TableCell>
                    {place.working_hours}
                  </TableCell>
                  <TableCell>{place.pictures.length} шт</TableCell>
                  <TableCell>{place.videos.length} шт</TableCell>
                  <TableCell>
                    <Link to={`/places/${place.id}/edit`}>
                      <IconButton><CreateIcon /> </IconButton>
                    </Link>
                    <IconButton onClick={() => onDelete(place.id)}><DeleteIcon /> </IconButton>
                  </TableCell>
                </TableRow>,
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filteredPlaces.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          onChangePage={this.changePage}
          onChangeRowsPerPage={this.changeRowsPerPage}
        />
      </div>
    )
  }
}

PlacesTable.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  places: object.isRequired,
  placesTable: object.isRequired,
  onDelete: func.isRequired,
}

export default withStyles(styles)(connector(PlacesTable))
