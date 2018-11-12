/* eslint-disable react/no-access-state-in-setstate */
import React from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import CreateIcon from 'mdi-react/CreateIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  withStyles,
} from '@material-ui/core'
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

  selectAll = places => ({ target: { checked } }) => {
    const { actions } = this.props
    actions.places.selectAll(checked ? places : [])
  }

  select = place => () => {
    const { actions } = this.props
    actions.places.select(place)
  }

  isSelected = (place) => {
    const { places: { selected } } = this.props

    return selected.map(p => p.id)
      .includes(place.id)
  }

  handleChangePage = (event, page) => {
    const { actions } = this.props
    actions.places.changePage(page)
  }

  handleChangeRowsPerPage = (e) => {
    const { actions } = this.props
    actions.places.changeRowsPerPage(e.target.value)
  }

  render() {
    const { classes, places: { filteredPlaces, selected, rowsPerPage, page }, onEdit, onDelete } = this.props
    const paginatedPlaces = filteredPlaces.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
    return (
      <div className={classes.root}>
        <Toolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead onSelectAllClick={this.selectAll(filteredPlaces)} />
            <TableBody>
              {
                paginatedPlaces.map((place) => {
                  const isSelected = this.isSelected(place)
                  return (
                    <TableRow
                      key={place.id}
                      hover
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isSelected} onClick={this.select(place)} />
                      </TableCell>
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
                      <TableCell>
                        <IconButton onClick={() => onEdit(place)}><CreateIcon /> </IconButton>
                        <IconButton onClick={() => onDelete(place)}><DeleteIcon /> </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filteredPlaces.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    )
  }
}

PlacesTable.propTypes = {
  actions: object.isRequired,
  classes: object.isRequired,
  places: object.isRequired,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
}

export default withStyles(styles)(connector(PlacesTable))
